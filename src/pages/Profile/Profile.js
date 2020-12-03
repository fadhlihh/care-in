import React, { useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import styles from './styles';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const Profile = (props) => {
  const { user } = props;

  useEffect(() => {
    console.log(user);
  }, []);

  return (
    <Container>
      <Content>
        <View style={styles.containter}>
          <View>
            <Image
              style={styles.photoProfile}
              source={{
                uri: user.foto
                  ? user.foto
                  : 'https://reactnative.dev/img/tiny_logo.png'
              }}
            />
            <Text style={styles.name}>{user.nama}</Text>
            <Text style={styles.name}>{user.username}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <Text>Email</Text>
              <Text>{user.email}</Text>
            </View>
            <View style={styles.info}>
              <Text>Telpon</Text>
              <Text>{user.noTelp}</Text>
            </View>
            <View style={styles.info}>
              <Text>Tempat lahir</Text>
              <Text>{user.tempatLahir}</Text>
            </View>
            <View style={styles.info}>
              <Text>Tanggal Lahir</Text>
              <Text>{user.tglLahir}</Text>
            </View>
            <View style={styles.info}>
              <Text>Jenis Kelamin</Text>
              <Text>{`${user.beratBadan} kg`}</Text>
            </View>
            <View style={styles.info}>
              <Text>Tinggi Badan</Text>
              <Text>{`${user.beratBadan} cm`}</Text>
            </View>
            <View style={styles.info}>
              <Text>Golongan Darah</Text>
              <Text>{`${user.goldar}`}</Text>
            </View>
          </View>
          <Button
            onPress={() => {
              Actions.editProfile({ id: user.id });
            }}
          >
            <Text>Edit</Text>
          </Button>
        </View>
        <View />
      </Content>
    </Container>
  );
};

Profile.propTypes = propTypes;
Profile.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user
  };
};

export default connect(mapStateToProps)(Profile);
