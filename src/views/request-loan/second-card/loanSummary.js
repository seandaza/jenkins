import { useCallback, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import StyledButton from '../../../components/button';
import CancelModal from '../../../components/cancel-modal';
import CheckBox from '../../../components/checkbox';
import { BREAKPOINTS } from '../../../models/breakpoints';
import { CREATE_LOAN_ERROR } from '../../../models/error-messages';
import { REQUEST_LOAN_STATUS } from '../../../models/requestLoanStatus';
import { UserContext } from '../../../providers/user-provider';
import patchLoan from '../../../services/accept-policies';
import { getDocument } from '../../../services/get-document';
import { getTemporalDocument } from '../../../services/get-temporal-document';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../../services/google-analytics-event';
import { currencyFormat } from '../../../utilities/currency-format';

export default function LoanSumary({
  amount,
  setContactInformation,
  KYC,
  setLoan,
}) {
  const { user, token, setSessionLoan, setUser } = useContext(UserContext);

  const [accepted, setAccepted] = useState(false);
  const [serviceCostAndTaxes, setServiceCostAndTaxes] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [installmentsPaymentCost, setInstallmentsPaymentCost] = useState(0);
  const [cancelModal, setCancelModal] = useState(false);
  const [documents, setDocuments] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && token) {
      const getTermsAndConditions = async () => {
        const url = await getDocument(user.id, token, {
          document: 'terms_and_conditions',
          version: user.documents['terms_and_conditions'],
        });
        return { terms_and_conditions: url };
      };

      const getCreditCover = async () => {
        const url = await getTemporalDocument(token, {
          amount,
          document: 'CREDIT_COVER',
        });
        return { contract_cover: url };
      };

      const getDocuments = async () => {
        const docs = await Promise.all([
          getTermsAndConditions(),
          getCreditCover(),
        ]);

        setDocuments(
          docs.reduce((prev, document) => {
            const obj = Object.entries(document);
            return { ...prev, [obj[0][0]]: obj[0][1] };
          }, {})
        );
      };
      getDocuments();
    }
  }, [user, token, amount]);

  useEffect(() => {
    if (user) {
      const interestRate = user.configs[0].charge_types.find(
        ({ id }) => id === 2
      );

      let taxes =
        amount *
        Number(interestRate.percentage) *
        (1 + Number(interestRate.tax_types[0].percentage));

      setServiceCostAndTaxes(taxes);
      setInstallmentsPaymentCost((amount + taxes) / 22);
      setTotalAmount(amount + taxes);
    }
  }, [amount, user]);

  const patchLoanCallback = useCallback(
    async (status) => {
      await patchLoan(
        user.id,
        {
          status,
          documents: [
            {
              name: 'terms_and_conditions',
              version: user?.documents['terms_and_conditions'],
            },
            {
              name: 'contract_cover',
              version: user?.documents['contract_cover'],
            },
            {
              name: 'domiciliation_format',
              version: user?.documents['domiciliation_format'],
            },
          ],
        },
        token
      );
    },
    [token, user?.documents, user?.id]
  );

  const submit = async () => {
    if (accepted) {
      try {
        setLoading(true);
        addGoogleAnalyticsEvent({
          category: CATEGORIES.CASH_ADVANCE,
          action: ACTIONS.CLICK,
          label:
            KYC === REQUEST_LOAN_STATUS.SUCCESS ? 'Summary' : 'KYC Summary',
        });
        await patchLoanCallback('ACCEPTED');
        addGoogleAnalyticsEvent({
          category: CATEGORIES.CASH_ADVANCE,
          action: ACTIONS.REQUEST,
          label: 'KYC request',
        });
        setContactInformation((value) => ({
          ...value,
          completed: accepted,
          status: REQUEST_LOAN_STATUS.SUCCESS,
        }));
        setSessionLoan(currencyFormat(amount));
        setUser(undefined);
      } catch (error) {
        let errorMessage =
          CREATE_LOAN_ERROR[error?.response?.data?.error] ??
          CREATE_LOAN_ERROR.default;
        console.log(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const cancelLoan = async () => {
    await patchLoanCallback('REJECTED');
    setUser(undefined);
    setLoan(undefined);
  };

  return (
    <>
      <CancelModal
        open={cancelModal}
        setOpen={setCancelModal}
        closeCallback={cancelLoan}
      />
      <Container KYCSuccess={KYC === REQUEST_LOAN_STATUS.SUCCESS}>
        <div className="h3">Monto solicitado</div>
        <div className="h1 text-red bold">{currencyFormat(amount)}</div>
        <hr className="divider" />
        <div className="table">
          <div className="row space">
            <div>Número de cuotas</div>
            <div className="bold">22</div>
          </div>
          <div className="row">
            <div>Cuota diaria</div>
            <div className="bold">
              {currencyFormat(installmentsPaymentCost)}
            </div>
          </div>
          <div className="row">
            <div>Interés (IVA incluido)</div>
            <div className="bold">{currencyFormat(serviceCostAndTaxes)}</div>
          </div>
          <div className="row">
            <div>Duración del préstamo</div>
            <div className="bold">1 mes</div>
          </div>
          <div className="row space bold">
            <div>Total a pagar</div>
            <div>{currencyFormat(totalAmount)}</div>
          </div>
        </div>
        {KYC !== REQUEST_LOAN_STATUS.SUCCESS && (
          <div className="text normal">
            <span className="text-red bold">¡Recuerda!</span> Este préstamo se
            desembolsará en tu cuenta asociada a Billpocket.
          </div>
        )}

        <CheckBox
          className="check"
          setValue={(value) => {
            addGoogleAnalyticsEvent({
              category: CATEGORIES.CASH_ADVANCE,
              action: ACTIONS.CLICK,
              label:
                KYC === REQUEST_LOAN_STATUS.SUCCESS
                  ? 'agree T&C​'
                  : 'agree KYC T&C​',
            });
            setAccepted(value);
          }}
          value={accepted}
        >
          <div className="check-content small">
            He leído y acepto los{' '}
            <a
              href={documents['terms_and_conditions']}
              className="link"
              target="_blanck"
            >
              Términos y Condiciones
            </a>{' '}
            y la{' '}
            <a
              href={documents['contract_cover']}
              className="link"
              target="_blanck"
            >
              Carátula del contrato
            </a>{' '}
            {/* y el{' '}
            <a
              href={documents['contract_cover']}
              className="link"
              target="_blanck"
            >
              Formato de domiciliación
            </a> */}
          </div>
        </CheckBox>

        <div className="buttons">
          <StyledButton
            className="cancel"
            greyDark
            onClick={() => {
              setCancelModal(true);
            }}
          >
            Cancelar
          </StyledButton>
          <StyledButton solid disabled={!accepted || loading} onClick={submit}>
            Continuar
          </StyledButton>
        </div>
      </Container>
    </>
  );
}
const Container = styled.div`
  margin-top: ${({ KYCSuccess }) => (KYCSuccess ? '5em' : '0')};
  max-height: 641px;

  .divider {
    border: 0.1px solid ${({ theme }) => theme.colors.greyLight};
    width: 100%;
  }

  .text {
    margin: 4em 0 1.5em;
  }

  .check {
    margin-top: ${({ KYCSuccess }) => (KYCSuccess ? '5em' : 0)};

    a {
      color: black;
    }
  }

  .table {
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 0.2em;
    }
    .space {
      margin-top: 1em;
    }
  }

  .buttons {
    margin: 2em -3em;
    display: flex;
    flex-direction: row;
    justify-content: center;
    button {
      width: 40%;
      &:disabled {
        background: #b2bec3;
      }
    }
    button + button {
      margin-left: 0.5em;
    }
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 5%;

    .table {
      margin-bottom: 8em;
    }
    .text {
      margin: 0 0 1em;
    }
    .check-content {
      font-size: 0.8em;
    }
    .buttons {
      margin: 1.5em 0 0;
      button {
        width: 100%;
        font-weight: bold;
        padding: 1em 0;
        &.cancel {
          display: none;
        }
      }
    }
  }
`;
