import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ICONS } from '../assets/images/images';
import {
  ACTIONS,
  addGoogleAnalyticsEvent,
  CATEGORIES,
} from '../services/google-analytics-event';
import StyledButton from './button';

const CardComponent = (props) => {
  const history = useHistory();

  const { item, idx } = props;
  const [toggle, setToggle] = useState(false);
  const onPress = () => setToggle(!toggle);

  return (
    <Card key={idx}>
      <h3>{item.title}</h3>
      {toggle && (
        <div className="text">
          <p>{item.content}</p>
          {item.link && (
            <div className="button">
              <StyledButton
                onClick={() => {
                  addGoogleAnalyticsEvent({
                    category: CATEGORIES.FAQ,
                    action: ACTIONS.CLICK,
                    label: 'writing us​',
                  });
                  history.push(item.link.url);
                }}
                greyDark
              >
                {item.link.label}
              </StyledButton>
            </div>
          )}
        </div>
      )}
      <OpenDetail onClick={onPress}>
        <p>{toggle ? 'Leer menos' : 'Leer mas'}</p>
        <Span
          icon={toggle ? ICONS.arrowUp : ICONS.arrowDown}
          onClick={onPress}
        />
      </OpenDetail>
    </Card>
  );
};

export default function CardList(props) {
  return (
    <CardContainer>
      {props.data.map((item, idx) => {
        return (
          <div key={idx}>
            <CardComponent key={idx} idx={idx} item={item} />
          </div>
        );
      })}
    </CardContainer>
  );
}

const OpenDetail = styled.div`
  display: grid;
  grid-template-columns: 95% 10%;
  border-top: 2px solid #f0f0f0;

  p {
    font-size: 0.8em;
    color: #3d3f2c;
    letter-spacing: 0;
    line-height: 14.64px;
  }
  @media (max-width: 720px) {
    grid-template-columns: 90% 10%;
  }
`;

const Span = styled.span`
  background: url(${(props) => props.icon});
  grid-column: 2;
  grid-row: 1;
  float: right;
  height: 8px;
  margin: 18px 10px 10px 10px;
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
`;

const CardContainer = styled.div`
  margin: auto;
  text-align: left;
  max-width: 820px;
  margin-bottom: 60px;
  padding-bottom: 1em;
  @media (max-width: 720px) {
    margin: 0.2em;
    margin-bottom: 60px;
  } ;
`;

const Card = styled.div`
  text-align: left;
  padding: 0.4em 1.4em;
  margin: 2em;

  background: #ffffff;
  box-shadow: 0 16px 30px 0 rgba(18, 62, 119, 0.23);
  border-radius: 7.23px;
  border: 0 solid #f0f0f0;

  .text {
    padding: 2em;
    .button {
      padding-top: 4.5em;
      position: relative;
      button {
        padding: 0.5em 1em;
        position: absolute;
        right: 0;
        bottom: 0;
        margin: 1em auto;
        background-color: #2c2e3f;
      }
    }
  }

  h3 {
    grid-column: 1;
    grid-row: 1;

    font-size: 0.8em;
    color: #1e1e1e;
    letter-spacing: 0;
    line-height: 13.12px;

    @media (max-width: 720px) {
      //font-size: 13px;
      letter-spacing: 0.46px;
      line-height: 1.6em;
    }
  }
  .text {
    font-weight: normal;
    font-size: 0.8em;
    color: #303643;
    letter-spacing: 0;
    line-height: 24px;
    a {
      color: black;
      font-size: 1em;
      line-height: 24px;
    }
    @media (max-width: 720px) {
      padding: 0;
      font-size: 0.7em;
      letter-spacing: 0.2px;
      line-height: 18px;
      a {
        line-height: 18px;
      }
    }
  }
  a {
    font-size: 14px;
    color: #303643;
    @media (max-width: 720px) {
      font-size: 12px;
    }
  }
  @media (max-width: 720px) {
    margin: 1em 0.8em;
  } ;
`;
