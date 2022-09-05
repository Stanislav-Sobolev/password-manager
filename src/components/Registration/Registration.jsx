import { useState } from 'react';
import { Formik, Field } from 'formik';
import {
  LabelStyled,
  FormContainer,
  FormTitle,
  FormRegistration,
} from '../Contacts/PhoneBook.styled';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import operations from '../../Redux/authOperations';

export const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async values => {
    setName(values.name);
    setEmail(values.email);
    setPassword(values.password);
    dispatch(operations.register(values));
    console.log('values :>> ', values);
  };

  return (
    <>
      <Helmet>
        <title>Registration</title>
      </Helmet>

      <FormContainer>
        <FormTitle>Registration</FormTitle>
        <Formik
          initialValues={{
            name,
            email,
            password,
          }}
          onSubmit={handleSubmit}
        >
          <FormRegistration>
            <LabelStyled>
              Name
              <Field id="name" name="name" placeholder="Jane" />
            </LabelStyled>
            <LabelStyled>
              Password
              <Field id="password" name="password" placeholder="qwerty" />
            </LabelStyled>

            <LabelStyled>
              Email
              <Field
                id="email"
                name="email"
                placeholder="jane@gmail.com"
                type="email"
              />
            </LabelStyled>
            <button type="submit">Submit</button>
          </FormRegistration>
        </Formik>
      </FormContainer>
    </>
  );
};
