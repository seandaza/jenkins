import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AlertComponent from '../components/alert';
import BigCard from '../components/bigCard';
import StyledButton from '../components/button';
import FormComponent, { INPUT_TYPE } from '../components/formComponent';
import HeaderMobile from '../components/headerMobile';
import SuccessfulContact from '../components/successful-contact';
import { BREAKPOINTS } from '../models/breakpoints';
import { UserContext } from '../providers/user-provider';
import { contactForm } from '../services/contact-form';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../services/google-analytics-event';
import { useResizeListener } from '../utilities/resize-listener';
import ROUTES from '../utilities/routes';
import { validator } from '../utilities/validators';

const FORM_SKEMA = [
  {
    name: 'name',
    label: 'Nombre completo',
    placeholder: 'Escribe tu nombre',
    type: 'alpha',
    error: 'Ingrese tu nombre',
    isRequired: true,
  },
  {
    name: 'email',
    label: 'Correo electrónico*',
    placeholder: 'Ej: nombre@mail.com',
    type: 'email',
    validator: 'email',
    error: 'Ingrese un correo electrónico',
    isRequired: true,
  },
  {
    name: 'phone',
    label: 'Número de celular',
    placeholder: 'Escribe tu número de contácto',
    type: 'phone',
    validator: 'phone',
    error: 'Ingrese su número de contácto',
    isRequired: true,
  },
  {
    name: 'subject',
    label: 'Asunto',
    placeholder: 'Selecciona un asunto',
    type: 'any',
    component: INPUT_TYPE.SELECT,
    options: [
      '¿Como solicitar préstamos?',
      'Cómo pago mis préstamos',
      'Cuál es la tasa del préstamo',
      'Cuál es el plazo para pagar mis préstamos',
      'Petición: Más plazo o más preaprobado',
      'Otro',
    ],
    error: 'Ingrese un asunto',
    isRequired: true,
  },
  {
    name: 'anotherSubject',
    label: '',
    placeholder: 'Escribe aquí el asunto',
    condition: (form) => form.subject === 'Otro',
    error: 'Ingrese un asunto',
  },
  {
    name: 'message',
    label: '',
    placeholder: 'Tu mensaje',
    type: 'any',
    component: INPUT_TYPE.TEXT_AREA,
    rows: 5,
    error: 'Ingrese su mensaje',
    isRequired: true,
  },
];

export default function Contact() {
  const { user, token } = useContext(UserContext);
  const history = useHistory();

  const [form, setForm] = useState({ subject: '' });
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [successCard, setSuccessCard] = useState(false);
  const [error, setError] = useState();
  const [skema, setSkema] = useState(FORM_SKEMA);
  const [loading, setLoading] = useState(false);

  useResizeListener((width) => setScreenWidth(width));

  useEffect(() => {
    addGoogleAnalyticsEvent({
      category: CATEGORIES.WRITING_US,
      action: ACTIONS.VISIT,
    });
  }, []);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.fullName,
        email: user.email,
        phone: user.phoneNumber,
        subject: '',
      });
    }
  }, [user]);

  const submit = async () => {
    try {
      if (!loading) {
        setLoading(true);
        addGoogleAnalyticsEvent({
          category: CATEGORIES.WRITING_US,
          action: ACTIONS.CLICK,
          label: 'send message​',
        });
        let body = form;
        if (form.subject === 'Otro') {
          body.subject = form.anotherSubject;
          body.anotherSubject = undefined;
        }
        const validate = validator(FORM_SKEMA, body);
        if (!validate) {
          addGoogleAnalyticsEvent({
            category: CATEGORIES.WRITING_US,
            action: ACTIONS.REQUEST,
            label: 'send message request​',
          });
          await contactForm(user.id, token, body);
          addGoogleAnalyticsEvent({
            category: CATEGORIES.WRITING_US,
            action: ACTIONS.RESPONSE,
            label: 'send message successful​',
          });
          setSuccessCard(true);
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
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const Content = (
    <>
      <div className="header">
        <div className="title">
          {user && <span className="bold">Contáctanos</span>}
          {!user && (
            <>
              Inicio{' '}
              <span className="bold">
                {'>'} <span className="underlined">Contáctanos</span>
              </span>
            </>
          )}
        </div>
        <div className="description">
          Escribenos a través del formulario, te responderemos lo antes posible.
        </div>
      </div>
      <div className="content">
        <FormComponent form={form} setForm={setForm} formData={skema} />
        <StyledButton
          className="button"
          solid
          onClick={submit}
          disabled={loading}
        >
          <div>Enviar</div>
          {window.innerWidth < BREAKPOINTS.medium && (
            <i className="material-icons">east</i>
          )}
        </StyledButton>
      </div>
    </>
  );

  if (successCard) {
    return <SuccessfulContact />;
  }

  return (
    <Container>
      {screenWidth > BREAKPOINTS.medium && <BigCard>{Content}</BigCard>}
      {screenWidth <= BREAKPOINTS.medium && (
        <>
          <HeaderMobile
            title="Contáctanos"
            backButtonAction={() => history.push(ROUTES.ROOT)}
            help
          />
          <div className="mobile-container">{Content}</div>
        </>
      )}
      <AlertComponent
        className="alert"
        open={!!error}
        setOpen={() => setError(undefined)}
        content={error}
        severity="error"
      />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1.5em;
  .bold {
    font-weight: ${({ theme }) => theme.textTheme.bold};
  }
  .underlined {
    text-decoration: underline;
  }
  .header {
    margin: 1.5em -3em 0;
    text-align: left;
    .title {
      font-size: ${({ theme }) => theme.textTheme.fontSize.h2};
      color: #00326e;
    }
    .description {
      margin-top: 1em;
      font-size: ${({ theme }) => theme.textTheme.fontSize.small};
    }
    @media (max-width: 875px) {
      text-align: center;
    }
  }

  .content {
    padding: 1em 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .button {
      margin: 0 10%;
    }
  }

  .alert {
    right: 2%;
    bottom: 5%;
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    margin: 0;
    width: 100%;
    .header {
      display: none;
    }
    .mobile-container {
      width: 100%;
      .content {
        padding: 1em 2em;
        .button {
          width: 100%;
          margin: 3em 0 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .alert {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
`;
