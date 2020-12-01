import React from 'react';
import PropTypes from 'prop-types';
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base';

const propTypes = {
  iconName: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

const defaultProps = {};

const StyledHeader = (props) => {
  const { iconName, onPress, title } = props;

  return (
    <Header>
      <Left>
        <Button transparent onPress={onPress}>
          <Icon name={iconName} />
        </Button>
      </Left>
      <Body>
        <Title>{title}</Title>
      </Body>
      <Right />
    </Header>
  );
};

StyledHeader.propTypes = propTypes;
StyledHeader.defaultProps = defaultProps;

export default StyledHeader;
