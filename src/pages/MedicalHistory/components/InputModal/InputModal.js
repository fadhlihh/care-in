import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Text, Button, Icon } from 'native-base';
import BottomSheet from 'react-native-js-bottom-sheet';
import { DatePicker, TextInput } from '../../../../components';
import styles from './styles';

const propTypes = {
  refs: PropTypes.func.isRequired,
  onDiseaseChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onPressSaveButton: PropTypes.func.isRequired,
  onPressCancelButton: PropTypes.func.isRequired,
  onPressDeleteButton: PropTypes.func.isRequired,
  valueDisease: PropTypes.string.isRequired,
  valueDate: PropTypes.string.isRequired,
  edit: PropTypes.bool
};

const defaultProps = {
  edit: false
};

const StyledBottomSheet = (props) => {
  const {
    refs,
    onDiseaseChange,
    onDateChange,
    onPressSaveButton,
    onPressCancelButton,
    onPressDeleteButton,
    valueDisease,
    valueDate,
    edit
  } = props;

  return (
    <BottomSheet
      style={styles.root}
      ref={refs}
      itemDivider={3}
      backButtonEnabled
      coverScreen={false}
      title="Create"
      isOpen={false}
    >
      <View style={edit ? styles.container : styles.editContainer}>
        {edit && (
          <View style={styles.deleteButtonContainer}>
            <Button
              style={styles.btnSuccessDetailThree}
              onPress={onPressDeleteButton}
            >
              <Icon name="trash-outline" style={styles.btnSuccessTextThree} />
            </Button>
          </View>
        )}
        <View style={styles.formInput}>
          <TextInput
            label="Penyakit"
            onChangeText={onDiseaseChange}
            value={valueDisease}
          />
          <DatePicker
            label="Tanggal Diderita"
            onDateChange={onDateChange}
            placeHolderText={
              valueDate !== 'Invalid date' ? valueDate : 'Pilih tanggal'
            }
          />
          <View style={styles.btnModal}>
            <Button transparent style={styles.btnKembali} onPress={onPressCancelButton}>
              <Text style={styles.btnModalKembali}><Text style={styles.kembali}>Kembali</Text></Text>
            </Button>
            <Button style={styles.btnModalSimpan} onPress={onPressSaveButton}>
              <Text style={styles.btntextModalSimpan}><Text style={styles.textSimpan}>Simpan</Text></Text>
            </Button>
          </View>
        </View>
        
      </View>
    </BottomSheet>
  );
};

StyledBottomSheet.propTypes = propTypes;
StyledBottomSheet.defaultProps = defaultProps;

export default StyledBottomSheet;
