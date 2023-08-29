import { View, StyleSheet } from 'react-native'
import { Image, ListItem, Text } from '@rneui/base'
import React from 'react'

export default function CompareProductItem({product}) {
    console.log(product);
  return (
    <ListItem>
        <Image
                style={styles.image}
                source={product?.image && product.image.includes("//plazalama") ?
                    { uri: 'https:' + product.image } :
                    { uri: product.image }
                }
            />
        <ListItem.Content>
                <ListItem.Title style={styles.title}>{product.nombre}</ListItem.Title >
                <Text style={styles.title}>${product.historial[0].precio}.00</Text>
        </ListItem.Content>
    </ListItem>
  )
};

const styles = StyleSheet.create({
    title: {
      fontSize: 16,
    },
    image: {
        height: 100,
        width: 100,
    },
});