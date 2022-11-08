import styled from 'styled-components';
import BigCard from '../../../components/bigCard';
import StatusContainer from './status-container';

export default function ThirdCard({ email, KYC }) {
  return (
    <Container>
      <BigCard width="60vw" footer>
        <StatusContainer className="card-content" email={email} KYC={KYC} />
      </BigCard>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 2em;

  .card-content {
    padding-top: 2em;
  }
`;
