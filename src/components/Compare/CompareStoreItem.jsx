import { Text } from '@rneui/base'
import React, { useState, useEffect } from 'react'
import {View, FlatList, StyleSheet} from 'react-native'
import CompareProductItem from './CompareProductItem'

export default function CompareStoreItem({storeName, value}) {
    const [totalPrecio, setTotalPrecio] = useState(0);

    const getTotalProductos = () => {
        const totalPrecioTiendas = value.reduce((r, a)=> {
            return r + a.lastPrice;
        }, 0);
        return totalPrecioTiendas;
    };

    useEffect(() => {
        setTotalPrecio(getTotalProductos());
    }, []);


  return (
    <View style={styles.container}>
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{storeName}</Text>
            <Text>Total: ${totalPrecio}.00</Text>
        </View>
        {value && (
                <FlatList
                    data={value}
                    renderItem={({ item }) => <CompareProductItem product={item} />}
                    keyExtractor={item => item.nombre}
                />
            )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 24,
    },
    titleContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
