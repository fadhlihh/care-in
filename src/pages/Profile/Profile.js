import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Container, List, Card, Content, Toast } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { LocalStorage, StringBuilder, DateFormatter } from '../../helpers';
import Api from '../../services';
import styles from './styles';
import { Header, ProfileItem, Riwayat } from './components';
import { UserType } from '../../constant';

const propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired
};

const defaultProps = {};

const Profile = (props) => {
  const { user } = props;

  const [state, setState] = useState({
    medicalHistory: []
  });

  const [userType, setUserType] = useState(UserType.PATIENT);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    LocalStorage.getUserType().then((newUserType) => {
      setUserType(newUserType);
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      const params = {
        params: {
          limit: 2,
          page: 1
        }
      };
      Api.getMedicalHitory(user.id, params).then(
        (res) => {
          setState({ medicalHistory: res.riwayatKesehatan });
        },
        (error) => {
          Toast.show({ text: error.response.data.message });
        }
      );
    };

    if (userType === UserType.PATIENT) {
      fetchMedicalHistory();
    }
  }, [userType]);

  return (
    <Container>
      <Content showsVerticalScrollIndicator={false}>
        <Header
          name={user.nama}
          username={user.username}
          onEditPress={() => Actions.editProfile({ id: user.id })}
          onBackPress={() => Actions.pop()}
          pictureSource={{
            uri:
              userType === UserType.PATIENT
                ? 'https://www.cornwallbusinessawards.co.uk/wp-content/uploads/2017/11/dummy450x450.jpg'
                : StringBuilder.addBaseURL(user.foto)
          }}
        />
        {isLoaded ? (
          <View style={styles.containter}>
            <List style={{ marginTop: 10 }}>
              <ProfileItem
                title="Email"
                item={user.email}
                icon="mail-outline"
                warna="blue"
              />
              <ProfileItem
                title="Nomor Telepon"
                item={user.noTelp}
                icon="call-outline"
                warna="red"
              />

              {userType === UserType.PATIENT && (
                <View>
                  <ProfileItem
                    title="Berat Badan"
                    item={`${user.beratBadan} kg`}
                    icon="man-outline"
                    warna="orange"
                  />
                  <ProfileItem
                    title="Tinggi Badan"
                    item={`${user.tinggiBadan} cm`}
                    icon="resize-outline"
                    warna="green"
                  />
                </View>
              )}

              {userType === UserType.WORKER && (
                <View>
                  <ProfileItem
                    title="Profesi"
                    item={`${StringBuilder.capitalizeLetter(user.jenis)}`}
                    icon="medkit-outline"
                    warna="orange"
                  />
                  <ProfileItem
                    title="Harga"
                    item={`Rp. ${StringBuilder.formatCurrency(user.harga)}`}
                    icon="cash-outline"
                    warna="green"
                  />
                </View>
              )}
            </List>

            {userType === UserType.PATIENT && (
              <View>
                <View style={styles.bundleRiwayat}>
                  <Text style={styles.textRiwayat}>Riwayat Kesehatan</Text>
                  <TouchableOpacity onPress={() => Actions.medicalHistory()}>
                    <Text style={styles.textLihat}>Lihat Semua</Text>
                  </TouchableOpacity>
                </View>

                <Card noShadow style={styles.cardBundle}>
                  {state.medicalHistory.map((item) => (
                    <Riwayat
                      index={item.id}
                      penyakit={item.namaPenyakit}
                      tanggal={DateFormatter.getLegibleDate(item.tanggal)}
                    />
                  ))}
                </Card>
              </View>
            )}
          </View>
        ) : (
          <ActivityIndicator />
        )}
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
