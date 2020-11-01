import agent from '../../../utils/agent/user';
import { addNotification, requireAuth } from '../index';

export const doUpdateUser = (param, id, userType) => {
  return async (dispatch) => {
    const response = await agent.update(param, id, userType);
    if (response.error) {
      dispatch(addNotification(response.error));
    } else {
      dispatch(addNotification(response.message));
      dispatch(requireAuth());
    }
  };
};
