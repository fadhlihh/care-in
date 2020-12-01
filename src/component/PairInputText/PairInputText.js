import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'native-base';
import TextInput from '../TextInput';
import styles from './styles';

const propTypes = {
  firstLabel: PropTypes.string,
  secondLabel: PropTypes.string,
  minRows: PropTypes.number,
  maxRows: PropTypes.number,
  onValueChange: PropTypes.func
};

const defaultProps = {
  firstLabel: 'Label One',
  secondLabel: 'Label Two',
  minRows: 2,
  maxRows: 5,
  onValueChange: () => {}
};

const PairInputText = (props) => {
  const {
    firstLabel,
    secondLabel,
    minRows,
    maxRows,
    onValueChange,
    ...rest
  } = props;

  const [inputList, setInputList] = useState([{ valueOne: '', valueTwo: '' }]);

  useEffect(() => {
    onValueChange(inputList);
  }, [inputList]);

  const handleInputChange = (index, name, newValue) => {
    const list = [...inputList];
    list[index][name] = newValue;
    setInputList(list);
  };

  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { valueOne: '', valueTwo: '' }]);
  };

  return (
    <View style={styles.container} {...rest}>
      {inputList.map((list, index) => {
        return (
          <View key={index}>
            <TextInput
              label={firstLabel}
              onChangeText={(newValue) =>
                handleInputChange(index, 'valueOne', newValue)}
              value={list.valueOne}
              keyboardType="numeric"
            />
            <TextInput
              label={secondLabel}
              onChangeText={(newValue) =>
                handleInputChange(index, 'valueTwo', newValue)}
              value={list.valueTwo}
            />
            <View style={styles.buttonContainer}>
              {inputList.length > minRows && (
                <Button onPress={() => handleRemoveClick(index)}>
                  <Text>Remove</Text>
                </Button>
              )}
              {inputList.length < maxRows && index === inputList.length - 1 && (
                <Button onPress={handleAddClick}>
                  <Text>Add</Text>
                </Button>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

PairInputText.propTypes = propTypes;
PairInputText.defaultProps = defaultProps;

export default PairInputText;
