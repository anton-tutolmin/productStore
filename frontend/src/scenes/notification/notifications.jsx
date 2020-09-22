import React from 'react';
import { connect } from 'react-redux';
import { Notification } from '../../components/notification/notification.jsx';
import { removeNotification } from '../../store/actions';
import './notifications.sass';

const Notifications = (props) => {
  const { notifications, remove } = props;

  const onRemove = (id) => {
    remove(id);
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
  remove: (id) => dispatch(removeNotification(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Notifications);
