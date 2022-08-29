import { ButtonStyled, ContactItem } from './PhoneBook.styled';

import { useGetContactsQuery, useDeleteContactMutation } from './store';

export const ContactList = ({ filteredArr }) => {
  const { data } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();

  return (
    <ul>
      {data && (
        <>
          {filteredArr.map(item => (
            <li key={item.id}>
              <ContactItem>
                {item.name}: {item.number}
              </ContactItem>
              <ButtonStyled onClick={() => deleteContact(item.id)}>
                Delete
              </ButtonStyled>
            </li>
          ))}
        </>
      )}
    </ul>
  );
};
