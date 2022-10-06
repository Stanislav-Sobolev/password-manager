import React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {
  ButtonStyled,
  FormStyled,
  LabelStyled,
  FieldStyled,
  Error,
  PassFieldWrapper,
} from '../Passwords/PasswordManager.styled';

let schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'must be at least 2 characters long')
    .matches(
      /^[0-9aA-zZ.!@#$%^&*\s]+$/,
      'Name may contain only numbers, dot and letters. For example yoursite123.com'
    )
    .required(),
  pass: yup.mixed().required(),
});

export const PasswordForm = ({ onSubmit }) => {
  const [passwordShown, setPasswordShown] = useState({
    password: '',
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setPasswordShown({
      ...passwordShown,
      showPassword: !passwordShown.showPassword,
    });
  };

  return (
    <Formik
      initialValues={{ name: '', pass: '' }}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      <FormStyled>
        <LabelStyled>Website</LabelStyled>
        <FieldStyled type="text" name="name" />
        <ErrorMessage name="name" component={Error} />
        <LabelStyled>Password</LabelStyled>
        <PassFieldWrapper>
          <FieldStyled
            type={passwordShown.showPassword ? 'text' : 'password'}
            name="pass"
            autoComplete="off"
          />
          <IconButton onClick={handleClickShowPassword} size="small">
            {passwordShown.showPassword ? (
              <Visibility style={{ fontSize: '18px' }} />
            ) : (
              <VisibilityOff style={{ fontSize: '18px' }} />
            )}
          </IconButton>
        </PassFieldWrapper>
        <ErrorMessage name="pass" component={Error} />

        <ButtonStyled type="submit">Add Password</ButtonStyled>
      </FormStyled>
    </Formik>
  );
};
