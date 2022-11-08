import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AlertComponent from '../../../components/alert';
import StyledButton from '../../../components/button';
import CancelModal from '../../../components/cancel-modal';
import CheckBox from '../../../components/checkbox';
import FormComponent from '../../../components/formComponent';
import { UserContext } from '../../../providers/user-provider';
import patchLoan from '../../../services/accept-policies';
import { getDocument } from '../../../services/get-document';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../../services/google-analytics-event';
import updateContactInfo from '../../../services/update-contact-info';
import { validator } from '../../../utilities/validators';

const FORM_SKEMA = [
  {
    label: 'Escribe aquí tu correo electrónico*',
    placeholder: 'Ej: nombre@mail.com',
    name: 'email',
    type: 'email',
    error: 'Ingrese un correo electrónico',
    validator: 'email',
    isRequired: true,
  },
  {
    label: 'Escribe aquí tu celular*',
    error: 'Ingrese un número de celular',
    placeholder: 'Ej: 3452333344',
    name: 'phone',
    type: 'phone',
    isRequired: true,
  },
  {
    label: 'Escribe aquí tu ocupación*',
    placeholder: 'Ej: comerciante',
    error: 'Ingrese una ocupación',
    name: 'occupation',
    type: 'alpha',
    isRequired: true,
  },
];

export default function ContactForm({
  amount,
  setLoan,
  step,
  setStep,
  setContactInformation,
}) {
  const { user, token, setUser } = useContext(UserContext);

  const [contactForm, setContactForm] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [error, setError] = useState();
  const [contract, setContract] = useState();
  const [skema, setSkema] = useState(FORM_SKEMA);

  useEffect(() => {
    if (user && amount && token) {
      const getContract = async () => {
        setContract(
          await getDocument(user.id, token, {
            document: 'terms_and_conditions',
            version: user.documents['terms_and_conditions'],
          })
        );
      };
      getContract();
    }
  }, [user, token, amount]);

  const handleSubmit = async () => {
    const validate = validator(FORM_SKEMA, contactForm);
    if (confirmed) {
      if (!validate) {
        addGoogleAnalyticsEvent({
          category: CATEGORIES.CASH_ADVANCE,
          action: ACTIONS.CLICK,
          label: 'personal data',
        });
        setContactInformation(contactForm);
        await updateContactInfo(
          user.id,
          {
            ...contactForm,
            documents: [
              {
                name: 'terms_and_conditions',
                version: user.documents['terms_and_conditions'],
              },
            ],
          },
          token
        );
        setStep(step + 1);
      } else {
        setSkema(
          FORM_SKEMA.map((element) => {
            if (element === validate) {
              return { ...element, warning: true };
            }
            return element;
          })
        );
        setError(validate.error);
      }
    } else {
      setError`No confirmaste las politicas de KEO`;
    }
  };

  const cancelLoan = async () => {
    await patchLoan(user.id, { status: 'REJECTED' }, token);
    setUser(undefined);
    setLoan(undefined);
  };

  return (
    <>
      <CancelModal
        open={cancelModal}
        setOpen={setCancelModal}
        closeCallback={cancelLoan}
      />
      <Container>
        <div className="h2 bold">
          Primero ingresa tus datos de <br /> contacto y tu ocupación:
        </div>
        <div className="form-component">
          <FormComponent
            formData={skema}
            form={contactForm}
            setForm={setContactForm}
          />
        </div>
        <div className="check">
          <CheckBox
            setValue={(value) => {
              addGoogleAnalyticsEvent({
                category: CATEGORIES.CASH_ADVANCE,
                action: ACTIONS.SELECT,
                label: 'agree PP',
              });
              setConfirmed(value);
            }}
          >
            <div className="p">
              Declaro que doy mi consentimiento previo, expreso e informado para
              que mis datos personales sean tratados de acuerdo con la{' '}
              <a href={contract} className="link" target="_blanck">
                Política de Privacidad de KEO.
              </a>
            </div>
          </CheckBox>
        </div>
        <div className="buttons">
          <StyledButton
            className="button"
            greyDark
            onClick={() => setCancelModal(true)}
          >
            Regresar
          </StyledButton>
          <StyledButton className="button" solid onClick={handleSubmit}>
            Continuar
          </StyledButton>
        </div>
        <AlertComponent
          className="alert"
          open={!!error}
          setOpen={() => setError(undefined)}
          content={error}
          severity="error"
        />
      </Container>
    </>
  );
}

const Container = styled.div`
  text-align: center;
  height: 100%;

  .form-component {
    font-weight: bold;
    margin-top: 1em;
  }

  .check {
    margin: 1.5em -3em 0 -4em;
    a {
      color: black;
      font-weight: ${({ theme }) => theme.textTheme.bold};
    }
  }

  .buttons {
    margin: 1em -3em 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    button {
      width: 40%;
    }
    button + button {
      margin-left: 0.5em;
    }
  }

  .alert {
    bottom: -10%;
    right: -90%;
  }
`;
