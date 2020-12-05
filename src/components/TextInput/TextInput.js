import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Label, Item, Input, Text } from 'native-base';
import styles from './styles';

const propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element,
  onChangeText: PropTypes.func,
  iconPosition: PropTypes.string,
  alertText: PropTypes.string
};

const defaultProps = {
  label: '',
  icon: null,
  iconPosition: 'left',
  alertText: '',
  onChangeText: () => {}
};

const TextInput = (props) => {
  const { label, icon, iconPosition, onChangeText, alertText, ...rest } = props;
  return (
    <View>
      <Item floatingLabel>
        <Label style={styles.label}>{label}</Label>
        {iconPosition === 'left' ? icon : null}
        <Input onChangeText={onChangeText} {...rest}  style={styles.input}/>
        {iconPosition === 'right' ? icon : null}
      </Item>
      <Text style={{marginLeft:'5%',fontSize:12,color:'red'}}>{alertText}</Text>
    </View>
  );
};

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
