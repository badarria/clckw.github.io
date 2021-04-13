import { Button } from '@material-ui/core';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleBtnProps } from '../../types';
import { useStyles } from './styles';
import { google_client_id } from '../../../../../config';

const GoogleBtn = ({ cb, label }: GoogleBtnProps) => {
  const { btnGoogle } = useStyles();

  return (
    <GoogleLogin
      clientId={google_client_id}
      buttonText='Login'
      onSuccess={cb}
      onFailure={cb}
      cookiePolicy={'single_host_origin'}
      render={(renderProps) => (
        <Button
          variant='contained'
          color='primary'
          className={btnGoogle}
          onClick={renderProps.onClick}
        >
          {label}
        </Button>
      )}
    />
  );
};

export default GoogleBtn;
