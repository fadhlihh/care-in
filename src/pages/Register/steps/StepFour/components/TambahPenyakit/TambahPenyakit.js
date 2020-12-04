import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View } from 'react-native';
import { Thumbnail, Title ,TextInput} from 'native-base';
import styles from './styles';

const propTypes = {
  title: PropTypes.string.isRequired,
  imageSource: PropTypes.objectOf(PropTypes.string).isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string
};

const defaultProps = {
  color: '#FFFFFF'
};

const Feature = (props) => {
  const { title, imageSource, onPress, color } = props;

  return (
    <View>
      <View style={styles.tahunInput}>
      <TextInput 
        label="Tahun"
        keyboardType="phone-pad"
        onChangeText={(newValue) => handleChange('tahun', newValue)}
        alertText={hasError('tahun') ? formState.errors.noTelp[0] : null}
      />
      </View> 
      <View style={styles.penyakitInput}>
        <TextInput
          label="Penyakit"
          onChangeText={(newValue) => handleChange('penyakit', newValue)}
          alertText={
            hasError('penyakit') ? formState.errors.username[0] : null
          }
        />
      </View> 
    </View>
  );
};

Feature.propTypes = propTypes;
Feature.defaultProps = defaultProps;

export default Feature;
