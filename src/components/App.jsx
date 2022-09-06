import { Route, Routes } from 'react-router-dom';
import { Contacts } from './Contacts/Contacts';
import { Registration } from './Registration/Registration';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Login } from './Login/Login';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import authOperations from '../Redux/authOperations';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
    console.log('useEffect mount');
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Contacts />} />
          <Route path="registration" element={<Registration />} />
          <Route path="login" element={<Login />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="*" element={<Contacts />} />
        </Route>
      </Routes>
    </>
  );
}
