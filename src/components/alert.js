import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { Collapse, IconButton } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { BREAKPOINTS } from '../models/breakpoints';

export default function AlertComponent({
  className,
  content,
  open,
  setOpen,
  severity,
}) {
  return (
    <AlertStyled className={className}>
      <Collapse className="material-collapse" in={open}>
        <Alert
          className="material-alert"
          severity={severity}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {content}
        </Alert>
      </Collapse>
    </AlertStyled>
  );
}

const AlertStyled = styled.div`
  position: absolute;
  background-color: transparent;
  bottom: 0;
  right: 0;

  .material-alert {
    width: 25vw;
    @media (max-width: ${BREAKPOINTS.medium}px) {
      width: 100vw;
    }
  }
`;
