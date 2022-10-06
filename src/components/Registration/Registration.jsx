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
} from '../Passwords/PasswordManager.styled';
import { useDispatch } from 'react-redux';

import operations from '../../Redux/authOperations';

let schema = yup.object().shape({
  name: yup.string().min(2, 'must be at least 2 characters long').required(),
  email: yup.string().email().required(),
  password: yup.mixed().required(),
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
