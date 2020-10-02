import React, { useState } from 'react';
import { connect } from 'react-redux';
import { LoginForm } from '../../components/forms/login/loginForm.jsx';
import { doLogin } from '../../store/actions/async/auth';
import { addNotification } from '../../store/actions/index';
import './login.sass';

const Login = (props) => {
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
      username.length < 5 ||
      password.length < 5
    );
  };

  const submit = () => {
    if (isInvalid()) {
      props.showNotification('Empty field');
    } else {
      props.submit({ username, password });
    }
  };

  return (
    <div className="login">
      <LoginForm
        username={username}
        password={password}
        onUsernameChange={onUsernameChange}
        onPasswordChange={onPasswordChange}
        submit={submit}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  submit: (user) => dispatch(doLogin(user)),
  showNotification: (payload) => dispatch(addNotification(payload)),
});

export default connect(null, mapDispatchToProps)(Login);
