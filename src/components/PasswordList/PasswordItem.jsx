import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePassword } from '../../Redux/contactsOperations';
import { useState } from 'react';
import {
  PasswordItemWrapper,
  StyledHidePass,
  PasswordIconsWrapper,
} from '../Dashboard/PasswordManager.styled';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export const PasswordItem = ({ item }) => {
  const [hidePass, setHidePass] = useState(true);

  const dispatch = useDispatch();

  const hidePassHandler = () => {
    setHidePass(!hidePass);
  };

  return (
    <PasswordIconsWrapper>
      <PasswordItemWrapper>
        {item.name}:&nbsp;
        <StyledHidePass toHidePass={hidePass}>{item.number}</StyledHidePass>
      </PasswordItemWrapper>
      <div>
        <IconButton onClick={hidePassHandler} size="small">
          {hidePass ? (
            <VisibilityOff style={{ fontSize: '18px' }} />
          ) : (
            <Visibility style={{ fontSize: '18px' }} />
          )}
        </IconButton>
        <IconButton
          onClick={() => dispatch(deletePassword(item.id))}
          size="small"
        >
          <DeleteOutlinedIcon fontSize="small" />
        </IconButton>
      </div>
    </PasswordIconsWrapper>
  );
};
