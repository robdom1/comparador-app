/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Text } from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useCartService } from '../hooks/services/useCartService';
import CartProductItem from '../components/Cart/CartProductItem';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import CompareStoreItem from '../components/Compare/CompareStoreItem';


export default function CompareScreen({ route, navigation }) {
    const { productsParam } = route.params;

    const [productsList, setProductsList] = useState(null);
    


    const getStoreProducts = () => {
        const storeProducts = productsParam.reduce((r, a)=> {
            a.productos.forEach(element => {
                r[element.tienda] = r[element.tienda] || [];
                r[element.tienda].push(element);
            });
            return r;
        }, Object.create(null));
        return storeProducts;
    };


    useEffect(() => {
        const storeProducts = getStoreProducts();
        setProductsList(storeProducts);

    }, []);


    return (
        <SafeAreaView style={styles.container}>
            {productsList && (
                <FlatList
                    data={Object.entries(productsList)}
                    renderItem={({ item }) => <CompareStoreItem storeName={item[0]} value={item[1]} />}
                    keyExtractor={item => item[0]}
                />
            )}
            <Button title="Elegir ubicación" onPress={() => navigation.navigate("Map")} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 20,
        // marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
    },
});
