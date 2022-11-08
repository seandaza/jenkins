import { forwardRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { faqinfo } from '../assets/data';
import StyledButton from '../components/button';
import Modal from '../components/modal';
import ROUTES from '../utilities/routes';

const HelpModalStyled = styled.div`
  .modal {
    overflow: auto;
    padding-left: 0;
    padding-right: 0;
    height: 100%;
    width: 400px;

    .questions {
      box-shadow: 0px 8px 12px 0px rgba(0, 0, 0, 0.25);
      padding: 2em 2em 0.5em;
      .h3 {
        margin: 0.5em 0;
      }
      .question-buttons {
        margin: 0.8em 0;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        .question {
          border-radius: 10px;
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
    }
    .answer {
      padding: 2em;
    }
    .buttons {
      padding: 0 2em;
      display: flex;
      flex-direction: column;
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

  font-size: ${({ theme }) => theme.textTheme.fontSize.normal};
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
  .small {
    font-size: ${({ theme }) => theme.textTheme.fontSize.small};
  }
`;

const questions = faqinfo.map(({ title, content }) => ({
  question: title,
  answer: content,
}));

function HelpModal({ isOpenModal, setIsOpenModal }, ref) {
  const [questionSelected, setQuestionSelected] = useState(questions[0]);
  const history = useHistory();

  return (
    <HelpModalStyled>
      <Modal
        className="modal"
        modalOpen={isOpenModal}
        SetModalOpen={setIsOpenModal}
        ref={ref}
      >
        <div className="questions">
          <div className="h2 bold">Ayuda</div>
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
        </div>
        <div className="answer">
          <div className="p bold">
            {!!questionSelected && questionSelected.question}
          </div>
          <div className="small">
            {!!questionSelected && questionSelected.answer}
          </div>
        </div>
        <div className="buttons">
          <StyledButton
            className="faqs"
            onClick={() => {
              history.push(ROUTES.FAQ);
              setIsOpenModal(false);
            }}
            solid
          >
            Preguntas Frecuentes
          </StyledButton>
          <StyledButton
            className="contact"
            onClick={() => {
              history.push(ROUTES.CONTACT);
              setIsOpenModal(false);
            }}
          >
            ¿Es otra duda? Contactanos
          </StyledButton>
        </div>
      </Modal>
    </HelpModalStyled>
  );
}

export default forwardRef(HelpModal);
