import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AlertComponent from '../../../components/alert';
import StyledButton from '../../../components/button';
import { CREATE_LOAN_ERROR } from '../../../models/error-messages';
import { UserContext } from '../../../providers/user-provider';
import { createLoan } from '../../../services/create-loan';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../../services/google-analytics-event';
import { currencyFormat } from '../../../utilities/currency-format';

export default function LoanSummary({ amount, setLoan }) {
  const { user, token } = useContext(UserContext);

  const [totalAmount, setTotalAmount] = useState(0);
  const [serviceCostAndTaxes, setServiceCostAndTaxes] = useState(0);
  const [installmentsPaymentCost, setInstallmentsPaymentCost] = useState(0);
  const [error, setError] = useState();

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

  const submit = async () => {
    try {
      addGoogleAnalyticsEvent({
        category: CATEGORIES.CASH_ADVANCE,
        action: ACTIONS.CLICK,
        label: 'simulator click',
      });
      setLoan(
        await createLoan(token, user.id, {
          amount,
          configID: user.configs[0].id,
        })
      );
    } catch (error) {
      let errorMessage =
        CREATE_LOAN_ERROR[error?.response?.data?.error] ??
        CREATE_LOAN_ERROR.default;
      setError(errorMessage);
    }
  };

  return (
    <Container>
      <div className="top">
        <div className="h3">Monto solicitado</div>
        <div className="h1 bold text-red">{currencyFormat(Number(amount))}</div>
        <div className="title bold">Resumen del préstamo</div>
        <div className="table">
          <div className="row space">
            <div>Número de cuotas</div>
            <div className="bold">22</div>
          </div>
          <div className="row">
            <div>Cuota diaria</div>
            <div className="bold right-text">
              {currencyFormat(Number(installmentsPaymentCost))}
            </div>
          </div>
          <div className="row">
            <div>Interés (IVA incluido)</div>
            <div className="bold right-text">
              {currencyFormat(Number(serviceCostAndTaxes))}
            </div>
          </div>
          <div className="row">
            <div>Duración del préstamo</div>
            <div className="bold right-text">
              {user.loanDuration || '1 mes'}
            </div>
          </div>
          <div className="row space bold">
            <div>Total a pagar</div>
            <div className="right-text">
              {currencyFormat(Number(totalAmount))}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="text p">
          <span className="text-red bold">¡Recuerda!</span> Este préstamo se
          desembolsará en tu cuenta asociada a Billpocket.
        </div>
        <StyledButton solid onClick={submit}>
          Continuar
        </StyledButton>
      </div>
      <AlertComponent
        className="alert"
        open={error}
        setOpen={() => setError(undefined)}
        content={error}
        severity="error"
      />
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3em 2em 2em;

  .top {
    .title {
      margin-top: 1em;
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
      .right-text {
        text-align: right;
      }
    }
  }

  .bottom {
    button {
      width: 100%;
    }
  }

  .text {
    margin-bottom: 1em;
  }

  .alert {
    bottom: 3em;
    right: 1em;
  }
`;
