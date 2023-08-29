import {Button, Image, Text} from '@rneui/base';
import {
  FlatList,
  PermissionsAndroid,
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import MapView, {Marker, enableLatestRenderer} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { useIsFocused } from '@react-navigation/native';
import markerImage from '../../assets/icons8-marker.png';
import { useRoutesService } from '../hooks/services/useRoutesService';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

enableLatestRenderer();
function MapScreen({navigation}) {
  const {logout, userInfo} = useContext(AuthContext);
  const [coords, setCoords] = useState(null);

  const isFocused = useIsFocused();

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permiso de ubicación',
          message:
            'Comparador Santiago necesita permiso para usar tu ubicación',
          buttonNeutral: 'Más tarde',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Puedes usar la Ubicacion');
      } else {
        console.log('No puedes usar la Ubicacion');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      position => {
        if (position) {
          console.log(position);
          const { latitude, longitude } = position.coords;
          setCoords({
            latitude,
            longitude,
            latitudeDelta: LATITUDE_DELTA, // Optional: adjust the zoom level
            longitudeDelta: LONGITUDE_DELTA, // Optional: adjust the zoom level
          });
        }
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }

  useEffect(() => {
    requestLocationPermission().catch(console.error);
    getCurrentPosition();
  }, []);

  useEffect(() => {
    if (isFocused && userInfo?.id) {
      getCurrentPosition();
    }
}, [isFocused]);

  return (
    <SafeAreaView style={{flex: 1}}>
      {coords && (
        <View style={styles.container}>
          <MapView
            style={styles.container}
            initialRegion={coords}
            onRegionChangeComplete={region => setCoords(region)}
          />
          <View style={styles.markerFixed}>
            <Image style={styles.marker} source={markerImage} />
          </View>
        </View>
      )}
      <Button title="Guardar ubicación" onPress={() => navigation.navigate("Route", {coords})} />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 48,
    width: 48,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default MapScreen;
