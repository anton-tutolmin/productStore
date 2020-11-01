import agent from '../../../utils/agent/auth';
import {
  addNotification,
  authorize,
  requireAuth,
  unrequireAuth,
  loadUser,
} from '../index';

export const doAuth = () => {
  return async (dispatch) => {
    if (localStorage.getItem('token')) {
      const response = await agent.load();
      if (response.error) {
        dispatch(addNotification(response.error));
      } else if (response.message) {
        dispatch(addNotification(response.message));
      } else {
        dispatch(authorize());
        dispatch(
          loadUser({
            id: response.user.id,
            username: response.user.username,
            email: response.user.email,
            phone: response.user.phone,
            balance: response.user.balance,
            type: response.user.type,
          }),
        );
      }
    } else {
      dispatch(unrequireAuth());
    }
  };
};

export const doLogin = (user) => {
  return async (dispatch) => {
    const response = await agent.login(user);
    if (response.error) {
      dispatch(addNotification(response.error));
    } else if (response.message) {
      dispatch(addNotification(response.message));
    } else {
      localStorage.setItem('token', response.token);
      dispatch(requireAuth());
    }
  };
};

export const doRegister = (user) => {
  return async (dispatch) => {
    const response = await agent.register(user);
    if (response.error) {
      dispatch(addNotification(response.error));
    } else if (response.message) {
      dispatch(addNotification(response.message));
    } else {
      localStorage.setItem('token', response.token);
      dispatch(requireAuth());
    }
  };
};
