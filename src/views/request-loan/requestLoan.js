import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../models/breakpoints';
import { REQUEST_LOAN_STATUS } from '../../models/requestLoanStatus';
import { UserContext } from '../../providers/user-provider';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../services/google-analytics-event';
import { useResizeListener } from '../../utilities/resize-listener';
import Desktop from './desktop';
import Mobile from './mobile';

export default function RequestLoan() {
  const { user, setUser } = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const [defaultAmounts, setDefaultAmounts] = useState([]);
  const [step, setStep] = useState(0);
  const [KYC, setKYC] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [contactInformation, setContactInformation] = useState({
    completed: false,
    contactForm: { email: '' },
  });
  const [loan, setLoan] = useState();

  useEffect(() => {
    addGoogleAnalyticsEvent({
      category: CATEGORIES.CASH_ADVANCE,
      action: ACTIONS.VISIT,
    });
  }, []);

  useEffect(() => {
    if (!loan && user) {
      let minimalAmount = Number(user.configs[0]?.minimal_loan_amount);
      let defaultAmount = Math.round(
        (minimalAmount + user.availableAmount) / 2
      );
      setAmount(defaultAmount);
      setDefaultAmounts([minimalAmount, defaultAmount, user.availableAmount]);
      setContactInformation({});
      setStep(0);
    }
  }, [loan, user]);

  useEffect(() => {
    if (user) {
      setKYC(user.kycStatus);
      if (user.kycStatus !== REQUEST_LOAN_STATUS.REQUIRED && user.pendingLoan) {
        switch (user.requestLoanStep) {
          case 1:
            setLoan(user.pendingLoan);
            setAmount(user.pendingLoan.amount);
            break;
          case 2:
            setLoan(user.pendingLoan);
            setAmount(user.pendingLoan.amount);
            setContactInformation({
              email: user.email,
              phone: user.phoneNumber,
            });
            setStep(1);
            break;
          case 3:
            setLoan(user.pendingLoan);
            setAmount(user.pendingLoan.amount);
            setContactInformation({
              email: user.email,
              phone: user.phoneNumber,
              completed: true,
              status: REQUEST_LOAN_STATUS.WAITING,
            });
            break;
          case 4:
            setLoan(user.pendingLoan);
            setAmount(user.pendingLoan.amount);
            setContactInformation({
              email: user.email,
              phone: user.phoneNumber,
            });
            setStep(3);
            break;
          default:
            break;
        }
      }
    }
  }, [user]);

  useEffect(() => {
    if (user && contactInformation.completed) {
      let tempUser = user;
      tempUser.kycStatus = contactInformation.status;
      setUser(tempUser);
      switch (contactInformation.status) {
        case REQUEST_LOAN_STATUS.SUCCESS:
          setKYC(REQUEST_LOAN_STATUS.SUCCESS);
          break;
        case REQUEST_LOAN_STATUS.WAITING:
          setKYC(REQUEST_LOAN_STATUS.WAITING);
          break;
        default:
          setKYC(REQUEST_LOAN_STATUS.FAIL);
          break;
      }
    }
  }, [contactInformation, user, setUser]);

  useResizeListener(() => setScreenWidth(window.innerWidth));

  return (
    <Root>
      {user && BREAKPOINTS.medium <= screenWidth && (
        <Desktop
          KYC={KYC}
          amount={amount}
          contactInformation={contactInformation}
          defaultAmounts={defaultAmounts}
          loan={loan}
          setAmount={setAmount}
          setContactInformation={setContactInformation}
          setLoan={setLoan}
          setStep={setStep}
          step={step}
          user={user}
        />
      )}
      {screenWidth < BREAKPOINTS.medium && (
        <Mobile
          KYC={KYC}
          amount={amount}
          contactInformation={contactInformation}
          defaultAmounts={defaultAmounts}
          loan={loan}
          setAmount={setAmount}
          setContactInformation={setContactInformation}
          setLoan={setLoan}
          setStep={setStep}
          step={step}
        />
      )}
    </Root>
  );
}

const Root = styled.div`
  font-size: ${({ theme }) => theme.textTheme.fontSize.normal};
  height: 90%;

  .bold {
    font-weight: ${({ theme }) => theme.textTheme.bold};
  }
  .text-red {
    color: ${({ theme }) => theme.colors.primary};
  }
  .text-teal {
    color: ${({ theme }) => theme.colors.teal};
  }
  .text-blue {
    color: ${({ theme }) => theme.colors.blueDark};
  }
  .h1 {
    font-size: ${({ theme }) => theme.textTheme.fontSize.h1};
  }
  .h2 {
    font-size: ${({ theme }) => theme.textTheme.fontSize.h2};
  }
  .h3 {
    font-size: ${({ theme }) => theme.textTheme.fontSize.h3};
  }
  .p {
    font-size: ${({ theme }) => theme.textTheme.fontSize.p};
  }
  .small {
    font-size: ${({ theme }) => theme.textTheme.fontSize.small};
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    height: 100%;
  }
`;
