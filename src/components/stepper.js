import React from 'react';
import styled from 'styled-components';
import IMAGES, { ICONS } from '../assets/images/images';

export default function Stepper({
  steps,
  step,
  setStep,
  title,
  clickable = true,
  isKYCRequired,
}) {
  return (
    <StepperStyled isKYCRequired={isKYCRequired}>
      {steps.map(({ name }, index) => (
        <React.Fragment key={`step-${index}`}>
          <div className="step" onClick={() => clickable && setStep(index)}>
            {index === step && (
              <img src={ICONS.stepSelected} alt="step-selected" />
            )}
            {index !== step && (
              <img src={ICONS.stepNotSelected} alt="step-not-selected" />
            )}
            <div className={`p bold title ${step < index ? 'text-grey' : ''}`}>
              {title} {index + 1}
            </div>
            {index === step && <div className="small">{name}</div>}
          </div>
          {index < steps.length - 1 && (
            <div className="divider">
              <img src={IMAGES.DIVIDER_HORIZONTAL} alt="divider" />
            </div>
          )}
        </React.Fragment>
      ))}
    </StepperStyled>
  );
}

const StepperStyled = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  text-align: center;
  height: 7em;
  margin: 0 -2em;

  .step {
    width: 10em;
    .title {
      margin-top: 1em;
    }
  }

  .divider {
    margin-top: -5px;
  }

  .text-grey {
    color: #a2a7ad;
  }
  .small {
    font-size: ${({ theme }) => theme.textTheme.fontSize.small};
    position: absolute;
    width: 10em;
    margin: 0 ${({ isKYCRequired }) => (isKYCRequired ? '-0.3em' : '-2em')};
  }
  .p {
    font-size: ${({ theme }) => theme.textTheme.fontSize.p};
  }
  .bold {
    font-weight: ${({ theme }) => theme.textTheme.bold};
  }
`;
