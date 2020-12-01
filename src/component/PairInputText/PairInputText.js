import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'native-base';
import TextInput from '../TextInput';
import styles from './styles';

const propTypes = {
  firstLabel: PropTypes.string,
  secondLabel: PropTypes.string,
  minRows: PropTypes.number,
  maxRows: PropTypes.number
};

const defaultProps = {
  firstLabel: 'Label One',
  secondLabel: 'Label Two',
  minRows: 2,
  maxRows: 5
};

const PairInputText = (props) => {
  const { firstLabel, secondLabel, minRows, maxRows, ...rest } = props;

  const [inputList, setInputList] = useState([{ valueOne: '', valueTwo: '' }]);

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
                handleInputChange(index, 'valueOne', newValue)
              }
              value={list.valueOne}
            />
            <TextInput
              label={secondLabel}
              onChangeText={(newValue) =>
                handleInputChange(index, 'valueTwo', newValue)
              }
              value={list.valueTwo}
            />
            <View style={styles.buttonContainer}>
              {inputList.length > minRows && (
                <Button onPress={() => handleRemoveClick(index)}>
                  <Text>Remove</Text>
                </Button>
              )}
              {inputList.length < maxRows && (
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
