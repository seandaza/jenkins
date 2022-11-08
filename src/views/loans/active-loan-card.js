import React, { useState } from 'react';
import { ICONS } from '../../assets/images/images';
import styled from 'styled-components';
import StyledButton from '../../components/button';
import { dateFormat } from '../../utilities/date-format';
import { BREAKPOINTS } from '../../models/breakpoints';
import { currencyFormat } from '../../utilities/currency-format';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../services/google-analytics-event';

const ActiveLoanCardStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 600px;

  box-shadow: 0 10px 20px 0 rgba(201, 172, 173, 0.52);
  border-radius: 19px;

  .left-card {
    width: 60%;
    padding: 3em 3em 3em 3em;
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      &.space-top {
        margin-top: 2em;
      }
      div + div {
        text-align: right;
      }
    }
    .detail {
      display: ${(props) => (props.detailOpen ? 'flex' : 'none')};
    }
  }

  .right-card {
    background: #f9f9f9;
    width: 40%;
    border-radius: 0 19px 19px 0;
    padding: 0 1em;

    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;

    .button {
      margin: 1em auto 0;
      width: 80%;
    }
  }
  .button {
    background-color: ${({ theme }) => theme.colors.teal};
  }

  .detail-label {
    display: none;
    border-top: 1px solid ${({ theme }) => theme.colors.greyLight};
    margin: 0 1em;
    align-content: center;
    justify-content: space-between;
    padding: 1em 0;
  }

  .subtitle {
    font-size: ${({ theme }) => theme.textTheme.fontSize.h3};
    margin-bottom: 1em;
  }

  @media (max-width: 786px) {
    min-width: 0;
    flex-direction: column;
    font-size: 0.8em;
    border-radius: 10px;

    .right-card {
      display: none;
    }
    .left-card {
      width: 100%;
      padding: 1.5em;
    }
    .detail-label {
      display: flex;
    }
  }
`;

const DetailButton = styled.button`
  background-color: rgb(0, 0, 0, 0);
  border: none;
  color: #adacac;
  cursor: pointer;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;

  &:hover,
  &:focus,
  &:active {
    border: none;
  }

  span {
    background-color: #adacac;
    mask: url(${(props) => props.icon}) no-repeat center;
    -webkit-mask: url(${(props) => props.icon}) no-repeat center;
    float: right;
    width: 19px;
    height: 8px;
    margin: 1px 6px;
    background-size: contain;
    background-repeat: no-repeat;
    display: block;
  }
`;

export default function ActiveLoanCard({
  loan_id: loanID,
  amount,
  taken_at: takenAt,
  maximum_payment_date: maximumPaymentDate,
  installments = 22,
  total_amount: totalAmount,
  setLoanSelected,
  total_interest_and_tax_amount: serviceCostAndIVA,
  total_debt_with_taxes: totalDebitedWithTaxes,
}) {
  const [detailOpen, setDetailOpen] = useState(false);

  if (window.innerWidth <= BREAKPOINTS.medium) {
    return (
      <ActiveLoanCardStyled detailOpen={detailOpen}>
        <div className="left-card">
          <div className="row">
            <div>Fecha de solicitud:</div>
            <div className="bold">
              {dateFormat(new Date(takenAt), 'MMM.dd yyyy')}
            </div>
          </div>
          <div className="row">
            <div>Monto solicitado:</div>
            <div className="bold">{currencyFormat(Number(amount))}</div>
          </div>
          <div className="row space-top" />
          <div className="row detail subtitle">Detalle</div>
          <div className="row detail">
            <div>Fecha límite de pago:</div>
            <div className="bold">
              {dateFormat(new Date(maximumPaymentDate), 'MMM.dd yyyy')}
            </div>
          </div>
          <div className="row detail">
            <div>Interés (IVA incluido):</div>
            <div className="bold">
              {currencyFormat(Number(serviceCostAndIVA))}
            </div>
          </div>
          <div className="row detail">
            <div>Número de cuotas:</div>
            <div className="bold">{installments}</div>
          </div>
          <div className="row bold">
            <div>Total a pagar:</div>
            <div>{currencyFormat(Number(totalAmount))}</div>
          </div>
        </div>
        <div className="detail-label">
          <DetailButton
            onClick={() => setDetailOpen((detailOpen) => !detailOpen)}
            icon={detailOpen ? ICONS.arrowUp : ICONS.arrowDown}
          >
            {detailOpen && 'Ocultar detalle'}
            {!detailOpen && 'Mostrar detalle'}
            <span />
          </DetailButton>
          <StyledButton
            className="button"
            solid
            onClick={() => {
              addGoogleAnalyticsEvent({
                category: CATEGORIES.CASH_ADVANCE_LIST,
                action: ACTIONS.CLICK,
                label: 'loan summary​',
              });
              setLoanSelected(loanID);
            }}
          >
            Ver historial de pago
          </StyledButton>
        </div>
      </ActiveLoanCardStyled>
    );
  }

  return (
    <ActiveLoanCardStyled>
      <div className="left-card">
        <div className="row">
          <div>Monto solicitado:</div>
          <div className="bold">{currencyFormat(Number(amount))}</div>
        </div>
        <div className="row ">
          <div>Interés (IVA incluido):</div>
          <div className="bold">
            {currencyFormat(Number(serviceCostAndIVA))}
          </div>
        </div>
        <div className="row">
          <div>Total a pagar:</div>
          <div className="bold">{currencyFormat(Number(totalAmount))}</div>
        </div>
        <div className="row space-top" />
        <div className="row">
          <div>Fecha de solicitud:</div>
          <div className="bold">
            {dateFormat(new Date(takenAt), 'dd MMMM yyyy')}
          </div>
        </div>
        <div className="row">
          <div>Fecha límite de pago:</div>
          <div className="bold">
            {dateFormat(new Date(maximumPaymentDate), 'dd MMMM yyyy')}
          </div>
        </div>
        <div className="row">
          <div>Número de cuotas:</div>
          <div className="bold">{installments}</div>
        </div>
      </div>
      <div className="right-card">
        <div className="h3 bold">Pendiente por pagar</div>
        <div className="h3 bold">
          {currencyFormat(Number(totalDebitedWithTaxes))}
        </div>

        <StyledButton
          className="button p"
          solid
          onClick={() => setLoanSelected(loanID)}
        >
          Ver historial de pago
        </StyledButton>
      </div>
      <div className="detail-label">
        <DetailButton
          onClick={() => setDetailOpen((detailOpen) => !detailOpen)}
          icon={detailOpen ? ICONS.arrowUp : ICONS.arrowDown}
        >
          {detailOpen && 'Ocultar detalle'}
          {!detailOpen && 'Mostrar detalle'}
          <span />
        </DetailButton>
        <StyledButton
          className="button"
          solid
          onClick={() => {
            addGoogleAnalyticsEvent({
              category: CATEGORIES.CASH_ADVANCE_LIST,
              action: ACTIONS.CLICK,
              label: 'loan summary​',
            });
            setLoanSelected(loanID);
          }}
        >
          Ver historial de pago
        </StyledButton>
      </div>
    </ActiveLoanCardStyled>
  );
}
