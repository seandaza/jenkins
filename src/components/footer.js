import React from 'react';
import IMAGES from '../assets/images/images';
import styled from 'styled-components';

const Header = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <div className="keo-bp">
          <img src={IMAGES.KEO_ISOLOGO} alt="KEO" className="keo-logo" />
          <p>
            Para
            <br />
            usuarios
          </p>
          <img
            src={IMAGES.BILLPOCKET_LOGO}
            alt="billpocket"
            className="billpocket-logo"
          />
        </div>
        <br />
        <div id="footer-text">
          Esto es posible gracias a la <br />
          <span>alianza entre KEO y Billpocket</span>
        </div>
        <div className="social-networks">
          <a
            href="https://www.facebook.com/KEOLATAM"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="keo-facebook"
              src={IMAGES.KEO_FACEBOOK}
              alt="keo-facebook"
            />
          </a>
          <a
            href="https://www.instagram.com/keolatam/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              className="keo-instagram"
              src={IMAGES.KEO_INSTAGRAM}
              alt="keo-instagram"
            />
          </a>
        </div>
      </FooterContainer>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.div`
  //position: ${(props) => (props.isContact ? 'absolute' : 'inherit')};
  width: 100%;
  background-color: ${(props) => props.theme.colors.backgroundGrey};
  //bottom: ${(props) => (props.isContact ? '0' : 'auto')};
  @media (max-width: 720px) {
    bottom: auto;
  } ;
`;

const FooterContainer = styled.div`
  max-width: 930px;
  margin: auto;
  font-weight: normal;
  font-size: 0.92em;
  line-height: 20px;
  padding: 5em 0.1em 2em 0.1em;
  text-align: center;

  #footer-text {
    color: #2a3441;
  }

  span {
    font-weight: bold;
  }

  .keo-bp {
    display: flex;
    justify-content: center;
    margin-left: 2em;
    img {
      margin: 0.9em 4px;
      height: 2em;
    }
  }
  #logokeo {
    width: 2em;
    margin: 2em;
  }
  #logofacebook {
    width: 33px;
    margin: 2em;
  }

  p {
    line-height: 1.1em;
    font-size: 1em;
    color: #000000;
    letter-spacing: 0.09px;
    margin-top: 0.7em;
    text-align: right;
    color: rgb(42, 52, 65);
    font-weight: bold;
  }

  a {
    text-decoration: none;
    font-weight: normal;
    font-size: 12px;
    letter-spacing: 0;
    line-height: 25px;
  }

  .social-networks {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 2em 0;
    a img {
      height: 3em;
      box-shadow: 0px 9px 11px 2px rgb(0 0 0 / 11%);
    }
    a + a {
      margin-left: 1em;
      img {
        box-shadow: 0px 5px 9px 2px rgb(0 0 0 / 11%);
      }
    }
  }

  @media (max-width: 720px) {
    padding: 3em 2em 2em 2em;
    grid-template-columns: 45% 55%;
    grid-template-rows: 70px 110px;
    font-size: 12px;
    line-height: 20px;

    .social-networks {
      display: flex;
      justify-content: center;
      margin: 2em 0;

      a img {
        height: 2.5em;
        box-shadow: 0px 9px 11px 2px rgb(0 0 0 / 11%);
      }
      a + a {
        margin-left: 1em;
        img {
          box-shadow: 0px 5px 9px 2px rgb(0 0 0 / 11%);
        }
      }
    }
  } ;
`;

export default Header;
