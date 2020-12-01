import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DatePicker, Label, Item } from 'native-base';

const propTypes = {
  label: PropTypes.string,
  onDateChange: PropTypes.func.isRequired
};

const defaultProps = {
  label: ''
};

const StyledDatePicker = (props) => {
  const { label, onDateChange, ...rest } = props;

  return (
    <Item stackedLabel>
      <Label hidden={label === ''}>{label}</Label>
      <DatePicker
        {...rest}
        minimumDate={new Date(1900, 1, 1)}
        modalTransparent={false}
        animationType="fade"
        androidMode="default"
        placeHolderText="Pilih tanggal"
        textStyle={{ color: 'green' }}
        placeHolderTextStyle={{ color: '#000' }}
        onDateChange={onDateChange}
      />
    </Item>
  );
};

StyledDatePicker.propTypes = propTypes;
StyledDatePicker.defaultProps = defaultProps;

export default StyledDatePicker;
