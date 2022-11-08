import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import HeaderMobile from '../../components/headerMobile';
import { BREAKPOINTS } from '../../models/breakpoints';
import { LOANS_STATUS } from '../../models/myLoansStatus';
import { UserContext } from '../../providers/user-provider';
import { getLoans } from '../../services/get-loans';
import { getPayments } from '../../services/get-payments';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../services/google-analytics-event';
import { useResizeListener } from '../../utilities/resize-listener';
import ROUTES from '../../utilities/routes';
import ActiveLoans from './active-loans';
import EmptyList from './empty-list';
import Header from './header';
import PaidLoans from './paid-loans';

const LoansStyled = styled.div`
  padding: 2.5em 3em 3em;
  font-size: ${({ theme }) => theme.textTheme.fontSize.normal};

  .container {
    height: 80%;
  }

  .bold {
    font-weight: ${({ theme }) => theme.textTheme.bold};
  }
  .h1 {
    font-size: ${({ theme }) => theme.textTheme.fontSize.h1};
  }
  .h2 {
    font-size: ${({ theme }) => theme.textTheme.fontSize.h2};
  }
  .h3 {
    font-size: ${({ theme }) => theme.textTheme.fontSize.h3};
  }
  .p {
    font-size: ${({ theme }) => theme.textTheme.fontSize.p};
  }
  .small {
    font-size: ${({ theme }) => theme.textTheme.fontSize.small};
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    padding: 0;
    height: 100%;
    .container {
      height: ${({ selected }) =>
        selected === LOANS_STATUS.ACTIVE_LOANS ? '80%' : '50%'};
      padding: 0;
    }
  }
`;

export default function Loans() {
  const { token, user } = useContext(UserContext);

  const history = useHistory();

  const [viewSelected, setViewSelected] = useState(LOANS_STATUS.ACTIVE_LOANS);
  const [loans, setLoans] = useState([]);
  const [page, setPage] = useState(1);
  const [loanIDSelected, setLoanIDSelected] = useState();
  const [payments, setPayments] = useState();
  const [availableAmount, setAvailableAmount] = useState(0);
  const [maxAvailableAmount, setMaxAvailableAmount] = useState(0);
  const [filter, setFilter] = useState({ month: '', year: '' });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [params, setParams] = useState({ status: viewSelected });

  useEffect(() => {
    setFilter({ month: '', year: '' });
    setParams({ status: viewSelected });
    setPage(1);
    setLoans([]);
  }, [viewSelected]);

  useEffect(() => {
    addGoogleAnalyticsEvent({
      category:
        viewSelected === LOANS_STATUS.ACTIVE_LOANS
          ? CATEGORIES.CASH_ADVANCE_LIST
          : CATEGORIES.PAID_LOANS,
      action: ACTIONS.VISIT,
    });
  }, [viewSelected]);

  useEffect(() => {
    if (user) {
      setAvailableAmount(user.availableAmount);
      setMaxAvailableAmount(user.score);
    }
  }, [user]);

  useEffect(() => {
    if (!!filter.month && !!filter.year) {
      setParams((prev) => ({ ...prev, ...filter }));
    }
  }, [filter]);

  useEffect(() => {
    if (user && token) {
      const getLoansInfo = async () => {
        if (
          params.status === LOANS_STATUS.ACTIVE_LOANS ||
          !(params.month ^ params.year) ||
          (!!params.month && !!params.year)
        ) {
          let query = params;
          if (params.status === LOANS_STATUS.PAID_LOANS) {
            query.page = page;
            query.page_size = 5;
          } else {
            query.page = undefined;
            query.page_size = undefined;
          }
          setLoans(await getLoans(token, user.id, query));
        }
      };
      getLoansInfo();
    }
  }, [user, params, token, page]);

  useEffect(() => {
    if (loanIDSelected && user) {
      const getPaymentsInfo = async () => {
        setPayments(await getPayments(token, user.id, loanIDSelected));
      };
      getPaymentsInfo();
    }
  }, [loanIDSelected, user, token]);

  useResizeListener(() => setScreenWidth(window.innerWidth));

  const isEmpty = !loans || loans.length === 0;

  return (
    <LoansStyled selected={viewSelected}>
      {screenWidth <= BREAKPOINTS.medium && (
        <HeaderMobile
          backButtonAction={() => history.push(ROUTES.ROOT)}
          className="header-mobile"
          title="Mis préstamos"
          help
        />
      )}
      <Header
        viewSelected={viewSelected}
        setViewSelected={setViewSelected}
        filter={filter}
        setFilter={setFilter}
      />
      <div className="container">
        {isEmpty && <EmptyList viewSelected={viewSelected} />}
        {!isEmpty && viewSelected === LOANS_STATUS.ACTIVE_LOANS && (
          <ActiveLoans
            loans={loans}
            payments={payments}
            setLoanSelected={setLoanIDSelected}
            availableAmount={availableAmount}
            maxAvailableAmount={maxAvailableAmount}
          />
        )}
        {!isEmpty && viewSelected === LOANS_STATUS.PAID_LOANS && (
          <PaidLoans
            loans={loans}
            payments={payments}
            setLoanSelected={setLoanIDSelected}
            page={page}
            setPage={setPage}
          />
        )}
      </div>
    </LoansStyled>
  );
}
