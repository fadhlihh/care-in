import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import PropTypes from 'prop-types';
import { LoadActions } from '../../redux/actions';
import { NotificationType } from '../../constant';

const propTypes = {
  setLoad: PropTypes.func.isRequired,
  load: PropTypes.bool.isRequired
};

const defaultProps = {};

const PushController = (props) => {
  const { load, setLoad } = props;

  useEffect(() => {
    PushNotification.configure({
      onRegister(token) {
        console.log('FCM TOKEN :', token);
      },

      onNotification(notification) {
        if (notification.foreground) {
          PushNotification.localNotification(notification);
        }
        console.log(`Notification received :`, notification.data.type);
        switch (notification.data.type) {
          case NotificationType.NEW_ORDER:
            setLoad(load);
            break;
          case NotificationType.ORDER_CANCELED:
            setLoad(load);
            break;
          case NotificationType.ORDER_ACCEPTED:
            setLoad(load);
            break;
          case NotificationType.ORDER_DECLINED:
            setLoad(load);
            break;
          case NotificationType.ORDER_DONE:
            setLoad(load);
            break;
          case NotificationType.CHAT:
            // do nothing
            break;
          default:
            break;
        }
      },
      senderID: '378976790564',
      popInitialNotification: true,
      requestPermissions: true,
      largeIcon: 'icare_icon',
      smallIcon: 'icare_icon'
    });
  }, []);

  return null;
};

PushController.propTypes = propTypes;
PushController.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    load: state.loadReducer.load
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(LoadActions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PushController);
