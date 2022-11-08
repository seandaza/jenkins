import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from '../../components/modal';
import styled from 'styled-components';
import StyledButton from '../../components/button';
import { BREAKPOINTS } from '../../models/breakpoints';
import { useOutsideClick } from '../../utilities/click-outsider-listener';
import { dateFormat } from '../../utilities/date-format';
import { currencyFormat } from '../../utilities/currency-format';
import { getLoanDocuments } from '../../services/loan-documents';
import { UserContext } from '../../providers/user-provider';
import Pagination from '../../components/pagination';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../services/google-analytics-event';

const PaidLoansStyled = styled.div`
  .button {
    color: ${({ theme }) => theme.colors.teal};
    background-color: white;
    border-color: ${({ theme }) => theme.colors.teal};
  }

  .list {
    margin: 3em 10% 0;

    .loan-card {
      box-shadow: 0 10px 20px 0 rgba(201, 172, 173, 0.52);
      border-radius: 6px;
    }
    .loan-card + .loan-card {
      margin-top: 1.5em;
    }
    .row {
      display: flex;
      flex-direction: row;
      text-align: center;
      justify-content: space-around;
      padding: 1em 2em;
      div {
        width: 10em;
        margin: auto 0 auto 0;
      }
      .empty {
        width: 5em;
      }
      div + div {
        margin-left: 0.5em;
      }
    }
  }

  .paid-loans {
    padding: 0 1.5em;
    .card-loan {
      border-radius: 6px;
      box-shadow: 0 10px 20px 0 rgba(201, 172, 173, 0.52);
      .card-content {
        padding: 1em 1.5em;
        display: flex;
        font-size: 0.9em;
        justify-content: space-between;
        button {
          padding: 0.2em 0.5em;
        }
      }
      .card-footer {
        background-color: #f5f5f5;
        text-align: right;
        padding: 0.5em 1.5em;
        font-size: 0.9em;
      }
    }
    .card-loan + .card-loan {
      margin-top: 2em;
    }
  }

  .modal {
    height: 99%;
    padding: 2% 0 0;
    width: 26%;
    margin-top: 4px;
    .modal-content {
      height: 100%;
      padding: 0;
      .top-modal {
        font-size: ${({ theme }) => theme.textTheme.fontSize.p};
        height: 85%;
        padding: 0 3em;
        overflow-y: auto;
        .table {
          width: 100%;
          .header {
            font-weight: ${({ theme }) => theme.textTheme.bold};
          }
          .table-row {
            display: flex;
            justify-content: space-between;
            div + div {
              text-align: right;
            }
          }
          .table-row + .table-row {
            margin-top: 0.7em;
          }
        }
      }
      .bottom-modal {
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
    .modal {
      width: 95%;
      height: 90vh;
      overflow-y: auto;
      .modal-content {
        height: 96%;
        padding: 0;
        .bottom-modal {
          button {
            width: 85%;
            font-size: 12px;
          }
        }
      }
    }

    .pagination {
      padding-bottom: 2em;
    }
  }
`;

export default function PaidLoans({
  loans,
  setLoanSelected,
  page,
  setPage,
  payments,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loanDetail, setLoanDetail] = useState();
  const [sending, setSending] = useState(false);

  const modalRef = useRef();
  const { user, token } = useContext(UserContext);

  const onAction = (loanID) => {
    setLoanSelected(loanID);
    setModalOpen(true);
    setLoanDetail(loans.find(({ loan_id }) => loan_id === loanID));
  };

  useEffect(() => {
    if (modalOpen) {
      addGoogleAnalyticsEvent({
        category: CATEGORIES.LOAN_SUMMARY,
        action: ACTIONS.VISIT,
      });
    }
  }, [modalOpen]);

  const requestDocument = async () => {
    if (user && loanDetail && token) {
      addGoogleAnalyticsEvent({
        category: CATEGORIES.LOAN_SUMMARY,
        action: ACTIONS.CLICK,
        label: 'no debt proof​',
      });
      setSending(true);
      addGoogleAnalyticsEvent({
        category: CATEGORIES.LOAN_SUMMARY,
        action: ACTIONS.REQUEST,
        label: 'no debt proof request​',
      });
      setSending(true);
      await getLoanDocuments(user.id, loanDetail.loan_id, 'CLEARANCE', token);
      addGoogleAnalyticsEvent({
        category: CATEGORIES.LOAN_SUMMARY,
        action: ACTIONS.REQUEST,
        label: 'Loan summary-response-no debt proof successful​',
      });
    }
  };

  const DesktopPaidLoans = () => (
    <div className="list">
      <div className="header">
        <div className="row">
          <div>Fecha de solicitud</div>
          <div>Monto solicitado</div>
          <div>Interés</div>
          <div>IVA</div>
          <div>Cuotas</div>
          <div className="bold">Total pagado</div>
          <div className="empty" />
          <div></div>
        </div>
      </div>
      {loans.map(
        (
          {
            loan_id: loanID,
            taken_at: takenAt,
            amount,
            total_interest: interest,
            total_interest_and_tax_amount: interestAndTaxes,
            installments = 22,
            total_paid_amount_with_taxes: totalPaid,
          },
          index
        ) => (
          <div key={`loan-card${index}`} className="loan-card">
            <div className="row">
              <div className="detail">
                {dateFormat(new Date(takenAt), 'dd MMMM yyyy')}
              </div>
              <div className="detail">{currencyFormat(Number(amount))}</div>
              <div className="detail">
                {currencyFormat(Number(interest) || 0)}
              </div>
              <div className="detail">
                {currencyFormat(
                  Number(interestAndTaxes) - Number(interest) || 0
                )}
              </div>
              <div className="detail">{installments}</div>
              <div className="detail">{currencyFormat(Number(totalPaid))}</div>
              <div className="empty" />
              <div>
                <StyledButton
                  className="button"
                  solid
                  onClick={() => onAction(loanID)}
                >
                  Ver detalle
                </StyledButton>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );

  const MobilePaidLoans = () => (
    <div className="paid-loans">
      {loans.map(
        (
          {
            loan_id: loanId,
            taken_at: createdDate,
            total_paid_amount_with_taxes: totalPaid,
          },
          index
        ) => (
          <div className="card-loan" key={`loan-m-${index}`}>
            <div className="card-content">
              <div className="text">
                <span className="bold">Fecha de solicitud: </span>
                <br />
                {dateFormat(new Date(createdDate), 'dd MMM yyyy')}
              </div>
              <StyledButton
                className="button"
                solid
                onClick={() => onAction(loanId)}
              >
                Ver detalle
              </StyledButton>
            </div>
            <div className="card-footer">
              <div className="bold">
                Total pagado: {currencyFormat(Number(totalPaid))}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );

  useOutsideClick(modalRef, modalOpen, () => {
    setModalOpen((isOpen) => !isOpen);
    setSending(false);
    setLoanSelected(undefined);
  });

  return (
    <PaidLoansStyled>
      {window.innerWidth > BREAKPOINTS.medium && <DesktopPaidLoans />}
      {window.innerWidth <= BREAKPOINTS.medium && <MobilePaidLoans />}
      <Modal
        className="modal"
        modalOpen={modalOpen}
        SetModalOpen={() => {
          setLoanSelected(undefined);
          setModalOpen(false);
          setSending(false);
        }}
        ref={modalRef}
      >
        {payments && loanDetail && (
          <div className="modal-content">
            <div className="top-modal">
              <h3>Detalle de préstamo</h3>
              <div className="table">
                <div className="table-row">
                  <div>Fecha de solicitud</div>
                  <div>
                    {dateFormat(new Date(loanDetail.taken_at), 'MMM. dd yyyy')}
                  </div>
                </div>
                <div className="table-row">
                  <div>Fecha de desembolso</div>
                  <div>
                    {dateFormat(new Date(loanDetail.taken_at), 'MMM. dd yyyy')}
                  </div>
                </div>
                <div className="table-row">
                  <div>Monto solicitado</div>
                  <div>{currencyFormat(Number(loanDetail.amount))}</div>
                </div>
                <div className="table-row">
                  <div>IVA</div>
                  <div>
                    {currencyFormat(
                      Number(loanDetail.total_interest_and_tax_amount) -
                        Number(loanDetail.total_interest) || 0
                    )}
                  </div>
                </div>
                <div className="table-row">
                  <div>Total préstamo</div>
                  <div>
                    {currencyFormat(
                      Number(loanDetail.total_paid_amount_with_taxes)
                    )}
                  </div>
                </div>
              </div>
              <h3>Historial de pagos</h3>
              <div className="table">
                <div className="header table-row">
                  <div>Fechas de pago</div>
                  <div>Monto pagado</div>
                </div>
                {payments.map(
                  (
                    { payment_at: date, payment_amount: totalPaidAmount },
                    index
                  ) => (
                    <div className="table-row" key={`payment-${index}`}>
                      <div>{dateFormat(new Date(date))}</div>
                      <div>{currencyFormat(Number(totalPaidAmount))}</div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="bottom-modal">
              <StyledButton solid onClick={requestDocument} disabled={sending}>
                Solicitar constancia de no adeudo
              </StyledButton>
              <div className={sending ? 'show' : 'normal'}>
                La <b>constancia de NO adeudo</b> será enviada a
                <b>{user.email}</b> recuerda revisar tu carpeta de{' '}
                <b>correos no deseados.</b>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Pagination
        currentPage={page}
        backFucntion={() => setPage(page > 1 ? page - 1 : 1)}
        nextFunction={() => setPage(page + 1)}
        disabledNextButton={loans.length < 5}
      />
    </PaidLoansStyled>
  );
}
