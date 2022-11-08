import styled from 'styled-components';
import { CircularProgress } from '@material-ui/core';

export default function CircularProgessBar({ children, value, ...rest }) {
  return (
    <ProgressBar {...rest}>
      <CircularProgress
        className="progress-bar"
        size="13em"
        value={Math.round(value)}
        variant="determinate"
      />
      <div className="content">{children}</div>
    </ProgressBar>
  );
}

const ProgressBar = styled.div`
  text-align: center;
  margin: auto;
  border-radius: 50%;
  width: 15em;
  height: 15em;
  box-shadow: inset 1px 4px 1px 0 #f0f0f0,
    inset 0 -7px 4px 0 rgba(119, 139, 160, 0.05),
    inset -1px 1px 4px 0 rgba(170, 187, 222, 0.26);

  .progress-bar {
    position: absolute;
    stroke-linecap: round;
    color: ${({ theme }) => theme.colors.red};

    margin: 1em -6.5em;
  }
  .content {
    position: relative;
    padding: 35% 30%;
  }
`;
