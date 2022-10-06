import React from 'react';
import { StyledList } from '../Passwords/PasswordManager.styled';

import { useGetPasswordsQuery, useDeletePasswordMutation } from '../store';
import { PasswordItem } from './PasswordItem';

export const PasswordList = ({ filteredArr }) => {
  const { data } = useGetPasswordsQuery();
  const [deletePassword] = useDeletePasswordMutation();

  return (
    <StyledList>
      {data && (
        <>
          {filteredArr.map(item => (
            <PasswordItem key={item.id} item={item} onDelete={deletePassword} />
          ))}
        </>
      )}
    </StyledList>
  );
};
