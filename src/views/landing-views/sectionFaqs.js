import React from 'react';
import Chips from '../../components/chipList';
import { faqinfo } from '../../assets/data';
import styled from 'styled-components';

const faqhome = faqinfo.filter((item) => item.home);

const landingFaqs = () => {
  return (
    <FaqsContainer>
      <h2>
        También puedes consultar <br />
        nuestras <span>preguntas frecuentes:</span>
      </h2>
      <Chips data={faqhome} />
    </FaqsContainer>
  );
};

const FaqsContainer = styled.div`
  margin: 5em 0 4em;
  h2 {
    color: #303744;
    span {
      color: ${(props) => props.theme.colors.teal};
    }
  }
  @media (max-width: 786px) {
    h2 {
      padding: 1em;
      font-size: 1.5em;
    }
  }
`;

export default landingFaqs;
