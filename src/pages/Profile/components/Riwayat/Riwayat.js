import React from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';
import { Text,CardItem, Body, Title,Subtitle, Thumbnail } from 'native-base';
import styles from './styles';

const propTypes = {
  penyakit: PropTypes.string.isRequired,
  tanggal: PropTypes.string.isRequired,
};

const defaultProps = {
  name: 'User'
};

const StyledHeader = (props) => {
  const { penyakit,tanggal, ...rest } = props;

  return (
    <View style={styles.card}>
      <View noShadow >
        <CardItem style={styles.bundle}>
          <View style={styles.subcardBundle}>
          <Text style={styles.penyakit}>{penyakit}</Text>
          <Text style={styles.tanggal}>{tanggal}</Text>
          </View>
        </CardItem>
      </View>
    </View>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
