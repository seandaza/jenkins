import { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BottomBorder from '../../components/cardFooter';
import HeaderMobile from '../../components/headerMobile';
import { REQUEST_LOAN_STATUS } from '../../models/requestLoanStatus';
import { UserContext } from '../../providers/user-provider';
import patchLoan from '../../services/accept-policies';
import ROUTES from '../../utilities/routes';
import ContactForm from './mobile/contact-form';
import RequestStatus from './mobile/request-status';
import SelectAmount from './mobile/select-amount';
import IdentityValidation from './second-card/identityValidation';
import LoanSumary from './second-card/loanSummary';
import VerifyRequest from './second-card/verifyRequest';

const MobileStyled = styled.div`
  height: 100%;

  .mobile-header {
    height: 5%;
  }
  .mobile-container {
    padding: 1em 2em;
    height: 95%;

    &.request-footer {
      height: 87%;
    }
  }

  @media only screen and (min-height: 1024px) and (max-height: 3999px) {
    .mobile-container.request-footer {
      height: 58%;
    }
  }

  @media only screen and (min-height: 4000px) {
    .mobile-container.request-footer {
      height: 15%;
    }
  }
`;

const HEADER_TITLES = [
  'Solicitar préstamo',
  'Paso 1 - Datos de contacto',
  'Paso 2 - Validación de identidad',
  'Paso 3 - Verificando solicitud',
  'Paso 4 - Resumen de préstamo',
];

export default function Mobile({
  KYC,
  amount,
  contactInformation,
  defaultAmounts,
  loan,
  setAmount,
  setContactInformation,
  setLoan,
  setStep,
  step,
}) {
  const [KYCStatusPrev, setKYCStatusPrev] = useState();
  const { user, token, setUser } = useContext(UserContext);
  const history = useHistory();
  const isKYCRequired = KYC === REQUEST_LOAN_STATUS.REQUIRED;

  useEffect(() => {
    if (KYC && !KYCStatusPrev) {
      setKYCStatusPrev(KYC);
    }
  }, [KYC, KYCStatusPrev]);

  if (
    user &&
    !user.pendingLoan &&
    user.availableAmount < Number(user.configs[0]?.minimal_loan_amount)
  ) {
    return <Redirect to={ROUTES.ROOT} />;
  }

  const KYCprocess = (
    <>
      {step === 0 && (
        <ContactForm
          setContactInformation={setContactInformation}
          setLoan={setLoan}
          setStep={setStep}
          amount={amount}
        />
      )}
      {step === 1 && (
        <IdentityValidation
          step={step}
          setStep={setStep}
          isKYCRequired={isKYCRequired}
          setLoan={setLoan}
        />
      )}
      {step === 2 && (
        <VerifyRequest
          step={step}
          setStep={setStep}
          setContactInformation={setContactInformation}
          isKYCRequired={isKYCRequired}
          setLoan={setLoan}
        />
      )}
    </>
  );

  const cancelLoan = async () => {
    await patchLoan(
      user.id,
      {
        status: 'REJECTED',
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
    setUser(undefined);
    setLoan(undefined);
  };

  return (
    <MobileStyled>
      <HeaderMobile
        className="mobile-header"
        title={
          !loan
            ? HEADER_TITLES[0]
            : KYC !== REQUEST_LOAN_STATUS.SUCCESS
            ? HEADER_TITLES[step + 1]
            : HEADER_TITLES[4]
        }
        backButtonAction={() => {
          if (loan) {
            setStep((step) => {
              if (step !== 0 && step !== 3) {
                return step - 1;
              } else {
                cancelLoan();
                return 0;
              }
            });
          } else {
            history.push(ROUTES.ROOT);
          }
        }}
        processFinished={contactInformation.completed}
        help
      />
      <div
        className={`mobile-container${
          contactInformation.completed ? ' request-footer' : ''
        }`}
      >
        {!loan &&
          KYCStatusPrev !== REQUEST_LOAN_STATUS.REQUIRED &&
          KYC !== REQUEST_LOAN_STATUS.WAITING && (
            <SelectAmount
              defaultAmounts={defaultAmounts}
              setAmount={setAmount}
              amount={amount}
              setLoan={setLoan}
            />
          )}
        {(loan || isKYCRequired) && !contactInformation.completed && (
          <>
            {KYC !== REQUEST_LOAN_STATUS.SUCCESS && KYCprocess}
            {(KYC === REQUEST_LOAN_STATUS.SUCCESS || step === 3) && (
              <LoanSumary
                KYC={KYC}
                amount={amount}
                setContactInformation={setContactInformation}
                setLoan={setLoan}
                setStep={setStep}
              />
            )}
          </>
        )}
        {(((loan || KYCStatusPrev === REQUEST_LOAN_STATUS.REQUIRED) &&
          contactInformation.completed) ||
          KYC === REQUEST_LOAN_STATUS.WAITING) && (
          <RequestStatus email={contactInformation.email} KYC={KYC} />
        )}
      </div>
      {loan && contactInformation.completed && <BottomBorder KYC={KYC} />}
    </MobileStyled>
  );
}
