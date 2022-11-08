import styled from 'styled-components';
import SelectAmount from './selectAmount';
import LoanSummary from './loanSummary';

export default function FirstCard({
  username,
  amount,
  defaultAmounts,
  setAmount,
  setLoan,
}) {
  return (
    <Container>
      <div className="first">
        <SelectAmount
          username={username || 'no identificado'}
          amount={amount}
          setAmount={setAmount}
          defaultAmounts={defaultAmounts}
        />
      </div>
      <div className="second">
        <LoanSummary amount={amount} setLoan={setLoan} />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;

  margin: 3em auto 0;

  width: 95%;
  height: 80vh;

  background-color: white;
  box-shadow: 0px 15px 38px 12px rgba(0, 0, 0, 0.24);
  border-radius: ${(props) => props.theme.universalBorderRadius};

  .first {
    width: 70%;
    display: flex;
    justify-content: center;
  }
  .second {
    width: 30%;
    box-shadow: inset 2px 10px 30px 0 rgba(169, 171, 187, 0.22);
    border-radius: 0 17.1px 17.1px 17.1px 0;
  }
`;
