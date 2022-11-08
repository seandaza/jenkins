import styled from 'styled-components';
import { BREAKPOINTS } from '../models/breakpoints';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../services/google-analytics-event';
import { currencyFormat } from '../utilities/currency-format';

export default function DefaultAmountsCards({
  defaultAmounts,
  amount,
  setAmount,
  ...rest
}) {
  return (
    <DefaultAmountList {...rest}>
      {defaultAmounts.map((defaultAmount, index) => {
        return (
          <div
            className={`card ${defaultAmount === amount ? 'selected' : ''}`}
            key={`amount-${index}`}
            onClick={() => {
              addGoogleAnalyticsEvent({
                category: CATEGORIES.CASH_ADVANCE,
                action: ACTIONS.CLICK,
                label: `option ${defaultAmount}`,
              });
              setAmount(defaultAmount);
            }}
          >
            {currencyFormat(defaultAmount)}
          </div>
        );
      })}
    </DefaultAmountList>
  );
}

const DefaultAmountList = styled.div`
  display: flex;
  flex-direction: row;

  .card {
    text-align: center;
    padding: 1em 1.4em;
    margin: 0.5em;
    min-width: 10vw;

    background: #ffffff;
    box-shadow: -16px -16px 40px 0 rgba(255, 255, 255, 0.5),
      -2px 8px 23px 0 #cfdbe7, inset 2px 1px 2px 0 #ffffff,
      inset 3px 3px 18px 0 rgba(255, 255, 255, 0.26);
    border-radius: 6.4px;

    @media (max-width: ${BREAKPOINTS.medium}px) {
      font-size: 0.7rem;
      padding: 0.5em 1.4em;
    }
  }

  .selected {
    background-color: ${({ theme }) => theme.colors.teal};
    color: white;
  }
`;
