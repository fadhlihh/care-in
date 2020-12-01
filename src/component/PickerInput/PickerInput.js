import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Picker, Label, Item } from 'native-base';

const propTypes = {
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onValueChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.any.isRequired
};

const defaultProps = {
  label: ''
};

const StyledPickerInput = (props) => {
  const { label, data, selectedValue, onValueChange, ...rest } = props;

  const renderItems = () =>
    data.map((item, index) => (
      <Picker.Item key={index} label={item.label} value={item.value} />
    ));

  return (
    <Item picker stackedLabel>
      <Label hidden={label === ''}>{label}</Label>
      <Picker
        {...rest}
        mode="dropdown"
        style={{ width: '100%' }}
        placeholder="Pilih jenis kelamin"
        placeholderStyle={{ color: '#bfc6ea' }}
        placeholderIconColor="#007aff"
        selectedValue={selectedValue}
        onValueChange={onValueChange}
      >
        {renderItems()}
      </Picker>
    </Item>
  );
};

StyledPickerInput.propTypes = propTypes;
StyledPickerInput.defaultProps = defaultProps;

export default StyledPickerInput;
