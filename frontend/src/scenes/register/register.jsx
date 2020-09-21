import React, { useReducer } from 'react';
import { connect } from 'react-redux';
import { RegisterForm } from '../../components/forms/register/registerForm.jsx';
import { doRegister } from '../../store/actions/async/auth.js';
import { addNotification } from '../../store/actions/index.js';
import validator from '../../utils/validator/user';

const initialState = {
  username: '',
  password: '',
  email: '',
  phone: '',
  type: 1,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_USERNAME':
      return { ...state, username: action.payload };
    case 'CHANGE_PASSWORD':
      return { ...state, password: action.payload };
    case 'CHANGE_EMAIL':
      return { ...state, email: action.payload };
    case 'CHANGE_PHONE':
      return { ...state, phone: action.payload };
    default:
      return state;
  }
};

const Register = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onUsernameChange = (e) => {
    e.preventDefault();
    dispatch({ type: 'CHANGE_USERNAME', payload: e.target.value });
  };

  const onPasswordChange = (e) => {
    e.preventDefault();
    dispatch({ type: 'CHANGE_PASSWORD', payload: e.target.value });
  };

  const onEmailChange = (e) => {
    e.preventDefault();
    dispatch({ type: 'CHANGE_EMAIL', payload: e.target.value });
  };

  const onPhoneChange = (e) => {
    e.preventDefault();
    dispatch({ type: 'CHANGE_PHONE', payload: e.target.value });
  };

  const isValid = () => {
    return (
      validator.isValidUsername(state.username) &&
      validator.isValidPassword(state.password) &&
      validator.isValidEmail(state.email) &&
      validator.isValidPhone(state.phone)
    );
  };

  const submit = () => {
    if (!isValid()) props.showError('Wrong filled fields');
    else props.submit({ ...state });
  };

  return (
    <RegisterForm
      username={state.username}
      password={state.password}
      email={state.email}
      phone={state.phone}
      onUsernameChange={onUsernameChange}
      onPasswordChange={onPasswordChange}
      onEmailChange={onEmailChange}
      onPhoneChange={onPhoneChange}
      submit={submit}
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  submit: (user) => dispatch(doRegister(user)),
  showError: (payload) => dispatch(addNotification(payload)),
});

export default connect(null, mapDispatchToProps)(Register);
