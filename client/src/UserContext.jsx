import React from 'react';
import { LOGIN, USER_GET, USER_POST } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(email, password) {
    try {
      setLoading(true);
      setError(null);
      const { url, options } = LOGIN({ email, password });
      const response = await fetch(url, options);
      const { token, msg } = await response.json();
      if (!response.ok) throw msg;
      window.localStorage.setItem('token', token);
      await getUser(token);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function userRegister(name, email, password, cpf, plan) {
    try {
      setLoading(true);
      setError(null);
      const { url, options } = USER_POST({ name, email, password, cpf, plan });
      const response = await fetch(url, options);
      const { msg } = await response.json();
      if (!response.ok) throw msg;
      navigate('/login');
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <UserContext.Provider
      value={{ data, login, loading, error, userLogin, userRegister }}
    >
      {children}
    </UserContext.Provider>
  );
};