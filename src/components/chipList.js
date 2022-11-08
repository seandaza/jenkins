import React, { forwardRef, useRef, useState } from 'react';
import styled from 'styled-components';
import { ICONS } from '../assets/images/images';
import { useOutsideClick } from '../utilities/click-outsider-listener';
import Chip from './chip';

const ChipComponent = forwardRef((props, ref) => {
  const { item, idx, toggle } = props.settings;
  const onPress = props.onPress;
  return (
    <div>
      <Chip isactive={toggle === idx} onClick={() => onPress(idx)}>
        {item.title}
      </Chip>

      {toggle === idx ? (
        <MessageBckg>
          <MsgArrow />
          <Message ref={ref}>
            <CloseICon onClick={() => onPress(null)}>
              <img src={ICONS.closeIcon} alt="close" />
            </CloseICon>
            <div>
              <h3 id="item-title">{item.title}</h3>
              {item.content}
            </div>
          </Message>
        </MessageBckg>
      ) : (
        <></>
      )}
    </div>
  );
});

export default function Chips(props) {
  const [toggle, setToggle] = useState(null);
  const [start, setStart] = useState(false);
  const chipRef = useRef();

  useOutsideClick(chipRef, toggle || toggle === 0, () => {
    setToggle(null);
  });

  const onPress = (idx) => {
    if (!start) setStart(true);
    setToggle(idx === toggle ? null : idx);
  };
  return (
    <ChipsContainer>
      {props.data.map((item, idx) => {
        return (
          <ChipComponent
            key={`badge${idx}`}
            settings={{ item, idx, toggle, start }}
            onPress={onPress}
            ref={chipRef}
          />
        );
      })}
    </ChipsContainer>
  );
}

const Message = styled.div`
  position: absolute;
  background: white;
  box-shadow: 0 5px 15px 2px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  opacity: 0.96;
  font-weight: normal;
  font-size: 11px;
  letter-spacing: 0;
  line-height: 16px;
  max-width: 300px;
  min-width: 100px;
  padding: 1em 1em;
  text-align: left;
  color: #010101;
  z-index: 3;
  margin-top: 8px;
  #item-title {
    display: none;
  }
  a {
    color: black;
  }
  @media (max-width: 720px) {
    margin: auto;
    position: relative;
    margin-top: 15em;
    padding: 2em;
    #item-title {
      display: block;
      margin-top: -15px;
      max-width: 240px;
    }
  } ;
`;
const MessageBckg = styled.div`
  @media (max-width: 720px) {
    z-index: 2;
    background-color: rgb(0, 0, 0, 0.5);
    position: fixed;
    width: 100vw;
    height: 100vh;
    right: 0;
    top: 0;
  } ;
`;

const CloseICon = styled.span`
  margin-left: 90%;
  img {
    margin-bottom: 0.3em;
    width: 2em;
    margin-top: -0.5em;
  }
  @media (max-width: 720px) {
    margin-left: 95%;
  } ;
`;

const MsgArrow = styled.div`
  position: absolute;
  width: 1px;
  border: solid 10px transparent;
  border-bottom-color: rgb(255, 255, 255, 1);
  margin: -11px 0px 0 79px;
  z-index: 4;
  margin-right: auto;
  @media (max-width: 720px) {
    display: none;
  } ;
`;

const ChipsContainer = styled.div`
  padding: 0.5em 10em;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  @media (max-width: 720px) {
    padding: 0.5em 0.5em;
  } ;
`;
