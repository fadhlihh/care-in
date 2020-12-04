import { BackHandler, Alert } from 'react-native';

const builder = (
  object = {
    title: '',
    description: '',
    yesLabel: '',
    noLabel: '',
    onPress: () => {}
  }
) => {
  Alert.alert(object.title, object.description, [
    {
      text: object.noLabel,
      onPress: () => null,
      style: 'cancel'
    },
    { text: object.yesLabel, onPress: object.onPress }
  ]);
  return true;
};

const exit = () =>
  builder({
    title: 'Tunggu dulu',
    description: 'Apakah kamu yakin akan keluar?',
    yesLabel: 'Iya',
    noLabel: 'Kembali',
    onPress: () => {
      BackHandler.exitApp();
      console.log('yes pressed');
    }
  });

const BackAction = {
  builder,
  exit
};

export default BackAction;
