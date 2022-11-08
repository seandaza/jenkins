import styled from 'styled-components';
import StatusContainer from '../third-card/status-container';

const RequestStatusStyled = styled.div`
  height: 100%;
`;

export default function RequestStatus({ email, KYC }) {
  return (
    <RequestStatusStyled>
      <StatusContainer className="status-container" email={email} KYC={KYC} />
    </RequestStatusStyled>
  );
}
