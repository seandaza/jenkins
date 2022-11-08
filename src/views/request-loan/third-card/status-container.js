import styled from 'styled-components';
import { REQUEST_LOAN_STATUS } from '../../../models/requestLoanStatus';
import FailStatus from './failStatus';
import SuccessStatus from './successStatus';
import WaitingStatus from './waitingStatus';

const StatusContainerStyled = styled.div`
  height: 100%;
  .icon {
    padding: 1em 0;
    height: 7em;
  }
  .card {
    margin: 2em 0;
    padding: 1em;
    background-color: #f1f1f1;
    word-wrap: break-word;
  }
  .dark {
    background-color: #2c2e3f;
  }
`;

export default function StatusContainer({ email, KYC, ...rest }) {
  const { SUCCESS, FAIL, WAITING } = REQUEST_LOAN_STATUS;
  return (
    <StatusContainerStyled {...rest}>
      {KYC === SUCCESS && <SuccessStatus KYC={KYC} />}
      {KYC === FAIL && <FailStatus />}
      {KYC === WAITING && <WaitingStatus email={email} />}
    </StatusContainerStyled>
  );
}
