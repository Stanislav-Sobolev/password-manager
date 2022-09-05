import { Outlet } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

import {
  UserInfo,
  UserName,
  NavList,
  NavigationWrap,
  NavItem,
  Link,
} from '../Contacts/PhoneBook.styled';

export const SharedLayout = () => {
  return (
    <>
      <header>
        <NavigationWrap>
          <NavList>
            <NavItem>
              <Link to="/registration">Registration</Link>
            </NavItem>
            <NavItem>
              <Link to="/login">Login</Link>
            </NavItem>
            <NavItem>
              <Link to="/contacts">Contacts</Link>
            </NavItem>
          </NavList>

          <UserInfo>
            <UserName>userName</UserName>
            <Stack direction="row" spacing={1}>
              <Avatar
                sx={{ bgcolor: deepOrange[500] }}
                alt="Remy Sharp"
                src="/broken-image.jpg"
              />
              <Avatar src="/broken-image.jpg" />
            </Stack>
          </UserInfo>
        </NavigationWrap>
      </header>
      <Outlet />
    </>
  );
};
