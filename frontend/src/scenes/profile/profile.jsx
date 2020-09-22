import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faEdit,
  faCreditCard,
} from '@fortawesome/free-solid-svg-icons';

import { TextLine } from '../../components/profile/textLine.jsx';
import { ProfileModal } from '../../components/modals/profileModal.jsx';
import { CardButton } from '../../components/buttons/cardButton.jsx';
import validator from '../../utils/validator/user';

import {
  addNotification,
  requireAuth,
} from '../../store/actions/index';

import { doUpdateUser } from '../../store/actions/async/user';

import './profile.sass';

const Profile = (props) => {
  const { user, showError } = props;
  const [shownModal, setShownModal] = useState(null);

  const update = (value, label) => {
    const param = {};
    if (label === 'Username') {
      if (validator.isValidUsername(value)) param.username = value;
      else showError('Too short username');
    }
    if (label === 'Email') {
      if (validator.isValidEmail(value)) param.email = value;
      else showError('Too short email');
    }
    if (label === 'Phone') {
      if (validator.isValidPhone(value)) param.phone = value;
      else showError('Phone length must be 11');
    }
    if (label === 'Fill balance') {
      if (validator.isValidBalance(value)) param.balance = +value;
      else showError('Balance must be number greater 0');
    }
    if (Object.keys(param).length) props.update(param, user.id);
  };

  const logout = () => {
    localStorage.removeItem('token');
    props.unauth();
  };

  const modals = [
    <ProfileModal
      label="Username"
      type="text"
      onToggle={() => setShownModal(null)}
      onSubmit={update}
    />,
    <ProfileModal
      label="Email"
      type="email"
      onToggle={() => setShownModal(null)}
      onSubmit={update}
    />,
    <ProfileModal
      label="Phone"
      type="text"
      onToggle={() => setShownModal(null)}
      onSubmit={update}
    />,
    <ProfileModal
      label="Fill balance"
      type="text"
      onToggle={() => setShownModal(null)}
      onSubmit={update}
    />,
  ];

  return (
    <div className="profile">
      <TextLine paramname="Username" text={user.username}>
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => setShownModal(modals[0])}
        />
      </TextLine>
      <TextLine paramname="Email" text={user.email}>
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => setShownModal(modals[1])}
        />
      </TextLine>
      <TextLine paramname="Phone" text={user.phone}>
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => setShownModal(modals[2])}
        />
      </TextLine>
      <TextLine paramname="Balance" text={`$${user.balance}`}>
        <FontAwesomeIcon
          icon={faCreditCard}
          onClick={() => setShownModal(modals[3])}
        />
      </TextLine>
      {shownModal}
      <CardButton label="Log out" onClick={logout} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  showError: (payload) => dispatch(addNotification(payload)),
  unauth: () => dispatch(requireAuth()),
  update: (param, id) => dispatch(doUpdateUser(param, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
