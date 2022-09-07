import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useAuth } from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import operations from '../../Redux/authOperations';

import {
  UserInfo,
  UserName,
  NavList,
  NavigationWrap,
  NavItem,
  Link,
} from '../Contacts/PhoneBook.styled';

export const SharedLayout = () => {
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
                  <Link to="/contacts">Contacts</Link>
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
              <Button
                variant="outlined"
                size="small"
                onClick={() => dispatch(operations.logOut())}
              >
                LogOut
              </Button>
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
