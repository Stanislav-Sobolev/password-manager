import { Outlet } from 'react-router-dom';
import React from 'react';
import { Suspense } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import operations from '../../Redux/authOperations';
import LogoutIcon from '@mui/icons-material/Logout';
import IconButton from '@material-ui/core/IconButton';

import {
  UserInfo,
  UserName,
  NavList,
  NavigationWrap,
  NavItem,
  Link,
} from '../Passwords/PasswordManager.styled';

const SharedLayout = () => {
  const { isLoggedIn, user } = useAuth();
  const dispatch = useDispatch();
  return (
    <>
      <header>
        <NavigationWrap>
          <NavList>
            {isLoggedIn ? (
              <>
                <NavItem>
                  <Link to="/passwords">Passwords</Link>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <Link to="/registration">Registration</Link>
                </NavItem>
                <NavItem>
                  <Link to="/login">Login</Link>
                </NavItem>
              </>
            )}
          </NavList>

          <UserInfo>
            <UserName>{user.name}</UserName>
            <Stack direction="row" spacing={1}>
              <Avatar src="/broken-image.jpg" />
            </Stack>

            {isLoggedIn && (
              <IconButton
                onClick={() => dispatch(operations.logOut())}
                size="small"
              >
                <LogoutIcon />
              </IconButton>
            )}
          </UserInfo>
        </NavigationWrap>
      </header>

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default SharedLayout;
