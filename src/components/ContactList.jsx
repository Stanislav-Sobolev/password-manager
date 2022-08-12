import { ButtonStyled, ContactItem } from './PhoneBook.styled';
import { useDispatch } from 'react-redux';

export const ContactList = ({ filteredArr, deleteContact }) => {
  const dispatch = useDispatch();
  return (
    <ul>
      {filteredArr.map(item => (
        <li key={item.id}>
          <ContactItem>
            {item.name}: {item.number}
          </ContactItem>
          <ButtonStyled onClick={() => dispatch(deleteContact(item.id))}>
            Delete
          </ButtonStyled>{' '}
        </li>
      ))}
    </ul>
  );
};
