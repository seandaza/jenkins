import styled from 'styled-components';
import { ICONS } from '../assets/images/images';
import { BREAKPOINTS } from '../models/breakpoints';

export default function CheckBox({ children, value, setValue, ...rest }) {
  const onChange = (event) => setValue(event.target.checked);

  return (
    <CheckBoxStyled {...rest}>
      <input
        className="checkbox"
        type="checkbox"
        value={value}
        onChange={onChange}
      />
      {children}
    </CheckBoxStyled>
  );
}

const CheckBoxStyled = styled.div`
  display: flex;
  flex-direction: row;
  text-align: left;

  input[type='checkbox'] {
    -webkit-appearance: initial;
    appearance: initial;

    width: auto;
    height: 25px;
    min-width: 25px;

    position: relative;

    border: 2px solid #283552;

    margin-right: 1em;
  }

  input[type='checkbox']:checked:after {
    content: url(${ICONS.tick});

    position: absolute;
    left: 49%;
    top: 48%;

    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    @media (max-width: ${BREAKPOINTS.medium}px) {
      left: 48%;
      top: 45%;
    }
  }
`;
