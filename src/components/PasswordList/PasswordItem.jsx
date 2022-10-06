import React from 'react';
import { useState } from 'react';
import {
  PasswordItemWrapper,
  StyledHidePass,
  StyledShowPass,
  PasswordIconsWrapper,
} from '../Dashboard/PasswordManager.styled';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import IconButton from '@material-ui/core/IconButton';

import Visibility from '@material-ui/icons/Visibility';

import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const PasswordItem = ({ item, onDelete }) => {
  const [hidePass, setHidePass] = useState(true);

  const hidePassHandler = () => {
    setHidePass(!hidePass);
  };

  return (
    <PasswordIconsWrapper>
      <PasswordItemWrapper>
        {item.name}:&nbsp;
        {hidePass ? (
          <StyledHidePass>{item.number}</StyledHidePass>
        ) : (
          <StyledShowPass>{item.number}</StyledShowPass>
        )}
      </PasswordItemWrapper>
      <div>
        <IconButton onClick={hidePassHandler} size="small">
          {hidePass ? (
            <VisibilityOff style={{ fontSize: '18px' }} />
          ) : (
            <Visibility style={{ fontSize: '18px' }} />
          )}
        </IconButton>
        <IconButton onClick={() => onDelete(item.id)} size="small">
          <DeleteOutlinedIcon fontSize="small" />
        </IconButton>
      </div>
    </PasswordIconsWrapper>
  );
};
