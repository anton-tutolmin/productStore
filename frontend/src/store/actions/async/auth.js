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
      const user = await agent.load();

      if (user.error) {
        dispatch(addNotification(user.error));
      } else if (user.message) {
        dispatch(addNotification(user.message));
      } else {
        dispatch(
          loadUser({
            id: user.id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            balance: user.balance,
          }),
        );
        dispatch(authorize());
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
