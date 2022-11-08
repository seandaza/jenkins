import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import IMAGES from '../assets/images/images';
import { BREAKPOINTS } from '../models/breakpoints';
import { useOutsideClick } from '../utilities/click-outsider-listener';
import ROUTES from '../utilities/routes';
import { HeaderButton } from './button';
import HelpModal from './help-modal';

const HeaderContainer = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  height: 56px;
  padding-left: 20px;
  position: relative;
  width: 100%;

  .branch {
    display: flex;
    p {
      color: white;
      line-height: 0.9em;
      font-size: 0.8em;
      font-weight: 500;
      margin: 0 7px;
      text-align: right;
    }
    img {
      &.keo-logo {
        height: 27px;
      }

      &.billpocket-logo {
        height: 23px;
      }
    }
  }

  span {
    color: ${(props) => props.theme.colors.primary};
    margin-right: 25px;
    font-size: 20px;
  }

  button {
    width: auto;
  }

  h2 {
    margin: 0;
    line-height: 40px;
  }

  a {
    color: white;
    font-size: 0.9em;
    margin-right: 8px;
    text-decoration: none;
    .label {
      padding: 0.1em 0;
    }
    .line {
      position: absolute;
      width: 65px;
      border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
      margin-left: 0.1em;
      margin-top: 1.2em;
    }

    &:first-of-type {
      margin-left: 35px;
    }
  }

  a + a {
    margin-left: 1em;
  }

  @media (max-width: ${BREAKPOINTS.medium}px) {
    display: none;
  }
`;

const LightBlueContainer = styled.div`
  align-items: center;
  display: flex;
  background-color: ${(props) => props.theme.colors.backgroundLightAlt};
  height: 100%;
  margin-left: auto;
  padding: 0 10px;

  a {
    color: white;
    font-size: 0.9em;
    font-weight: 500;
    margin-right: 8px;
    text-decoration: underline;
  }
`;

const Header = () => {
  const modalRef = useRef();
  const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentPath, setCurrentPath] = useState();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.split('/').filter((p) => !!p);
    if (path[0]) {
      setCurrentPath(`/${path[0]}`);
    }
  }, [location]);

  useOutsideClick(modalRef, isOpenModal, () =>
    setIsOpenModal((isOpen) => !isOpen)
  );

  return (
    <>
      <HeaderContainer>
        <div className="branch" onClick={() => history.push(ROUTES.ROOT)}>
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
        <Link to={ROUTES.REQUEST_LOAN}>
          Solicitar préstamo
          {currentPath === ROUTES.REQUEST_LOAN && <div className="line" />}
        </Link>
        <Link to={ROUTES.LOANS}>
          Mis préstamos
          {currentPath === ROUTES.LOANS && <div className="line" />}
        </Link>
        <Link to={ROUTES.HOW_WORKS}>
          ¿Cómo funciona?
          {currentPath === ROUTES.HOW_WORKS && <div className="line" />}
        </Link>
        <Link to={ROUTES.FAQ}>
          Preguntas frecuentes
          {currentPath === ROUTES.FAQ && <div className="line" />}
        </Link>
        <Link to={ROUTES.CONTACT}>
          Contáctanos
          {currentPath === ROUTES.CONTACT && <div className="line" />}
        </Link>
        <LightBlueContainer>
          <Link to={ROUTES.HOW_WORKS}>Regresar a Billpocket</Link>
          <HeaderButton solid round onClick={() => setIsOpenModal(true)}>
            ¿ayuda?
          </HeaderButton>
        </LightBlueContainer>
      </HeaderContainer>
      <HelpModal
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
        ref={modalRef}
      />
    </>
  );
};

export default Header;
