import React from 'react';
import PropTypes from 'prop-types';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

const propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  iconName: PropTypes.string.isRequired
};

const defaultProps = {};

const BottomNavigation = (props) => {
  const { navigation, iconName } = props;
  const { state } = navigation;

  return (
    <Footer>
      <FooterTab>
        {state.routes.map((element) => (
          <Button key={element.key} onPress={() => Actions[element.key]()}>
            <Text>{element.routes[0].params.title.toUpperCase()}</Text>
            <Icon name={iconName} />
          </Button>
        ))}
      </FooterTab>
    </Footer>
  );
};

BottomNavigation.propTypes = propTypes;
BottomNavigation.defaultProps = defaultProps;

export default BottomNavigation;
