import { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

const PushController = () => {
  useEffect(() => {
    PushNotification.configure({
      onRegister(token) {
        console.log('TOKEN:', token);
      },

      onNotification(notification) {
        console.log('NOTIFICATION:', notification);
      },
      senderID: '378976790564',
      popInitialNotification: true,
      requestPermissions: true
    });
  }, []);

  return null;
};

export default PushController;
