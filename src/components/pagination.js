import styled from 'styled-components';
import IMAGES from '../assets/images/images';

export default function Pagination({
  className,
  currentPage,
  backFucntion,
  nextFunction,
  disabledNextButton = false,
}) {
  return (
    <PaginationStyled className={className}>
      <button className="pag-button prev-button" onClick={backFucntion}>
        <img alt="prev-button" src={IMAGES.CAR_ARROWLEFT} />
      </button>
      <button className="current-button">{currentPage}</button>
      <button
        className="pag-button next-button"
        onClick={nextFunction}
        disabled={disabledNextButton}
      >
        <img alt="next-button" src={IMAGES.CAR_ARROWLEFT} />
      </button>
    </PaginationStyled>
  );
}

const PaginationStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 2em;

  button {
    height: 30px;
    width: 30px;

    background-color: white;
    border: 1px solid black;
    border-radius: 50px;

    margin: 0 3px;
    &.pag-button {
      border: none;
      &.next-button {
        transform: rotate(180deg);
      }
    }
    &.current-button {
      font-weight: bold;
    }
  }
`;
