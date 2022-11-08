import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ICONS } from '../../assets/images/images';
import StyledButton from '../../components/button';
import CircularProgessBar from '../../components/circularProgessBar';
import Modal from '../../components/modal';
import { BREAKPOINTS } from '../../models/breakpoints';
import { UserContext } from '../../providers/user-provider';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../services/google-analytics-event';
import { getLoanDocuments } from '../../services/loan-documents';
import { useOutsideClick } from '../../utilities/click-outsider-listener';
import { currencyFormat } from '../../utilities/currency-format';
import { dateFormat } from '../../utilities/date-format';
import ActiveLoanCard from './active-loan-card';

const ActiveLoansStyled = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 4em;

  .list {
    width: 55%;
    .space {
      margin-top: 1em;
      margin-bottom: 1em;
    }
    .loan-card {
      width: 100%;
    }
    .loan-card + .loan-card {
      margin-top: 2em;
    }
  }

  .available-amount-card {
    right: 0;
    position: fixed;
    z-index: -1;
    margin-top: -4em;
    margin-right: 5%;
    padding: 3em 5% 5em;
    opacity: 0.87;
    box-shadow: inset 2px 10px 30px 0 rgba(169, 171, 187, 0.22);
    border-radius: 19px;
    text-align: center;
    .progressbar {
      margin: 1em;
    }
    .progress-text {
      margin-left: -0.2em;
    }
    .text {
      display: flex;
      flex-direction: row;
      justify-content: center;
      text-align: left;
      img {
        margin-right: 1em;
      }
    }
  }

  .modal {
    padding: 0;
    padding: 2% 0 0;
    .modal-content {
      height: 100%;
      padding: 0;
      .modal-header {
        height: 85%;
        padding: 0 3em;
        overflow-y: auto;
        .title {
          margin-bottom: 3em;
        }
        .table {
          font-size: ${({ theme }) => theme.textTheme.fontSize.p};
          width: 100%;
          .row {
            display: flex;
            justify-content: space-between;
            div + div {
              text-align: right;
            }
          }
          .row + .row {
            margin-top: 0.7em;
          }
        }
      }
      .modal-footer {
        display: flex;
        justify-content: center;
        height: 15%;
        border-radius: 0 0 0 15px;
        background-color: #f5f5f5;
        button {
          height: 3em;
          margin: auto;
          background-color: ${({ theme }) => theme.colors.teal};
          &:disabled {
            display: none;
          }
        }
        div {
          display: none;
          width: 350px;
          font-size: ${({ theme }) => theme.textTheme.fontSize.p};
          &.show {
            padding: 0 2em;
            display: block;
            margin: auto;
            text-align: center;
          }
        }
      }
    }
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    padding: 1em 1.5em;

    .title {
      font-size: 1.2em;
    }
    .available-amount-card {
      display: none;
    }
    .list {
      width: 100%;
    }
    .modal {
      width: 95%;
      .modal-content {
        .modal-header {
          height: 81%;
        }
        .modal-footer {
          button {
            width: 85%;
          }
        }
      }
    }
  }
`;

export default function ActiveLoans({
  loans,
  setLoanSelected,
  availableAmount,
  maxAvailableAmount,
  payments,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [loanDetail, setLoanDetail] = useState();
  const { user, token } = useContext(UserContext);
  const modalRef = useRef();

  const onAction = (loanID) => {
    setLoanSelected(loanID);
    setModalOpen(true);
    setLoanDetail(loans.find(({ loan_id }) => loan_id === loanID));
  };

  useEffect(() => {
    if (modalOpen) {
      addGoogleAnalyticsEvent({
        category: CATEGORIES.LOAN_DETAILS,
        action: ACTIONS.VISIT,
      });
    }
  }, [modalOpen]);

  useOutsideClick(modalRef, modalOpen, () => {
    setModalOpen(false);
    setLoanSelected(undefined);
  });

  const requestDocument = async () => {
    if (user && loanDetail && token) {
      addGoogleAnalyticsEvent({
        category: CATEGORIES.LOAN_DETAILS,
        action: ACTIONS.CLICK,
        label: 'no debt proof​',
      });
      addGoogleAnalyticsEvent({
        category: CATEGORIES.LOAN_DETAILS,
        action: ACTIONS.REQUEST,
        label: 'no debt proof request​',
      });
      setSending(true);
      await getLoanDocuments(user.id, loanDetail.loan_id, 'EXTRACT', token);
      addGoogleAnalyticsEvent({
        category: CATEGORIES.LOAN_DETAILS,
        action: ACTIONS.REQUEST,
        label: 'Loan summary-response-no debt proof successful​',
      });
    }
  };

  return (
    <ActiveLoansStyled>
      <div className="list">
        {window.innerWidth > BREAKPOINTS.medium && (
          <div className="title h2 space">
            Detalle de tus préstamos activos (XX)
          </div>
        )}
        {loans.map((loan, index) => (
          <div className="loan-card" key={`loan-card-${index}`}>
            <ActiveLoanCard {...loan} setLoanSelected={onAction} />
          </div>
        ))}
      </div>
      <div className="available-amount-card">
        <CircularProgessBar
          className="progressbar"
          value={(availableAmount / maxAvailableAmount) * 100}
        >
          <div className="progress-text">
            <div className="p">Te queda</div>
            <div className="bold">{currencyFormat(availableAmount, '')}</div>
            <div className="small">Para usar de tu preaprobado</div>
          </div>
        </CircularProgessBar>

        <div className="bold">Recuerda estar al día en tus pagos</div>
        <div className="text">
          <img src={ICONS.infoIcon} alt="info-icon" />
          <div className="">
            Puedes tener más de un préstamo <br /> activo hasta completar tu
            cupo.
          </div>
        </div>
      </div>
      <Modal
        className="modal"
        modalOpen={modalOpen}
        SetModalOpen={() => {
          setLoanSelected(undefined);
          setModalOpen(false);
        }}
        ref={modalRef}
      >
        {payments && (
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="title">
                Resumen de pagos (
                {Number(payments.length).toLocaleString('en-us', {
                  minimumIntegerDigits: 2,
                })}
                )
              </h3>
              <div className="table">
                <div className="row">
                  <div>Fechas de pago</div>
                  <div>Monto pagado</div>
                </div>
                <br />
                {payments.map(
                  ({ payment_at: date, payment_amount: paidAmount }, index) => (
                    <div className="row" key={`payment-${index} ${date}`}>
                      <div>{dateFormat(new Date(date), 'dd/MM/yyyy')}</div>
                      <div className="bold">
                        {currencyFormat(Number(paidAmount))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="modal-footer">
              <StyledButton solid onClick={requestDocument} disabled={sending}>
                Ver estado de cuenta
              </StyledButton>

              <div className={sending ? 'show' : 'normal'}>
                El <b>estado de cuenta</b> será enviada a <b>{user.email}</b>{' '}
                recuerda revisar tu carpeta de <b>correos no deseados</b>.
              </div>
            </div>
          </div>
        )}
      </Modal>
    </ActiveLoansStyled>
  );
}
