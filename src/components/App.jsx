import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SharedLayout from './SharedLayout/SharedLayout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, lazy } from 'react';
import authOperations from '../Redux/authOperations';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const Registration = lazy(() => import('./Registration/Registration'));
const Login = lazy(() => import('./Login/Login'));
const Dashboard = lazy(() => import('./Dashboard/Dashboard'));

export function App() {
  const dispatch = useDispatch();
  const isRefreshingUser = useSelector(state => state.auth.isRefreshingUser);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <>
      {isRefreshingUser ? (
        'updating user...'
      ) : (
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route
              index
              element={
                <PrivateRoute
                  redirectTo="/dashboard"
                  component={<Dashboard />}
                />
              }
            />
            <Route
              path="/registration"
              element={
                <PublicRoute
                  restricted
                  redirectTo="/dashboard"
                  component={<Registration />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute
                  restricted
                  redirectTo="/dashboard"
                  component={<Login />}
                />
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute redirectTo="/login" component={<Dashboard />} />
              }
            />
          </Route>
        </Routes>
      )}
    </>
  );
}
