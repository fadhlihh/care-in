import React, { useEffect } from 'react';
import { Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Container, List, ListItem,Card,CardItem, Left, Right, Thumbnail, Body, Content, Button, Subtitle, Title } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import styles from './styles';
import { Header,Profile_item, Riwayat} from './components';

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
      <Header name={user.nama} username={user.username} />
        <View style={styles.containter}>
          {/* <View>
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
          </View> */}
          <List style={{marginTop:10}}>
            <Profile_item title='Email' item={user.email} icon={'mail-outline'} warna={'blue'} />
            <Profile_item title='Telpon' item={user.noTelp} icon={'call-outline'} color={'red'} />
            {/* <Profile_item title='Tempat lahir' item={user.tempatLahir} imageSource={require('../../assets/perawat.png')} />
            <Profile_item title='Tanggal Lahir' item={user.tglLahir} imageSource={require('../../assets/perawat.png')} /> 
            <Profile_item title='Golongan Darah' item={`${user.goldar}`} imageSource={require('../../assets/perawat.png')} />*/}
            <Profile_item title='Berat Badan' item={`${user.beratBadan} kg`} icon={'man-outline'} color={'yellow'} />
            <Profile_item title='Tinggi Badan' item={`${user.beratBadan} cm`} icon={'resize-outline'} color={'green'} />
          </List>
          {/* <View style={styles.infoContainer}>
            
            <View style={styles.info}>
              <Text>Jenis Kelamin</Text>
              <Text>{`${user.beratBadan} kg`}</Text>
            </View>
            <View style={styles.info}>
              <Text>Tinggi Badan</Text>
              <Text>{`${user.beratBadan} cm`}</Text>
            </View>
            <View style={styles.info}>
              <Text></Text>
              <Text></Text>
            </View>
          </View> 
          <Button
            onPress={() => {
              Actions.editProfile({ id: user.id });
            }}
          >
            <Text>Edit</Text>
          </Button> */}
        <View style={{ flexDirection: 'row',marginHorizontal:15,marginTop:30,marginBottom:'3%', justifyContent: 'space-between'}}>
          <Text style={{fontWeight:'bold',fontSize:14}}>Riwayat Kesehatan</Text>
          <Text style={{fontSize:14}}>Lihat Semua</Text>
        </View>
        <Card>
          <Riwayat penyakit='Sakit Jantung' tanggal='Agustus 2020'/>
          <Riwayat penyakit='Sakit Jantung' tanggal='Agustus 2020'/>
          <Riwayat penyakit='Sakit Jantung' tanggal='Agustus 2020'/>
        </Card>
  
        </View>
        <View />
        <Button
            onPress={() => {
              Actions.editProfile({ id: user.id });
            }}
          >
            <Text>Edit</Text>
          </Button>
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
