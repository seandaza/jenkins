import React, { useState } from 'react';
import Dot from './dot';
import IMAGES from '../assets/images/images';
import styled, { css } from 'styled-components';
import { BREAKPOINTS } from '../models/breakpoints';

const OFFSET = 100;

const Carousel = (props) => {
  const length = props.slides.length;
  const controlTop = props?.controlTop;

  const [currentSlide, setCurrentSlide] = useState(0);
  const [play, setPlay] = useState(false);

  const handleNext = () => {
    let index = (((currentSlide + 1) % length) + length) % length;
    if (currentSlide + 1 < length) {
      setPlay(`${-OFFSET * (currentSlide + 1)}`);
    } else {
      setPlay(`-${OFFSET * 0}`);
    }
    setCurrentSlide(index);
  };

  const handlePrev = () => {
    let index = (((currentSlide - 1) % length) + length) % length;
    if (currentSlide - 1 >= 0) {
      setPlay(`-${OFFSET * (currentSlide - 1)}`);
    } else {
      setPlay(`-${OFFSET * (length - 1)}`);
    }
    setCurrentSlide(index);
  };

  return (
    length > 0 && (
      <CarouselWrapper>
        {props.slides.map((item, idx) => (
          <Slide key={`slide_${idx}`}>
            <Anim move={play} isCurrent={currentSlide === idx}>
              {item}
            </Anim>
          </Slide>
        ))}

        <CarouselControl className="control-buttons">
          <ButtonControl onClick={() => handlePrev()} left>
            <img src={IMAGES.CAR_ARROWLEFT} width="10px" alt="left-arrow" />
          </ButtonControl>
          <ButtonControl onClick={() => handleNext()} right>
            <img src={IMAGES.CAR_ARROWLEFT} width="10px" alt="right-arrow" />
          </ButtonControl>
        </CarouselControl>

        {props.numbers && (
          <ControlLabel>{`${currentSlide + 1}/${length}`}</ControlLabel>
        )}
        {props.dots && (
          <ControlLabel heightResp={controlTop?.resp} height={controlTop?.desk}>
            {[...Array(length)].map((_, idx) => (
              <Dot
                key={`dot-${idx}`}
                onClick={() => {
                  setPlay(`-${OFFSET * idx}`);
                  setCurrentSlide(idx);
                }}
                isactive={currentSlide === idx}
              />
            ))}
          </ControlLabel>
        )}
      </CarouselWrapper>
    )
  );
};

const CarouselWrapper = styled.div`
  display: flex;
  min-height: ${(props) => (props.height ? props.height : '300px')};
  flex-direction: row;
  margin-bottom: 50px;
  //  min-height: 563px;
  overflow-x: hidden;
  margin: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  @media (max-width: 720px) and (min-width: 520px) {
    width: 100%;
    margin: 0;
    min-height: 477px;
  }
  @media (max-width: 520px) {
    min-height: 345px;
    margin: 0;
  } ;
`;

const Slide = styled.div`
  width: 100%;
`;

const Anim = styled.div`
  width: 100vw;
  margin-right: ${`${OFFSET - 0}vw`};
  flex-shrink: 0;

  opacity: ${(props) => (props.isCurrent ? '1' : '0')};
  transition: opacity 1.3s ease-in-out;
  transition: ${(props) =>
    props.child
      ? 'all 0.5s cubic-bezier(0, 0, 0.45, 0.96)'
      : 'all 1s cubic-bezier(0, 0, 0.45, 0.96)'};
  transform: ${(props) =>
    props.move ? 'translate(' + props.move + 'vw)' : 'translate(0px)'};

  @media (max-width: 720px) and (min-width: 520px) {
    margin: 0;
    margin-right: 6vw;
  }
  @media (max-width: 520px) {
    margin: 0;
    margin-right: 40vw;
  } ;
`;

const CarouselControl = styled.div`
  position: absolute;
  margin: 107px 21%;
  display: flex;
  justify-content: center;
  width: 60%;
  text-align: center;

  @media (max-width: ${BREAKPOINTS.medium}px) {
    width: 70%;
    margin: 12em 14.5%;
  }
`;

const ButtonControl = styled.button`
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: 3px solid #a9a9a9;
  background-color: rgb(0 0 0 / 0%);
  box-shadow: 0 0 25px -4px rgba(0, 0, 0, 0.4);

  img {
    margin-top: 0.3em;
    margin-right: 0.2em;
  }

  ${({ right }) =>
    right &&
    css`
      margin-left: auto;
      img {
        transform: rotate(180deg);
        margin-top: 0;
        margin-right: -0.2em;
      }
    `}

  &:hover {
    outline: none;
  }
`;

const ControlLabel = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  font-style: italic;
  font-weight: bold;
  font-size: 1em;
  z-index: 5;
  left: 50%;
  width: 106px;
  margin-top: ${(props) => (props.height ? props.height : '265px')};
  margin-left: -53px;
  @media (max-width: 720px) {
    margin-top: ${(props) => (props.heightResp ? props.heightResp : '265px')};
  }
`;

export default Carousel;
