import React from 'react';
import { CardButton } from '../../buttons/cardButton.jsx';
import { Input } from '../../inputs/input.jsx';
import './loginForm.sass';

export const LoginForm = (props) => {
  const {
    username,
    password,
    onUsernameChange,
    onPasswordChange,
    submit,
  } = props;

  return (
    <div className="loginform">
      <form>
        <Input
          label="Username:"
          value={username}
          type="text"
          onChange={onUsernameChange}
        />
        <Input
          label="Password:"
          value={password}
          type="password"
          onChange={onPasswordChange}
        />
        <CardButton label="Login" onClick={submit} />
      </form>
    </div>
  );
};
