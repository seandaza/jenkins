import React from 'react';
import { ICONS } from '../assets/images/images';
import styled from 'styled-components';
import { BREAKPOINTS } from '../models/breakpoints';

const Card = styled.div`
  width: 179px;
  h3 {
    color: rgb(15, 62, 119);
    height: 50px;
  }
  .round-icon {
    width: 78px;
    height: 78px;
    margin: 0 auto 2em;
    border-radius: 50%;
    box-shadow: -5px 12px 25px -13px #c9acad;
  }
  .icon-img {
    margin-top: 22px;
    height: 36px;
  }
  .content {
    max-width: 170px;
  }

  & + & {
    margin-left: 1em;
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    width: auto;
    max-width: 215px;
    min-height: 280px;
    padding: 0.3em 1em;
    margin: auto;
    box-shadow: 0px 20px 30px rgba(201, 172, 173, 0.52);
    border-radius: ${(props) => props.theme.universalBorderRadius};
    h3 {
      height: auto;
    }
    .round-icon {
      box-shadow: none;
    }
    .icon-img {
      height: 50px;
    }
    .content {
      max-width: none;
    }
  } ;
`;

export default function iconCard(props) {
  return (
    <Card>
      <div className="round-icon">
        <img
          className="icon-img"
          src={ICONS[props.icon]}
          alt={`imgicon_${props.icon}`}
        />
      </div>
      <h3>{props.title}</h3>
      <div className="content">{props.content}</div>
    </Card>
  );
}
