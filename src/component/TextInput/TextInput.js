import React from 'react';
import PropTypes from 'prop-types';
import { Label, Item, Input } from 'native-base';

const propTypes = {
  label: PropTypes.string,
  icon: PropTypes.element,
  onChangeText: PropTypes.func,
  iconPosition: PropTypes.string
};

const defaultProps = {
  label: '',
  icon: null,
  iconPosition: 'left',
  onChangeText: () => {}
};

const TextInput = (props) => {
  const { label, icon, iconPosition, onChangeText, ...rest } = props;
  return (
    <Item floatingLabel {...rest}>
      <Label>{label}</Label>
      {iconPosition === 'left' ? icon : null}
      <Input onChangeText={onChangeText} />
      {iconPosition === 'right' ? icon : null}
    </Item>
  );
};

TextInput.propTypes = propTypes;
TextInput.defaultProps = defaultProps;

export default TextInput;
