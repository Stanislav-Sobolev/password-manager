import React from 'react';
import { useState } from 'react';
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

let schema = yup.object().shape({
  name: yup
    .string()
    .min(2, 'must be at least 2 characters long')
    .matches(/^\D+$/, 'The field should not have digits')
    .required(),

  email: yup.string().email().required(),
  password: yup
    .string()
    .min(7, 'must be at least 7 characters long')
    .required(),
});

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async values => {
    setName(values.name);
    setEmail(values.email);
    setPassword(values.password);
    dispatch(operations.register(values));
  };

  return (
    <>
      <Toaster />
      <FormContainer>
        <FormTitle>Registration</FormTitle>
        <Formik
          initialValues={{
            name,
            email,
            password,
          }}
          onSubmit={handleSubmit}
          validationSchema={schema}
        >
          <FormRegistration>
            <LabelStyled>
              Name
              <Field id="name" name="name" placeholder="Jane" />
              <ErrorMessage name="name" component={Error} />
            </LabelStyled>
            <LabelStyled>
              Password
              <Field id="password" name="password" placeholder="qwerty" />
              <ErrorMessage name="password" component={Error} />
            </LabelStyled>

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
            <button type="submit">Submit</button>
          </FormRegistration>
        </Formik>
      </FormContainer>
    </>
  );
};

export default Registration;
