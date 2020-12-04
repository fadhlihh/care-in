import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Card, CardItem, Thumbnail,Left, Right, Subtitle,Text } from 'native-base';
import styles from './styles';

const propTypes = {
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  worker: PropTypes.bool
};

const defaultProps = {
  worker: false
};

const BubbleChat = (props) => {
  const { message, time, worker } = props;

  return (
    <View> 
      {/* //first it for receiver  */}
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


    {/* //second its for sender */}
    <View style={styles.largeBundle_sender}>
    <Thumbnail small source={require('../../../../assets/marcell-white.jpg')} style={styles.img_sender}/>
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
    </View>
    
  );
};

BubbleChat.propTypes = propTypes;
BubbleChat.defaultProps = defaultProps;

export default BubbleChat;
