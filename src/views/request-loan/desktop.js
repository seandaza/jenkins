import { useEffect, useState } from 'react';
import { REQUEST_LOAN_STATUS } from '../../models/requestLoanStatus';
import FirstCard from './first-card/firstCard';
import NoScore from './first-card/no-score';
import SecondCard from './second-card/secondCard';
import ThirdCard from './third-card/thirdCard';

export default function Desktop({
  KYC,
  amount,
  contactInformation,
  defaultAmount,
  defaultAmounts,
  loan,
  setAmount,
  setContactInformation,
  setLoan,
  setStep,
  step,
  user,
}) {
  const [KYCStatusPrev, setKYCStatusPrev] = useState();

  useEffect(() => {
    if (KYC && !KYCStatusPrev) {
      setKYCStatusPrev(KYC);
    }
  }, [KYC, KYCStatusPrev]);

  const isKYCRequired = KYC === REQUEST_LOAN_STATUS.REQUIRED;

  if (
    user &&
    !user.pendingLoan &&
    user.availableAmount < Number(user.configs[0]?.minimal_loan_amount)
  ) {
    return <NoScore />;
  }

  if (KYC === REQUEST_LOAN_STATUS.WAITING) {
    return <ThirdCard email={contactInformation.email} KYC={KYC} />;
  }

  return (
    <>
      {!loan && KYCStatusPrev !== REQUEST_LOAN_STATUS.REQUIRED && (
        <FirstCard
          amount={amount}
          defaultAmount={defaultAmount}
          defaultAmounts={defaultAmounts}
          setAmount={setAmount}
          setLoan={setLoan}
          username={user?.fullName}
        />
      )}
      {(loan || isKYCRequired) && !contactInformation.completed && (
        <SecondCard
          amount={amount}
          setLoan={setLoan}
          setContactInformation={setContactInformation}
          KYC={KYC}
          setStep={setStep}
          step={step}
          KYCStatusPrev={KYCStatusPrev}
        />
      )}

      {(loan || KYCStatusPrev === REQUEST_LOAN_STATUS.REQUIRED) &&
        contactInformation.completed && (
          <ThirdCard email={contactInformation.email} KYC={KYC} />
        )}
    </>
  );
}
