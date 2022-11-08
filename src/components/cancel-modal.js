import { useRef } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../utilities/click-outsider-listener';
import StyledButton from './button';

const CancelModalStyled = styled.div`
  background-color: rgb(0, 0, 0, 0.8);
  position: fixed;
  z-index: 2;
  width: 100vw;
  height: 100vh;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;

  .modal {
    padding: 2.5em 1em 1.5em;
    margin: auto;
    width: 22%;
    min-width: 292px;
    border-radius: 19px;
    background-color: white;

    .label {
      text-align: center;
      margin-bottom: 1em;
      max-width: 270px;
      margin: auto;
      margin-bottom: 1em;
    }

    .buttons {
      display: flex;
      flex-direction: row;
      justify-content: center;
      .continue {
        background-color: #2c2e3f;
      }
      button + button  {
        margin-left: 0.5em;
      }
    }
  }
`;

export default function CancelModal({
  open,
  setOpen,
  closeCallback,
  continueCallback,
}) {
  const modalRef = useRef();

  const onClose = () => {
    setOpen(false);
    closeCallback && closeCallback();
  };
  const onContinue = () => {
    setOpen(false);
    continueCallback && continueCallback();
  };

  useOutsideClick(modalRef, open, onContinue);

  if (!open) return <></>;
  return (
    <CancelModalStyled>
      <div className="modal" ref={modalRef}>
        <div className="label">
          ¿Estás seguro que deseas <br /> abandonar la solicitud del préstamo?
        </div>
        <div className="buttons">
          <StyledButton className="continue" onClick={onContinue} greyDark>
            Continuar
          </StyledButton>
          <StyledButton className="dismiss" onClick={onClose} solid>
            Abandonar
          </StyledButton>
        </div>
      </div>
    </CancelModalStyled>
  );
}
