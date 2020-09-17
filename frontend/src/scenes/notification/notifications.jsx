import React from 'react';
import { connect } from 'react-redux';
import { Notification } from '../../components/notification/notification.jsx';
import { removeNotification } from '../../store/actions';
import './notifications.sass';

const Notifications = (props) => {
  const { notifications, removeNotification } = props;

  const onRemove = (id) => {
    removeNotification(id);
  };

  return (
    <div className="notifications">
      <ul>
        {notifications.map((n) => (
          <li key={n.id}>
            <Notification notification={n} onRemove={onRemove} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.notifications.notifications,
});

const mapDispatchToProps = (dispatch) => ({
  removeNotification: (payload) =>
    dispatch(removeNotification(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
