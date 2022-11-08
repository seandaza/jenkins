import styled from 'styled-components';
import IMAGES from '../../../assets/images/images';
import DefaultAmountsCards from '../../../components/defaultAmountsCards';
import Slider from '../../../components/slider';
import { currencyFormat } from '../../../utilities/currency-format';

export default function SelectAmount({
  username,
  amount,
  setAmount,
  defaultAmounts,
}) {
  return (
    <Card>
      <div className="card-title">
        <img src={IMAGES.NAME_BACKGROUND} alt="name-background" />
        <div className="h1 bold">Hola {username.split(' ')[0]},</div>
      </div>
      <div className="header">
        <div className="h2">Hoy puedes solicitar hasta</div>
        <div className="h2 bold text-teal">
          {currencyFormat(defaultAmounts[2])}
        </div>
        <div className="h3">Úsalo para lo que quieras</div>
      </div>
      <div className="p">
        Elige un monto moviendo la flecha hacia la derecha:
      </div>
      <Slider
        className="amount-slider"
        min={defaultAmounts[0]}
        max={defaultAmounts[2]}
        value={amount}
        step={1}
        marks={[
          {
            label: currencyFormat(defaultAmounts[0]),
            value: defaultAmounts[0],
          },
          {
            label: currencyFormat(defaultAmounts[2]),
            value: defaultAmounts[2],
          },
        ]}
        onChange={(_, value) => setAmount(value)}
      />
      <div className="p">o elige una de las siguientes opciones:</div>
      <DefaultAmountsCards
        className="default-cards"
        defaultAmounts={defaultAmounts}
        amount={amount}
        setAmount={setAmount}
      />
    </Card>
  );
}

const Card = styled.div`
  width: 50vw;
  margin-top: 1em;

  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;

  .card-title {
    font-style: italic;
    color: #2f384d;
    img {
      position: relative;
      height: 2em;
      top: 46px;
    }

    div {
      position: relative;
    }
  }

  .amount-slider {
    width: 60%;
    margin: 2em auto;
  }

  .header {
    margin: 2em 0;
  }

  .default-cards {
    margin-top: 1.5em;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .MuiSlider-thumb {
    transition: left 0.2s;
  }
  .MuiSlider-thumb.MuiSlider-active {
    transition: left 0.2s;
  }
  .MuiSlider-track {
    transition: width 0.2s;
  }
`;
