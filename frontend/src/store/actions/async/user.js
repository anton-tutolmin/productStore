import agent from '../../../utils/agent/user';
import { addNotification, requireAuth } from '../index';

export const doUpdateUser = (param, id) => {
  return async (dispatch) => {
    const response = await agent.update(param, id);
    if (response.error) {
      dispatch(addNotification(response.error));
    } else {
      dispatch(addNotification(response.message));
      dispatch(requireAuth());
    }
  };
};
