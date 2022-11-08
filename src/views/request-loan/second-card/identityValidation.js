import { useContext } from 'react';
import styled from 'styled-components';
import IMAGES, { ICONS } from '../../../assets/images/images';
import MatiButton from '../../../components/mati-button';
import { BREAKPOINTS } from '../../../models/breakpoints';
import { UserContext } from '../../../providers/user-provider';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../../../services/google-analytics-event';

export default function IdentityValidation({ setStep, isKYCRequired }) {
  const { user } = useContext(UserContext);

  return (
    <Container isKYCRequired={isKYCRequired}>
      <div className="title h2 bold">
        Antes de otorgarte un nuevo préstamo, tendremos que hacer una{' '}
        <span className="text-blue">validación rápida de tu identidad.</span>
      </div>
      <div className="text normal bold">Al continuar, te pediremos:</div>
      <div className="row">
        <div className="item">
          <img src={ICONS.identityDocument} alt="id-icon" />
          <div className="p">Una foto de tu INE</div>
        </div>
        <img src={IMAGES.DIVIDER_VERTICAL} alt="divider-vertical" />
        <div className="item">
          <img className="doc" src={ICONS.document} alt="document-icon" />
          <div className="p">Una foto de un comprobante domiciliario</div>
        </div>
      </div>
      {!isKYCRequired && (
        <div className="card small bold">
          Ten a la mano tus documentos para continuar, si no los tienes, puedes
          continuar después
        </div>
      )}
      <MatiButton
        className="mati-button"
        userId={user.id}
        onLoadedCallback={() =>
          addGoogleAnalyticsEvent({
            category: CATEGORIES.CASH_ADVANCE,
            action: ACTIONS.CLICK,
            label: 'identity validation​',
          })
        }
        onFinishedCallback={() => setStep((step) => step + 1)}
      />
    </Container>
  );
}

const Container = styled.div`
  margin-top: 1em;
  text-align: center;

  .title {
    margin: 0 -3em;
  }

  .text {
    margin-top: 2em;
  }

  .row {
    margin-top: 3em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    justify-items: baseline;

    .item {
      width: 50%;
      padding: 0 1em 0 1em;
      .doc {
        margin-top: -0.7em;
      }
    }
  }

  .card {
    background-color: #d8d8d8;
    width: 95%;
    padding: 1em;
    margin: 2em auto 0;
  }

  mati-button {
    margin-top: ${({ isKYCRequired }) => (isKYCRequired ? '4rem' : '2em')};
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    height: 100%;
    margin-top: 0;
    display: flex;
    flex-direction: column;

    .title {
      margin: 0;
      padding-top: 3em;
      font-size: ${({ theme }) => theme.textTheme.fontSize.h3};
    }
    .card {
      margin-top: 5em;
    }
    mati-button {
      margin-top: 4rem;
    }
  }
`;
