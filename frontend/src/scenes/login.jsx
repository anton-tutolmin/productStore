import React, { useState } from 'react';
import { LoginForm } from '../components/forms/login/loginForm.jsx';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const onPasswordChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const isInvalid = () => {
    return (
      !username ||
      !password ||
      username.length < 6 ||
      password.length < 6
    );
  };

  return (
    <LoginForm
      username={username}
      password={password}
      onUsernameChange={onUsernameChange}
      onPasswordChange={onPasswordChange}
      isInvalid={isInvalid}
    />
  );
};
