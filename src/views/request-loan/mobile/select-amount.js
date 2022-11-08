import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AlertComponent from '../../../components/alert';
import StyledButton from '../../../components/button';
import DefaultAmountsCards from '../../../components/defaultAmountsCards';
import InputComponent from '../../../components/inputComponent';
import { CREATE_LOAN_ERROR } from '../../../models/error-messages';
import { UserContext } from '../../../providers/user-provider';
import { createLoan } from '../../../services/create-loan';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../../services/google-analytics-event';
import { currencyFormat } from '../../../utilities/currency-format';

const SelectAmountStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;

  .max-amount {
    background-color: ${({ theme }) => theme.colors.teal};
    color: white;
    width: auto;
    padding: 0.2em 0.3em;
    margin-left: auto;
    margin-right: auto;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    margin: 2em 0 1em 0;
    label {
      margin-bottom: 1em;
      text-align: left;
    }
  }

  .default-cards {
    display: flex;
    justify-content: center;
    margin: 1em 0;
  }

  .table {
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 0.8em;
    }
    .space {
      margin-top: 2em;
    }
    .right-text {
      text-align: right;
    }
  }
  .alert {
    margin-top: 1em;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 3em;
    margin-bottom: 1em;
    button {
      width: 100%;
      padding: 1em 0;
    }
    button + button {
      margin-left: 1em;
    }
  }
`;

export default function SelectAmount({
  amount,
  setAmount,
  defaultAmounts,
  setLoan,
}) {
  const history = useHistory();
  const { user, token } = useContext(UserContext);

  const [totalAmount, setTotalAmount] = useState(0);
  const [serviceCostAndTaxes, setServiceCostAndTaxes] = useState(0);
  const [installmentsPaymentCost, setInstallmentsPaymentCost] = useState(0);
  const [error, setError] = useState();

  useEffect(() => {
    if (user) {
      const interestRate = user.configs[0].charge_types.find(
        ({ id }) => id === 2
      );

      let taxes =
        Number(amount) *
        Number(interestRate.percentage) *
        (1 + Number(interestRate.tax_types[0].percentage));

      setServiceCostAndTaxes(taxes);
      setInstallmentsPaymentCost((Number(amount) + taxes) / 22);
      setTotalAmount(Number(amount) + taxes);
    }
  }, [amount, user]);

  const submit = async () => {
    try {
      addGoogleAnalyticsEvent({
        category: CATEGORIES.CASH_ADVANCE,
        action: ACTIONS.CLICK,
        label: 'simulator click',
      });
      setLoan(
        await createLoan(token, user.id, {
          amount,
          configID: user.configs[0].id,
        })
      );
    } catch (error) {
      let errorMessage =
        CREATE_LOAN_ERROR[error?.response?.data?.error] ??
        CREATE_LOAN_ERROR.default;
      console.log({ error });
      setError(errorMessage);
    }
  };

  return (
    <SelectAmountStyled>
      <div className="h3 bold">Hoy puedes solicitar hasta:</div>
      <div className="max-amount h2 bold">
        {currencyFormat(defaultAmounts[2])}
      </div>
      <div className="input-group bold">
        <label>¿Cuánto necesitas?</label>
        <InputComponent
          type="number"
          value={amount}
          onChange={(e) => {
            addGoogleAnalyticsEvent({
              category: CATEGORIES.CASH_ADVANCE,
              action: ACTIONS.SELECT,
              label: `option ${e.target.value}`,
            });
            setAmount(Number(e.target.value));
          }}
          min={defaultAmounts[0]}
          max={defaultAmounts[2]}
        />
      </div>
      <div>o elige una de las siguientes opciones:</div>
      <DefaultAmountsCards
        className="default-cards"
        amount={amount}
        defaultAmounts={defaultAmounts}
        setAmount={setAmount}
      />
      <div className="table">
        <div className="row space">
          <div>Número de cuotas</div>
          <div className="bold">22</div>
        </div>
        <div className="row">
          <div>Cuota diaria</div>
          <div className="bold right-text">
            {currencyFormat(installmentsPaymentCost)}
          </div>
        </div>
        <div className="row">
          <div>Interés (IVA incluido)</div>
          <div className="bold right-text">
            {currencyFormat(serviceCostAndTaxes)}
          </div>
        </div>
        <div className="row">
          <div>Duración del préstamo</div>
          <div className="bold right-text">1 mes</div>
        </div>
        <div className="row space bold">
          <div>Total a pagar</div>
          <div className="right-text">
            {currencyFormat(Number(totalAmount))}
          </div>
        </div>
      </div>
      <AlertComponent
        className="alert"
        open={error}
        setOpen={() => setError(undefined)}
        content={error}
        severity="error"
      />
      <div className="buttons">
        <StyledButton greyDark onClick={() => history.goBack()}>
          Regresar
        </StyledButton>
        <StyledButton solid onClick={submit}>
          Continuar
        </StyledButton>
      </div>
    </SelectAmountStyled>
  );
}
