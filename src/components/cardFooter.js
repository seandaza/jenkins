import styled from "styled-components";
import IMAGES from "../assets/images/images";
import { REQUEST_LOAN_STATUS } from "../models/requestLoanStatus";

export default function BottomBorder(props) {
  return (
    <BottomContainer {...props}>
      <img className="logo" src={IMAGES.KEO_ISOLOGO} alt="keo-logo" />
      <img className="divider" src={IMAGES.DIVIDER_VERTICAL} alt="divider" />
      <div className="text">
        <div>Nos importa</div>
        <div className="red">tu presente,</div>
        <div>No tu pasado</div>
      </div>
    </BottomContainer>
  );
}

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  height: auto;
  width: 100%;
  background-color: #f1f1f1;
  margin: auto;
  border-radius: 0 0 9px 9px;

  font-size: 0.8em;
  padding-top: 0.5em;

  .logo {
    margin-top: -0.4em;
    width: 5em;
    height: 50px;
  }

  .divider {
    margin: 0.6em 1em 0 1em;
    height: 3em;
  }

  .text {
    margin-top: 0.4em;
  }

  .red {
    margin-top: -0.6em;
    margin-bottom: -0.5em;
    color: ${({ theme }) => theme.colors.red};
  }
  @media (min-height: 1024px) {
    ${({ KYC }) => {
      if (KYC === REQUEST_LOAN_STATUS.FAIL) {
        return "margin-top: -100%;";
      } else {
        return "";
      }
    }}
  }
`;
