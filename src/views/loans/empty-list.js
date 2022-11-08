import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ICONS } from '../../assets/images/images';
import StyledButton from '../../components/button';
import { BREAKPOINTS } from '../../models/breakpoints';
import { LOANS_STATUS } from '../../models/myLoansStatus';
import ROUTES from '../../utilities/routes';

const EmptyListStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin: 1em auto;
  height: 90%;
  width: 30%;

  .icon {
    height: 70px;
    margin: ${({ viewSelected }) =>
      viewSelected === LOANS_STATUS.ACTIVE_LOANS ? '1em 0' : '1.5em 0'};
  }

  .p {
    margin: 2em 0 4em;
  }

  .button {
    width: 70%;
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    width: 80%;
  }
`;

export default function EmptyList({ viewSelected }) {
  const history = useHistory();

  return (
    <EmptyListStyled viewSelected={viewSelected}>
      <img className="icon" src={ICONS.infoGreyIcon} alt="info-icon" />
      <div className="h3 bold">
        {viewSelected === LOANS_STATUS.ACTIVE_LOANS && (
          <>
            Actualmente no tienes <br />
            préstamos activos
          </>
        )}
        {viewSelected === LOANS_STATUS.PAID_LOANS && (
          <>
            Actualmente no tienes <br />
            préstamos pagados.
          </>
        )}
      </div>
      <div className="p">¿Qué esperas para solicitarlo ahora?</div>
      <div>
        <StyledButton
          className="button"
          solid
          onClick={() => history.push(ROUTES.REQUEST_LOAN)}
        >
          Solicitar préstamos
        </StyledButton>
      </div>
    </EmptyListStyled>
  );
}
