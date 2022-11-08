import React from 'react';
import styled from 'styled-components';
import BottomBorder from './cardFooter';

export default function bigCard({
  children,
  width = '660px',
  footer,
  ...rest
}) {
  return (
    <Card width={width} {...rest}>
      <TopBorder />
      <Container footer={footer}>
        <Content>{children}</Content>
      </Container>
      {footer && <BottomBorder width={width} />}
    </Card>
  );
}

const Card = styled.div`
  box-shadow: 45px 45px 90px 0 rgba(0, 0, 0, 0.15);
  border-radius: 9px 9px 9px 9px;
  width: ${({ width }) => width};
  margin: auto;
`;

const TopBorder = styled.div`
  width: 100%;
  height: 9px;
  margin: auto;
  margin-bottom: -9px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 9px 9px 0px 0px;
  z-index: 1;
  position: relative;

  @media (max-width: 720px) {
    width: 90%;
  } ;
`;

const Container = styled.div`
  background: ${(props) => props.theme.colors.backgroundLight};
  ${({ footer }) => !footer && 'border-radius: 9px 9px;'}
  width: 100%;
  margin: auto;
  padding: 1em;
  @media (max-width: 720px) {
    width: 90%;
  } ;
`;

const Content = styled.div`
  width: 55%;
  margin: auto;
  display: grid;
  grid-template-columns: 100%;
  position: relative;
  @media (max-width: 720px) {
    width: 86%;
  } ;
`;
