import { useContext, useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import styled from 'styled-components';
import AlertSound from '../../../assets/audios/alert.mp3';
import CircularProgessBar from '../../../components/circularProgessBar';
import { BREAKPOINTS } from '../../../models/breakpoints';
import { REQUEST_LOAN_STATUS } from '../../../models/requestLoanStatus';
import { UserContext } from '../../../providers/user-provider';
import getKYCStatus from '../../../services/get-kyc-status';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../../services/google-analytics-event';

const MAX_TIME = 179;

export default function VerifyRequest({
  setStep,
  setContactInformation,
  isKYCRequired,
}) {
  const { user, token } = useContext(UserContext);
  const [time, setTime] = useState(MAX_TIME);
  const [timmerFlag, setTimmerFlag] = useState(true);
  const [status, setStatus] = useState();

  useEffect(() => {
    if (timmerFlag) {
      const intervalID = window.setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
      return () => window.clearInterval(intervalID);
    }
  }, [timmerFlag]);

  useEffect(() => {
    const getStatus = async () => {
      addGoogleAnalyticsEvent({
        category: CATEGORIES.CASH_ADVANCE,
        action: ACTIONS.CLICK,
        label: 'verifying request',
      });
      let requestStatus = await getKYCStatus(user.id, token);
      if (requestStatus !== REQUEST_LOAN_STATUS.WAITING || time === 0) {
        setStatus(requestStatus);
        setTimmerFlag(false);
      }
    };
    if (user && token && time % 30 === 0) {
      getStatus();
    }
  }, [time, user, token]);

  useEffect(() => {
    if (status) {
      let label = {
        [REQUEST_LOAN_STATUS.SUCCESS]: 'KYC successful',
        [REQUEST_LOAN_STATUS.WAITING]: 'KYC validation',
      };
      let audio = new Audio(AlertSound);
      audio.play();
      let timerId = setTimeout(() => {
        if (status === REQUEST_LOAN_STATUS.SUCCESS && !isKYCRequired) {
          setStep((step) => step + 1);
        } else {
          setContactInformation((value) => ({
            ...value,
            status,
            completed: true,
          }));
        }
        addGoogleAnalyticsEvent({
          category: CATEGORIES.CASH_ADVANCE,
          action: ACTIONS.RESPONSE,
          label: label[status] || 'KYC fail',
        });
      }, 3000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [status, setContactInformation, setStep, isKYCRequired]);

  const getMinutes = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    const getDigits = (number, digits) =>
      number.toLocaleString('en-US', {
        minimumIntegerDigits: digits,
        useGrouping: false,
      });
    return `${getDigits(minutes, 2)}:${getDigits(seconds, 2)}`;
  };

  return (
    <Container>
      <Confetti
        className="confetti"
        active={time === 0}
        config={{
          spread: '360',
          stagger: '5',
          elementCount: '200',
          startVelocity: '40',
          colors: ['#FF4759', '#FF7380'],
        }}
      />
      <div className="h2 bold">
        En pocos minutos podrás <br /> continuar con la solicitud.
      </div>
      <CircularProgessBar
        className="progress-component"
        value={(time / MAX_TIME) * 100}
      >
        <div className="time">
          <div className="small">Quedan:</div>
          <div className="h1 text-blue bold">{getMinutes(time)}</div>
          <div className="normal min">min</div>
        </div>
      </CircularProgessBar>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1em;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .time {
    .min {
      margin-top: -0.8em;
    }
  }

  .progress-component {
    margin: 3em auto;
  }

  .button {
    width: 50%;
    margin: auto;
    background-color: ${({ theme }) => theme.colors.red};
    &:disabled {
      background: #b2bec3;
    }
  }

  .confetti {
    z-index: -1;
    margin: 0 auto;
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    margin-top: 4em;

    .progress-component {
      margin: 5em auto;
    }

    .button {
      width: 100%;
      font-weight: bold;
      padding: 1em 0;
    }
  }
`;
