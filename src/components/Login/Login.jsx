import React from 'react';
import { Formik, Field } from 'formik';
import {
  LabelStyled,
  FormContainer,
  FormTitle,
  FormRegistration,
} from '../Contacts/PhoneBook.styled';
import { useDispatch } from 'react-redux';
// import { Helmet } from 'react-helmet';
import operations from '../../Redux/authOperations';

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = async values => {
    dispatch(operations.logIn(values));
  };

  return (
    <>
      {/* <Helmet>
        <title>Login</title>
      </Helmet> */}
      <FormContainer>
        <FormTitle>Login</FormTitle>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={handleLogin}
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
            </LabelStyled>
            <LabelStyled>
              Password
              <Field id="password" name="password" placeholder="qwerty" />
            </LabelStyled>

            <button type="submit">Submit</button>
          </FormRegistration>
        </Formik>
      </FormContainer>
    </>
  );
};

export default Login;
