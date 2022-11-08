import { useEffect, useRef, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { faqinfo } from '../assets/data';
import IMAGES from '../assets/images/images';
import { BREAKPOINTS } from '../models/breakpoints';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../services/google-analytics-event';
import { useOutsideClick } from '../utilities/click-outsider-listener';
import { useResizeListener } from '../utilities/resize-listener';
import ROUTES from '../utilities/routes';
import StyledButton from './button';
import HeaderMobile from './headerMobile';

const HelpMobileStyled = styled.div`
  height: 100%;
  font-size: ${({ theme }) => theme.textTheme.fontSize.normal};

  .content {
    padding: 2em;
    height: 92%;
    display: flex;
    flex-direction: column;
    text-align: center;

    .question-buttons {
      margin: 2em 0;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .question {
        border-radius: 45px;
        text-align: center;
        padding: 0.5em 0.8em;
        margin: 0.3em;
        box-shadow: 0px 0px 19px 5px rgba(0, 0, 0, 0.11);
        &.selected {
          background-color: #56c8c8;
          color: white;
        }
      }
    }
    .buttons {
      display: flex;
      flex-direction: column;
      margin-top: 45%;
      button {
        width: 100%;
      }
      .faqs {
        background-color: #04336f;
      }
      .contact {
        border: 2px solid black;
        color: black;
        font-weight: ${({ theme }) => theme.textTheme.bold};
      }
      button + button {
        margin-top: 0.5em;
      }
    }
  }

  .modal {
    z-index: 2;
    background-color: rgb(0, 0, 0, 0.5);
    position: fixed;
    width: 100vw;
    height: 100vh;
    right: 0;
    top: 0;

    .message {
      position: absolute;
      background: #ffffff;
      box-shadow: 0 9px 20px 7px rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      opacity: 0.96;
      max-width: 300px;
      min-width: 100px;
      margin: 45% auto;
      position: relative;
      padding: 2em;
      .question {
        margin-bottom: 1em;
      }
      .answer {
        a {
          color: black;
        }
      }
      .close-icon {
        margin-left: 95%;
        width: 2em;
        margin-top: -10px;
      }
    }
  }

  .bold {
    font-weight: ${({ theme }) => theme.textTheme.bold};
  }
  .h2 {
    font-size: ${({ theme }) => theme.textTheme.fontSize.h2};
  }
  .h3 {
    font-size: ${({ theme }) => theme.textTheme.fontSize.h3};
  }
  .p {
    font-size: ${({ theme }) => theme.textTheme.fontSize.p};
  }
`;

const questions = faqinfo.map(({ title, content }) => ({
  question: title,
  answer: content,
}));

export default function HelpMobile() {
  const history = useHistory();
  const modalRef = useRef();
  const [questionSelected, setQuestionSelected] = useState();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useOutsideClick(modalRef, !!questionSelected, () =>
    setQuestionSelected(null)
  );

  useResizeListener(setWindowWidth);

  useEffect(() => {
    addGoogleAnalyticsEvent({
      category: CATEGORIES.HELP,
      action: ACTIONS.VISIT,
    });
  }, []);

  if (windowWidth > BREAKPOINTS.medium) return <Redirect to={ROUTES.ROOT} />;

  return (
    <HelpMobileStyled>
      <HeaderMobile title="Ayuda" backButtonAction={() => history.goBack()} />
      <div className="content">
        <div className="h3">¿Qué duda tienes?</div>
        <div className="question-buttons">
          {questions.map((element, index) => (
            <div
              className={`question p ${
                questionSelected === element ? 'selected' : ''
              }`}
              key={`question-${index}`}
              onClick={() => setQuestionSelected(element)}
            >
              {element.question}
            </div>
          ))}
        </div>
        <div className="buttons">
          <StyledButton
            className="faqs"
            onClick={() => {
              addGoogleAnalyticsEvent({
                category: CATEGORIES.HELP,
                action: ACTIONS.CLICK,
                label: `go to ${CATEGORIES.FAQ}`,
              });
              history.push(ROUTES.FAQ);
            }}
            solid
          >
            Preguntas Frecuentes
          </StyledButton>
          <StyledButton
            className="contact"
            onClick={() => {
              addGoogleAnalyticsEvent({
                category: CATEGORIES.HELP,
                action: ACTIONS.CLICK,
                label: `go to ${CATEGORIES.WRITING_US}`,
              });
              history.push(ROUTES.CONTACT);
            }}
          >
            ¿Es otra duda? Contactanos
          </StyledButton>
        </div>
      </div>
      {questionSelected && (
        <div className="modal">
          <div className="message" ref={modalRef}>
            <img
              className="close-icon"
              src={IMAGES.ICON_CLOSE}
              alt="close"
              onClick={() => setQuestionSelected(null)}
            />
            <div className="question bold">{questionSelected.question}</div>
            <div className="answer">{questionSelected.answer}</div>
          </div>
        </div>
      )}
    </HelpMobileStyled>
  );
}
