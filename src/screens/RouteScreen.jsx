import { Button, Image, ListItem, Text } from '@rneui/base';
import {
    FlatList,
    PermissionsAndroid,
    SafeAreaView,
    StyleSheet,
    View,
    Alert,
    Dimensions,
} from 'react-native';
import React, { createRef, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import MapView, { Marker, enableLatestRenderer } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useRoutesService } from '../hooks/services/useRoutesService';
import Config from "react-native-config";
import markerImage from '../../assets/icons8-marker.png';

const GOOGLE_MAPS_APIKEY = Config.GOOGLE_MAPS_APIKEY;
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

function RouteScreen({ route, navigation }) {
    const { coords: coordParams } = route.params;
    const [coords, setCoords] = useState(null);
    const [directionsList, setDirectionsList] = useState(null);
    const [distanceList, setDistanceList] = useState([]);


    const { getRoute } = useRoutesService();

    const mapViewRef = createRef();

    const handleChangeItem = (direccion, newProps) => {
        setDirectionsList(directionsList.map((element, i, list) => {
            if (element.direccion === direccion) {
                return { ...element, ...newProps };
            } else {
                return element;
            }
        }));
    }

    const getCoordinatesList = () => {
        if (!directionsList || !(Array.isArray(directionsList) && directionsList.length)) {
            return [];
        }

        return directionsList.map((element) => {
            return { latitude: element.latitude, longitude: element.longitude };
        });
    };

    const coordinatesList = useMemo(() => getCoordinatesList(), [directionsList])

    const handleGetRoute = () => {

        if (!coords) {
            Alert.alert("Validación", "Dirección inválida")
        }

        getRoute(coords.latitude, coords.longitude)
            .then(res => {
                if (res?.data) {
                    setDirectionsList(res.data);
                }
            })
            .catch(e => {
                if (!e?.response) {
                    console.error(`Error: ${e.message}`);
                    return;
                }

                let errorMessage;
                if (Array.isArray(e.response.data.message)) {
                    errorMessage = e.response.data.message.join('\n');
                } else {
                    errorMessage = e.response.data.message;
                }
                navigation.goBack();
                Alert.alert("Validación", errorMessage);
            });
    };

    useEffect(() => {
        setCoords(coordParams);
    }, [])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {coords && (
                <View style={styles.container}>
                    <MapView
                        style={styles.container}
                        initialRegion={coords}
                        ref={mapViewRef}
                    >
                        {(directionsList) && (
                            directionsList.map((element, i, list) => {
                                if (i === list.length - 1) {
                                    return;
                                }
                                return (
                                    <View key={element.direccion}>

                                        <MapViewDirections
                                            origin={{ latitude: element.latitude, longitude: element.longitude }}
                                            destination={{ latitude: list[i + 1].latitude, longitude: list[i + 1].longitude }}
                                            waypoints={(directionsList.length > 2) ? directionsList.slice(1, -1) : undefined}
                                            optimizeWaypoints={true}
                                            apikey={GOOGLE_MAPS_APIKEY}
                                            precision='high'
                                            strokeWidth={3}
                                            strokeColor="hotpink"

                                            onStart={({ origin, destination }) => {
                                                console.log(`Origin: ${origin}`);
                                                console.log(`Destination: ${destination}`);
                                            }}

                                            onReady={result => {
                                                console.log(`Distance: ${result.distance} km`);
                                                console.log(`Duration: ${result.duration} min.`);

                                                if (mapViewRef?.current && i === list.length - 2) {
                                                    console.log("fitToCoordinates");
                                                    console.log(coordinatesList);
                                                    mapViewRef.current.fitToCoordinates(coordinatesList, {
                                                        edgePadding: {
                                                            right: (width / 20),
                                                            bottom: (height / 20),
                                                            left: (width / 20),
                                                            top: (height / 20),
                                                        },
                                                    });
                                                }
                                            }}

                                            onError={(errorMessage) => {
                                                console.log('GOT AN ERROR');
                                            }}

                                        />
                                        <Marker
                                            coordinate={{ latitude: element.latitude, longitude: element.longitude }}
                                            title={element.nombreTienda}
                                            description={element.nombreLocal}
                                            image={markerImage}
                                            style={styles.marker}
                                        />
                                    </View>

                                )
                            })
                        )}


                    </MapView>

                    {(directionsList) && (
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title h3 style={{...styles.title, marginBottom: 20}}>Mejor Ruta:</ListItem.Title >
                                {directionsList.map((element, i, list) => {
                                    if (i === list.length - 1) {
                                        return;
                                    }

                                    return (
                                        <ListItem.Title style={styles.title}>{element.nombreTienda} a {list[i + 1].nombreTienda}</ListItem.Title >
                                    );
                                })}
                            </ListItem.Content>
                        </ListItem>
                    )}
                </View>
            )}
            <Button title="Obtener Ruta" onPress={() => handleGetRoute()} />
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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

export default RouteScreen;