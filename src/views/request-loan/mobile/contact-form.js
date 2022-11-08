import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import AlertComponent from '../../../components/alert';
import StyledButton from '../../../components/button';
import CheckBox from '../../../components/checkbox';
import FormComponent from '../../../components/formComponent';
import { UserContext } from '../../../providers/user-provider';
import patchLoan from '../../../services/accept-policies';
import { getTemporalDocument } from '../../../services/get-temporal-document';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../../services/google-analytics-event';
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
    name: 'job',
    type: 'alpha',
    isRequired: true,
  },
];

const ContactFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  .title {
    text-align: center;
    margin: 2em 0 3em;
    font-weight: bold;
  }

  .contact-form {
    margin-bottom: 5em;
  }

  .alert {
    margin-top: 1em;
  }

  .privacity-check {
    a {
      color: black;
      font-weight: bold;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 2.3em;
    button {
      width: 100%;
      padding: 1em 0;
    }
    button + button {
      margin-left: 1em;
    }
  }
`;

export default function ContactForm({
  setContactInformation,
  setLoan,
  setStep,
  amount,
}) {
  const [confirmed, setConfirmed] = useState(false);
  const [contactForm, setContactForm] = useState({});
  const [error, setError] = useState();
  const [contract, setContract] = useState();
  const [skema, setSkema] = useState(FORM_SKEMA);
  const { token, user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (amount && token) {
      const getContract = async () => {
        setContract(
          await getTemporalDocument(token, {
            amount,
            document: 'privacy_policy_keo',
          })
        );
      };
      getContract();
    }
  }, [token, amount]);

  const cancelLoan = async () => {
    await patchLoan(user.id, { status: 'REJECTED' }, token);
    setUser(undefined);
    setLoan(undefined);
  };

  const handleSubmit = () => {
    if (confirmed) {
      const isError = validator(FORM_SKEMA, contactForm);
      if (isError) {
        setSkema(
          FORM_SKEMA.map((element) => {
            if (element === isError) {
              return { ...element, warning: true };
            }
            return element;
          })
        );
        setError(isError.error);
      } else {
        addGoogleAnalyticsEvent({
          category: CATEGORIES.CASH_ADVANCE,
          action: ACTIONS.CLICK,
          label: 'personal data',
        });
        setStep((step) => step + 1);
        setContactInformation((prev) => ({
          ...prev,
          ...contactForm,
        }));
      }
    } else {
      setError`No confirmaste las politicas de KEO`;
    }
  };

  return (
    <ContactFormStyled>
      <div className="title h3">
        Primero ingresa tus datos de <br />
        contacto y tu ocupación:
      </div>
      <FormComponent
        className="contact-form"
        form={contactForm}
        formData={skema}
        setForm={setContactForm}
      />
      <CheckBox
        className="privacity-check"
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
          Declaro que doy mi consentimiento previo, expreso e informado para que
          mis datos personales sean tratados de acuerdo con la{' '}
          <a href={contract} className="link" target="_blanck">
            Política de Privacidad de KEO.
          </a>
        </div>
      </CheckBox>
      <AlertComponent
        className="alert"
        open={!!error}
        setOpen={() => setError(undefined)}
        content={error}
        severity="error"
      />
      <div className="buttons">
        <StyledButton onClick={cancelLoan} greyDark>
          Regresar
        </StyledButton>
        <StyledButton solid onClick={handleSubmit}>
          Continuar
        </StyledButton>
      </div>
    </ContactFormStyled>
  );
}
