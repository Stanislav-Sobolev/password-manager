import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllPasswords } from '../../Redux/contactsSelectors';
import { StyledList } from '../Dashboard/PasswordManager.styled';
import { PasswordItem } from './PasswordItem';

export const PasswordList = ({ filteredArr }) => {
  const data = useSelector(selectAllPasswords);

  return (
    <StyledList>
      {data && (
        <>
          {filteredArr.map(item => (
            <PasswordItem key={item.id} item={item} />
          ))}
        </>
      )}
    </StyledList>
  );
};
