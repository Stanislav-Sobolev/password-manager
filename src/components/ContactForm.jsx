import * as yup from 'yup';
import { Formik, ErrorMessage } from 'formik';
import {
  ButtonStyled,
  FormStyled,
  LabelStyled,
  FieldStyled,
  Error,
} from './PhoneBook.styled';

let schema = yup.object().shape({
  name: yup
    .string()
    .min(2)
    .matches(
      /^[aA-zZ\s]+$/,
      "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
    )
    .required(),
  number: yup.number().min(7).required(),
});

export const ContactForm = ({ initialValues, onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={schema}
    >
      <FormStyled>
        <LabelStyled>
          Name
          <FieldStyled
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
          <ErrorMessage name="name" component={Error} />
        </LabelStyled>
        <LabelStyled>
          Number
          <FieldStyled type="tel" name="number" />
          <ErrorMessage name="number" component={Error} />
        </LabelStyled>
        <ButtonStyled type="submit">Add Contact</ButtonStyled>
      </FormStyled>
    </Formik>
  );
};
