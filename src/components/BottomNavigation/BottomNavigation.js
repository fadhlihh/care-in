import React from 'react';
import PropTypes from 'prop-types';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

const propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const BottomNavigation = (props) => {
  const { navigation } = props;
  const { state } = navigation;

  return (
    <Footer>
      <FooterTab>
        {state.routes.map((element) => (
          <Button key={element.key} onPress={() => Actions[element.key]()}>
            <Icon name={element.routes[0].params.iconName} />
            <Text>{element.routes[0].params.title.toUpperCase()}</Text>
          </Button>
        ))}
      </FooterTab>
    </Footer>
  );
};

BottomNavigation.propTypes = propTypes;
BottomNavigation.defaultProps = defaultProps;

export default BottomNavigation;
