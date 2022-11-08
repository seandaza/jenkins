import styled from 'styled-components';
import BigCard from '../../../components/bigCard';
import Stepper from '../../../components/stepper';
import { REQUEST_LOAN_STATUS } from '../../../models/requestLoanStatus';
import ContactForm from './contactForm';
import IdentityValidation from './identityValidation';
import LoanSumary from './loanSummary';
import VerifyRequest from './verifyRequest';

const steps = [
  {
    name: <>Datos de contacto</>,
  },
  {
    name: (
      <>
        Validación de <br /> identidad
      </>
    ),
  },
  {
    name: (
      <>
        Verificando <br /> solicitud
      </>
    ),
  },
  {
    name: (
      <>
        Resumen <br /> del préstamo
      </>
    ),
  },
];

export default function SecondCard({
  amount,
  setLoan,
  setContactInformation,
  KYC,
  setStep,
  step,
  KYCStatusPrev,
}) {
  const isKYCRequired = KYCStatusPrev === REQUEST_LOAN_STATUS.REQUIRED;

  const KYCRequired = () => {
    return (
      <>
        {step === 0 && (
          <ContactForm
            amount={amount}
            setLoan={setLoan}
            step={step}
            setStep={setStep}
            setContactInformation={setContactInformation}
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
  };

  return (
    <Container>
      <BigCard className="big-card">
        <div className="card-container">
          {KYC !== REQUEST_LOAN_STATUS.SUCCESS && (
            <Stepper
              step={step}
              setStep={setStep}
              steps={steps.slice(0, isKYCRequired ? 3 : 4).map((item) => item)}
              clickable={false}
              title={'PASO'}
              isKYCRequired={isKYCRequired}
            />
          )}
          {KYC !== REQUEST_LOAN_STATUS.SUCCESS && <KYCRequired />}
          {(KYC === REQUEST_LOAN_STATUS.SUCCESS || step === 3) && (
            <LoanSumary
              KYC={KYC}
              amount={amount}
              setContactInformation={setContactInformation}
              setLoan={setLoan}
              setStep={setStep}
            />
          )}
        </div>
      </BigCard>
    </Container>
  );
}

const Container = styled.div`
  padding: 1em 0;
  height: 100%;

  .big-card {
    height: 100%;
    .card-container {
      margin-top: 1em;
      height: 100%;
    }
  }
`;
