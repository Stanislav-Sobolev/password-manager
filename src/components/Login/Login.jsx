import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  LabelStyled,
  FormContainer,
  FormTitle,
  FormRegistration,
  Error,
} from '../Dashboard/PasswordManager.styled';

import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import operations from '../../Redux/authOperations';

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async values => {
    dispatch(operations.logIn(values));
  };

  let schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .min(7, 'must be at least 7 characters long')
      .required(),
  });

  return (
    <>
      <Toaster />

      <FormContainer>
        <FormTitle>Login</FormTitle>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleLogin}
          validationSchema={schema}
        >
          <FormRegistration>
            <LabelStyled>
              Email
              <Field
                id="email"
                name="email"
                placeholder="jane@gmail.com"
                type="email"
              />
              <ErrorMessage name="email" component={Error} />
            </LabelStyled>
            <LabelStyled>
              Password
              <Field id="password" name="password" placeholder="qwerty" />
              <ErrorMessage name="password" component={Error} />
            </LabelStyled>

            <button type="submit">Sign in</button>
          </FormRegistration>
        </Formik>
      </FormContainer>
    </>
  );
};

export default Login;
