import React from 'react';
import { CardButton } from '../../buttons/cardButton.jsx';
import { Input } from '../../inputs/input.jsx';
import { Select } from '../../selects/selectType.jsx';
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
    onTypeChange,
    submit,
    userType,
  } = props;

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
        <Select onChange={onTypeChange} value={userType} />
        <CardButton label="Register" onClick={submit} />
      </form>
    </div>
  );
};
