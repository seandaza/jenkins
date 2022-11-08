import { Slider as SliderMaterial, withStyles } from '@material-ui/core';
import styled from 'styled-components';
import { currencyFormat } from '../utilities/currency-format';

const ThumpContent = styled.span`
  height: 30px;
  width: 30px;
  background-color: '#fff';
  margin-top: 0;
  margin-left: -30px;

  -webkit-box-shadow: 0px 0px 10px 0px rgba(0, 187, 187, 1);
  -moz-box-shadow: 0px 0px 10px 0px rgba(0, 187, 187, 1);
  box-shadow: 0px 0px 10px 0px rgba(0, 187, 187, 1);

  span {
    width: 10em;
    font-size: ${({ theme }) => theme.textTheme.fontSize.h3};
    font-weight: ${({ theme }) => theme.textTheme.bold};
    color: ${({ theme }) => theme.colors.red};
    opacity: 1;
    position: absolute;
    top: -35px;
  }

  i {
    color: #303643;
    opacity: 0.6;

    &:nth-child(2) {
      margin-left: -18px;
      opacity: 0.5;
    }

    &:nth-child(3) {
      margin-left: -18px;
      opacity: 0.4;
    }
  }

  &:hover {
    -webkit-box-shadow: 0px 0px 30px 0px rgba(0, 187, 187, 1);
    -moz-box-shadow: 0px 0px 30px 0px rgba(0, 187, 187, 1);
    box-shadow: 0px 0px 30px 0px rgba(0, 187, 187, 1);
  }
`;

function SliderThumpComponent(props) {
  return (
    <ThumpContent {...props}>
      <i className="material-icons" key="chv-1">
        chevron_right
      </i>
      <i className="material-icons" key="chv-2">
        chevron_right
      </i>
      <i className="material-icons" key="chv-3">
        chevron_right
      </i>
      <span>{currencyFormat(props['aria-valuenow'])}</span>
    </ThumpContent>
  );
}

const SliderWithStyles = withStyles({
  root: {
    color: '#00BBBB',
    height: 8,
    width: '90%',
    marginBottom: 15,
    padding: '15px 0 13px',
  },
  thumb: {
    height: 30,
    width: 30,
    backgroundColor: '#FFFFFF',
    marginTop: 0,
    marginLeft: -15,
    '&:focus, &:hover, &$active': {
      boxShadow: '0px 0px 10px 0px rgba(0, 187, 187, 1)',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 15px)',
  },
  track: {
    height: 30,
    borderRadius: '15px 0 0px 15px',
  },
  rail: {
    backgroundColor: 'white',
    height: 42,
    borderRadius: 21,
    top: '9px',
    left: '-10px',
    width: '106%',
    boxShadow: 'inset 0px 1px 5px -3px #000000',
  },
  mark: {
    display: 'none',
  },
  markLabel: {
    fontFamily: 'poppins',
    fontSize: '0.9em',
    top: '1.6em',
    color: 'black',
    fontWeight: 700,
    letterSpacing: '-0.5px',
    '&.MuiSlider-markLabel[data-index="0"]': {
      transform: 'translateX(15%)',
    },
    '&[data-index="1"]': {
      transform: 'translateX(-115%)',
    },
    '&@media ( max-width: 780px )': {
      top: '1.5em',
    },
    '&.MuiSlider-markLabelActive': {
      color: 'black',
    },
  },
})(SliderMaterial);

export default function Slider({ ...rest }) {
  return <SliderWithStyles ThumbComponent={SliderThumpComponent} {...rest} />;
}
