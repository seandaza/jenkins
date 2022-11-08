import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ICONS } from '../../assets/images/images';
import StyledButton from '../../components/button';
import Select from '../../components/select';
import { BREAKPOINTS } from '../../models/breakpoints';
import { LOANS_STATUS } from '../../models/myLoansStatus';
import { useOutsideClick } from '../../utilities/click-outsider-listener';
import { MONTH_NAMES } from '../../utilities/date-format';

const HeaderStyled = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 4em;

  .title {
    padding-bottom: 0.5em;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    width: 70%;

    button {
      background-color: white;
      color: black;

      &.selected {
        background-color: ${({ theme }) => theme.colors.teal};
        color: white;
      }
    }

    button + button {
      margin-left: 0.5em;
    }
  }

  .description {
    margin-top: 2em;
    max-width: 655px;
    word-wrap: break-word;

    .paid-label {
      margin-left: 1.5em;
    }
  }

  .filter {
    .text-small {
      margin-bottom: 1em;
    }
    .inputs {
      display: flex;
      margin: 0 0 auto;
      width: 75%;
      select + select {
        margin-left: 1em;
      }
    }
  }

  .col {
    width: 60%;
  }
  .col + .col {
    margin-top: 5em;
    width: 40%;
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 0;

    .buttons {
      width: 100%;
      button {
        background-color: #f5f5f5;
        color: black;
        width: 100%;
        font-size: 1em;
        border-radius: 0;
        font-weight: normal;
        padding: 1em 0;
        &.selected {
          background-color: #f5f5f5;
          color: black;
          font-weight: bold;
          border-bottom: 0.25em solid ${({ theme }) => theme.colors.teal};
        }
      }
      button + button {
        margin-left: 0;
      }
    }

    .title {
      padding: 1em 1.5em 0;
      display: flex;
      .tooltip-icon {
        display: flex;
        flex-direction: column;
        .icon {
          margin-left: 0.6em;
          width: 1.5em;
        }
        .tooltip {
          position: absolute;
          margin: 2.5em 2.2em 0 -5em;
          background: #ffffff;
          box-shadow: 0 16px 30px 0 rgba(18, 62, 119, 0.14);
          border-radius: 9px;
          color: #1e1e1e;
          padding: 0.8em 1em;
          font-size: 0.7em;
          letter-spacing: 0;
          max-width: 181px;
          &.active {
            margin: 2.5em 2.2em 0 -9em;
          }
        }
      }
    }

    .filter {
      padding: 0 1.5em 1em;
      display: flex;
      flex-direction: column;
      .text {
        font-size: 1em;
      }
      .text-small {
        font-size: 0.9em;
        margin: 0.5em 0;
      }
      .bold {
        font-weight: bold;
      }
      .inputs {
        width: 100%;
        margin: 0;
        select + select {
          margin-left: 1em;
        }
      }
    }
  }
`;

const INIT_YEAR = 2018;
const FINAL_YEAR = new Date().getFullYear();

export default function Header({
  viewSelected,
  setViewSelected,
  filter,
  setFilter,
}) {
  const [years, setYears] = useState([]);
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();

  useOutsideClick(tooltipRef, tooltip, () => setTooltip(false));

  useEffect(() => {
    let yearsArr = [];
    for (let year = INIT_YEAR; year <= FINAL_YEAR; year++) {
      yearsArr = [...yearsArr, year];
    }
    setYears(yearsArr);
  }, []);

  const Buttons = () => (
    <div className="buttons">
      <StyledButton
        className={viewSelected === LOANS_STATUS.ACTIVE_LOANS && 'selected'}
        onClick={() => setViewSelected(LOANS_STATUS.ACTIVE_LOANS)}
        solid
      >
        Préstamos activos
      </StyledButton>
      <StyledButton
        className={viewSelected === LOANS_STATUS.PAID_LOANS && 'selected'}
        onClick={() => setViewSelected(LOANS_STATUS.PAID_LOANS)}
        solid
      >
        Préstamos pagados
      </StyledButton>
    </div>
  );

  const Filter = () => (
    <div className="filter">
      <div className="text-small">
        Elige el mes y año en el que se desembolsó tu préstamo
      </div>
      <div className="inputs">
        <Select
          value={filter.month}
          onChange={(e) =>
            setFilter((value) => ({ ...value, month: e.target.value }))
          }
        >
          <option value="" disabled>
            Mes
          </option>
          {MONTH_NAMES.map((month, index) => (
            <option value={index + 1} key={`months-${index}`}>
              {month}
            </option>
          ))}
        </Select>
        <Select
          value={filter.year}
          onChange={(e) =>
            setFilter((value) => ({ ...value, year: e.target.value }))
          }
        >
          <option value="" disabled>
            Año
          </option>
          {years.map((year, index) => (
            <option value={year} key={`year-${index}`}>
              {year}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );

  if (window.innerWidth <= BREAKPOINTS.medium) {
    return (
      <HeaderStyled>
        <Buttons />
        {window.innerWidth <= BREAKPOINTS.medium && (
          <div className="title">
            <div className="text bold">
              {viewSelected === LOANS_STATUS.ACTIVE_LOANS && (
                <>Detalle de mis adelantos pagados</>
              )}
              {viewSelected === LOANS_STATUS.PAID_LOANS && (
                <>Detalle préstamos pagados</>
              )}
            </div>
            <div className="tooltip-icon" ref={tooltipRef}>
              <img
                className="icon"
                src={ICONS.questionIcon}
                alt="question-mark"
                onClick={() => setTooltip(!tooltip)}
              />
              {tooltip && (
                <span
                  className={`tooltip ${
                    viewSelected === LOANS_STATUS.ACTIVE_LOANS ? 'active' : ''
                  }`}
                >
                  {viewSelected === LOANS_STATUS.ACTIVE_LOANS && (
                    <>
                      Aquí podrás ver la información del (los) préstamo(s) que
                      tienes pendientes de pago.
                    </>
                  )}
                  {viewSelected === LOANS_STATUS.PAID_LOANS && (
                    <>
                      Aquí podrás ver el histórico de los préstamos que ya
                      pagaste.
                    </>
                  )}
                </span>
              )}
            </div>
          </div>
        )}
        {viewSelected === LOANS_STATUS.PAID_LOANS && <Filter />}
      </HeaderStyled>
    );
  }

  return (
    <HeaderStyled>
      <div className="col">
        <div className="title h1 bold">Mis préstamos</div>
        <Buttons />
        <div className="description normal bold">
          {viewSelected === LOANS_STATUS.ACTIVE_LOANS && (
            <div className="active-label">
              En esta sección puedes ver tus préstamos activos y su estado.
            </div>
          )}
          {viewSelected === LOANS_STATUS.PAID_LOANS && (
            <div className="paid-label">
              En esta sección puedes ver tus préstamos pagados y su estado. Si
              quieres solicitar o ver la constancia de no adeudo haz clic en el
              detalle de tu préstamo.
            </div>
          )}
        </div>
      </div>
      <div className="col">
        {viewSelected === LOANS_STATUS.PAID_LOANS && <Filter />}
      </div>
    </HeaderStyled>
  );
}
