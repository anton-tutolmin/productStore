import React, { useReducer } from 'react';
import { CardButton } from '../../buttons/cardButton.jsx';
import { Input } from '../../inputs/input.jsx';
import './registerForm.sass';

export const RegisterForm = (props) => {
  const {
    username,
    password,
    email,
    phone,
    onUsernameChange,
    onPasswordChange,
    onEmailChange,
    onPhoneChange,
  } = props;

  const submit = () => {
    console.log(username, password, email, phone);
  };

  return (
    <div className="registerform">
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
        <Input
          label="Email:"
          value={email}
          type="email"
          onChange={onEmailChange}
        />
        <Input
          label="Phone:"
          value={phone}
          type="phone"
          onChange={onPhoneChange}
        />
        <CardButton label="Register" onClick={submit} />
      </form>
    </div>
  );
};
