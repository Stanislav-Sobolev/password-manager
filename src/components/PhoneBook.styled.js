import styled from 'styled-components'
import { Field, Form } from 'formik';


export const HeadTitle = styled.p`
  font-size: 25px;
  font-weight: 700;
  margin: 15px 0;
  
`;

export const FormStyled = styled(Form)`
background-color: azure;
border: 1px solid lightgray;
  width: 300px;
  padding: 10px;
  
`;

export const LabelStyled = styled.label`
display: block;
margin-bottom: 15px;
font-weight: 500;
width: 50px;
`;


export const FieldStyled = styled(Field)`
border:1px solid lightgray;
width: 250px;
`;


export const ButtonStyled = styled.button`
font-size: 12px;
background-color: white;
border: 1px solid lightgray;
padding: 3px 6px;
/* box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
    0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); */

`;


export const ContactItem = styled.span`
display: inline-flex;
margin-top: 10px;
margin-right: 10px;
font-weight: 500;
`


export const Error = styled.div`
font-size: 14px;
width: 250px;
color: red;
`

