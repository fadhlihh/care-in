import React from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';
import { Header, Text,Left, Right } from 'native-base';
import styles from './styles';

const propTypes = {
  name: PropTypes.string
};

const defaultProps = {
  name: 'User'
};

const StyledHeader = (props) => {
  const { name, ...rest } = props;

  return (
    <Header style={styles.root} noShadow {...rest}>
        <Left>
          <Image style={styles.image} source={require('../../../../assets/nurse.png')} />
        </Left>
        <Right>
          <Text style={styles.text}>{`Halo ${name}\nSelamat datang!`}</Text>
        </Right>
    </Header>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
