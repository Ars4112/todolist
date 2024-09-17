import * as React from 'react';

import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from './state/store';
import {  ErrorStateType, setAppError} from './state/app-reducer';

export  function ErrorSnackbar() {
  
const error = useSelector<AppRootStateType, ErrorStateType>((state)=> state.app.error)
const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

   dispatch(setAppError({error: null}))
  };

  return (
    <>
      <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}