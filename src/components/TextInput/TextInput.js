import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Label, Item, Input, Text } from 'native-base';

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
        <Label>{label}</Label>
        {iconPosition === 'left' ? icon : null}
        <Input onChangeText={onChangeText} {...rest} />
        {iconPosition === 'right' ? icon : null}
      </Item>
      <Text>{alertText}</Text>
    </View>
  );
};

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
