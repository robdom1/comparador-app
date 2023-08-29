import { Button, Image, ListItem, Text } from '@rneui/base';
import React, {useContext, useEffect, useState} from 'react'
import { SafeAreaView, StyleSheet, View, FlatList, Pressable, ToastAndroid } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Toast from 'react-native-simple-toast';
import cartService, { useCartService } from '../../hooks/services/useCartService';

export default function HomeProductItem({item, userId}) {

    const { addProductToCart } = useCartService();

    const handleAddProductToCart = () => {
        let productId = item.id;
        addProductToCart(userId, productId)
            .then(res => {
                if (res?.data){
                    Toast.show(res.data, Toast.SHORT);
                }
            })
            .catch(e => {
                Toast.show(e.response.data, Toast.SHORT);
            });
    };

    return (
        <ListItem  
            Component={Pressable}
            // onPress={()=> Toast.show("klk", Toast.SHORT)}
            style={styles.item}>
            <Image
                style={styles.image}
                source={item.productos[0]?.image && item.productos[0].image.includes("//plazalama") ?
                    { uri: 'https:' + item.productos[0].image } :
                    { uri: item.productos[0].image }
                }
            />
            <ListItem.Content>
                <ListItem.Title style={styles.title}>{item.nombre}</ListItem.Title >
            </ListItem.Content>
            <Button color={"white"} onPress={handleAddProductToCart}>
                <FontAwesome5 name='cart-plus' color={"black"} size={20}/>
            </Button>
        </ListItem >
    );
}

const styles = StyleSheet.create({
    title: {
      fontSize: 16,
    },
    image: {
        height: 100,
        width: 100,
    },
});

