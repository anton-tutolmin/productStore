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
import userValidator from '../../utils/validator/user';

import {
  addNotification,
  requireAuth,
} from '../../store/actions/index';

import './profile.sass';

const Profile = (props) => {
  const { user, showError } = props;
  const [shownModal, setShownModal] = useState(null);

  const updateUsername = (value) => {
    if (userValidator.isValidUsername(value)) {
      setShownModal(null);
      console.log('update username', value);
    } else {
      showError('Too short username');
    }
  };

  const updateEmail = (value) => {
    if (userValidator.isValidEmail(value)) {
      setShownModal(null);
      console.log('update email', value);
    } else {
      showError('Too short email');
    }
  };

  const updatePhone = (value) => {
    if (userValidator.isValidPhone(value)) {
      setShownModal(null);
      console.log('update phone', value);
    } else {
      showError('Phone length must be 12');
    }
  };

  const updateBalance = (value) => {
    if (userValidator.isValidBalance(value)) {
      setShownModal(null);
      console.log('update balance', value);
    } else {
      showError('Balance must be number greater 0');
    }
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
      onSubmit={updateUsername}
    />,
    <ProfileModal
      label="Email"
      type="email"
      onToggle={() => setShownModal(null)}
      onSubmit={updateEmail}
    />,
    <ProfileModal
      label="Phone"
      type="text"
      onToggle={() => setShownModal(null)}
      onSubmit={updatePhone}
    />,
    <ProfileModal
      label="Fill balance"
      type="text"
      onToggle={() => setShownModal(null)}
      onSubmit={updateBalance}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
