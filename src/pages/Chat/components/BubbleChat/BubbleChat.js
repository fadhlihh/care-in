import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card, CardItem, Thumbnail, Subtitle, Text } from 'native-base';
import styles from './styles';

const propTypes = {
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  listener: PropTypes.bool,
  listenerPicture: PropTypes.objectOf(PropTypes.any)
};

const defaultProps = {
  listener: false,
  listenerPicture: {
    uri: 'https://dummyimage.com/400x400/c4c4c4/ffffff&text=Profile+Picture'
  }
};

const BubbleChat = (props) => {
  const { message, time, listener, listenerPicture } = props;

  return (
    <View>
      {listener ? (
        <View style={styles.largeBundle_sender}>
          <Thumbnail small source={listenerPicture} style={styles.img_sender} />
          <Card style={styles.root_sender}>
            <CardItem button style={styles.content_sender}>
              <View style={styles.information_sender}>
                <View style={styles.chatBundle_sender}>
                  <Text style={styles.name_sender}>{message}</Text>
                </View>
                <Subtitle style={styles.time_sender}>{time}</Subtitle>
              </View>
            </CardItem>
          </Card>
        </View>
      ) : (
        <View style={styles.largeBundle_receiver}>
          <Card style={styles.root_receiver}>
            <CardItem button style={styles.content_receiver}>
              <View style={styles.information_sender}>
                <View style={styles.chatBundle_sender}>
                  <Text style={styles.name_receiver}>{message}</Text>
                </View>
                <Subtitle style={styles.time_receiver}>{time}</Subtitle>
              </View>
            </CardItem>
          </Card>
        </View>
      )}
    </View>
  );
};

BubbleChat.propTypes = propTypes;
BubbleChat.defaultProps = defaultProps;

export default BubbleChat;
