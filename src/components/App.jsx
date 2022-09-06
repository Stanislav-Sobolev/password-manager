import { Route, Routes } from 'react-router-dom';
import { Contacts } from './Contacts/Contacts';
import { Registration } from './Registration/Registration';
import { SharedLayout } from './SharedLayout/SharedLayout';
import { Login } from './Login/Login';

export function App() {
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
