import { Button, Image, ListItem, Text } from '@rneui/base';
import React, {useContext, useEffect, useState} from 'react'
import { SafeAreaView, StyleSheet, View, FlatList, Pressable } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import cartService from '../../hooks/services/useCartService';
import Toast from 'react-native-simple-toast';


export default function CartProductItem({item, deleteProductFromCart}) {

    const handleDeleteProductFromCart = () => {
        let productId = item.id;
        deleteProductFromCart(productId);
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
            <Button color={"white"} onPress={handleDeleteProductFromCart}>
                <FontAwesome5 name='trash-alt' color={"red"} size={20}/>
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
