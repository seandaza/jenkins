import { useContext } from 'react';
import styled from 'styled-components';
import IMAGES from '../../../assets/images/images';
import StyledButton from '../../../components/button';
import { UserContext } from '../../../providers/user-provider';
import { currencyFormat } from '../../../utilities/currency-format';

export default function NoScore() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <></>;
  }

  return (
    <NotScoreStyled>
      <div className="left">
        <div className="title">
          <img src={IMAGES.NAME_BACKGROUND} alt="name-background" />
          <div className="h1 bold">Hola {user?.fullName.split(' ')[0]},</div>
        </div>
        <div className="info">
          Alcanzaste el monto total disponible por{' '}
          <span className="text-teal bold">
            {currencyFormat(user.availableAmount)}.
          </span>{' '}
          Una vez tu pago automático llegue a{' '}
          <span className="bold">
            {currencyFormat(Number(user.configs[0]?.minimal_loan_amount))}
          </span>
          , podrás solicitar un nuevo préstamo y lo verás reflejado en esta
          pantalla.
        </div>
      </div>
      <div className="right">
        <div className="top">
          <div className="h3">Monto solicitado</div>
          <div className="h1 bold text-gray">{currencyFormat(0)}</div>
          <div className="title bold">Resumen del préstamo</div>
          <div className="table">
            <div className="row space">
              <div>Número de cuotas</div>
              <div className="bold">22</div>
            </div>
            <div className="row">
              <div>Cuota diaria</div>
              <div className="bold right-text">{currencyFormat(0)}</div>
            </div>
            <div className="row">
              <div>Interés (IVA incluido)</div>
              <div className="bold right-text">{currencyFormat(0)}</div>
            </div>
            <div className="row">
              <div>Duración del préstamo</div>
              <div className="bold right-text">
                {user.loanDuration || '1 mes'}
              </div>
            </div>
            <div className="row space bold">
              <div>Total a pagar</div>
              <div className="right-text">{currencyFormat(Number(0))}</div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="text p">
            <span className="text-red bold">¡Recuerda!</span> Este préstamo se
            desembolsará en tu cuenta asociada a Billpocket.
          </div>
          <StyledButton solid disabled>
            Continuar
          </StyledButton>
        </div>
      </div>
    </NotScoreStyled>
  );
}

const NotScoreStyled = styled.div`
  display: flex;
  flex-direction: row;

  padding: 2em 5rem;
  height: 100%;

  .left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 70%;

    .title {
      position: relative;
      font-style: italic;
      color: #2f384d;

      img {
        position: absolute;
        height: 2em;
        z-index: -1;
        top: 8px;
      }
    }
    .info {
      margin-top: 3rem;
      max-width: 430px;
      text-align: center;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3em 2em 2em;

    width: 30%;
    box-shadow: inset 2px 10px 30px 0 rgba(169, 171, 187, 0.22);
    border-radius: 0 10px 10px 0;

    .top {
      .title {
        margin-top: 1em;
      }

      .table {
        .row {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          margin-top: 0.2em;
        }
        .space {
          margin-top: 1em;
        }
        .right-text {
          text-align: right;
        }
      }
    }

    .bottom {
      button {
        width: 100%;
        &:disabled {
          background-color: #cfcfcf;
        }
      }
    }

    .text {
      margin-bottom: 1em;
    }
  }
  .text-gray {
    color: #cfcfcf;
  }
  .bold {
    font-weight: ${({ theme }) => theme.textTheme.bold};
  }
`;
