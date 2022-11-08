import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import IMAGES from '../../../assets/images/images';
import StyledButton from '../../../components/button';
import { BREAKPOINTS } from '../../../models/breakpoints';
import ROUTES from '../../../utilities/routes';

const Container = styled.div`
  text-align: center;
  height: 70vh;

  @media (max-width: ${BREAKPOINTS.medium}px) {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .h2 {
      font-size: 1.2em;
    }
    .icon {
      height: 8em;
    }
    .card {
      margin-bottom: 6em;
    }
    button .dark {
      background-color: #1f1f1f;
    }
  }
`;

export default function WaitingStatus({ email }) {
  const history = useHistory();

  return (
    <Container>
      <div className="h2 bold">
        {window.innerWidth >= BREAKPOINTS.medium && (
          <>
            ¡Tenemos que validar tus datos
            <br />
            manualmente!
          </>
        )}
        {window.innerWidth < BREAKPOINTS.medium && (
          <>¡Tenemos que validar tus datos!</>
        )}
      </div>
      <img className="icon" src={IMAGES.EYE} alt="eye" />
      <div className="normal">
        En menos de <span className="bold">48 horas</span> hábiles te
        notificaremos al correo electrónico{' '}
        <span className="bold">{email}</span> la respuesta a la validación de
        datos. Después de esto, podrás seguir disfrutando tu beneficio de
        préstamos al Instante KEO-Billpocket.
      </div>

      <div className="card">
        <span className="bold">Recuerda:</span>
        <br />
        El detalle de la transacción y los Términos y Condiciones fueron
        enviados a tu correo.
      </div>

      <StyledButton
        solid
        className="dark"
        onClick={() => {
          history.push(ROUTES.HOW_WORKS);
        }}
      >
        Volver a Billpocket
      </StyledButton>
    </Container>
  );
}
