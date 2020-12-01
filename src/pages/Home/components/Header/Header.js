import React from 'react';
import PropTypes from 'prop-types';
import { Header, Text } from 'native-base';
import styles from './styles';

const propTypes = {
  name: PropTypes.string
};

const defaultProps = {
  name: 'Mansyah'
};

const StyledHeader = (props) => {
  const { name, ...rest } = props;

  return (
    <Header style={styles.root} noShadow {...rest}>
      <Text>{`Halo ${name}\nSelamat datang!`}</Text>
    </Header>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
