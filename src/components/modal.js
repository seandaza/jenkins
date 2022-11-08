import React, { forwardRef } from 'react';
import styled from 'styled-components';
import IMAGES from '../assets/images/images';
import { PureButton } from '../components/button';

function Modal({ modalOpen, SetModalOpen, children, ...rest }, ref) {
  return (
    <React.Fragment>
      {modalOpen && (
        <Background>
          <Content {...rest} ref={ref}>
            <button className="close-btn" onClick={() => SetModalOpen(false)}>
              <img src={IMAGES.ICON_CLOSE} alt="close-icon" />
            </button>

            <PureButton
              className="close-btn-resp"
              onClick={() => SetModalOpen(false)}
            >
              <img src={IMAGES.ICON_ARROW_MODAL} alt="close-icon-resp" />
            </PureButton>

            {children ?? <React.Fragment />}
          </Content>
        </Background>
      )}
    </React.Fragment>
  );
}

export default forwardRef(Modal);

const Background = styled.div`
  background-color: rgb(0, 0, 0, 0.8);
  position: fixed;
  z-index: 4;
  width: 100vw;
  height: 100vh;
  right: 0;
  top: 0;
`;

const Content = styled.div`
  position: absolute;
  background: #ffffff;
  right: 0;
  border-radius: 8px 0 0 8px;
  min-width: 354px;
  height: 98vh;
  padding: 2em 1.5em;
  text-align: left;
  color: #010101;
  z-index: 5;
  margin-top: 8px;

  .close-btn {
    background-color: rgb(0, 0, 0, 0);
    border: none;
    position: inherit;
    right: 1em;
  }

  .close-btn-resp {
    display: none;
  }

  @media (max-width: 768px) {
    width: 96%;
    margin-right: 10px;
    min-width: auto;
    height: 90vh;
    border-radius: 20px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    bottom: 0;

    .close-btn {
      display: none;
    }
    .close-btn-resp {
      display: block;
      margin: auto;
    }
  }
`;
