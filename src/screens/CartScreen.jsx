/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useCartService } from '../hooks/services/useCartService';
import CartProductItem from '../components/Cart/CartProductItem';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';


export default function CartScreen({navigation}) {
    const { logout, userInfo } = useContext(AuthContext);
    const { deleteProductFromCart, getUserCart } = useCartService();
    const [cart, setCart] = useState({});

    const isFocused = useIsFocused();

    const loadCart = () => {
        console.log('cart loaded');
        getUserCart(userInfo.id)
            .then(res => {
                if (res?.data) {
                    setCart(res.data);
                }
            })
            .catch(e => {
                if (!e?.response) {
                    console.error(`Error: ${e.message}`);
                    return;
                }
                var errorMessage = e.response.data.message;
                console.error(`Error ${e.response.status}: ${errorMessage} `);
                return;
            });
    };

    const handleDeleteProductFromCart = (productId) => {
        deleteProductFromCart(userInfo.id, productId)
            .then(res => {
                if (res?.data) {
                    Toast.show(res.data, Toast.SHORT);
                }
            })
            .catch(e => {
                if (!e?.response) {
                    console.error(`Error: ${e.message}`);
                    return;
                }
                var errorMessage = e.response.data.message;
                console.error(`Error: ${errorMessage}`);
                Toast.show(errorMessage, Toast.SHORT);
            })
            .finally(() => {
                loadCart();
            });
    };

    useEffect(() => {
        if (isFocused && userInfo?.id) {
            loadCart();
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={cart.products}
                renderItem={({ item }) => <CartProductItem item={item} deleteProductFromCart={handleDeleteProductFromCart} />}
                keyExtractor={item => item.id}
            />
            <Button title="Obtener Comparación" onPress={() => navigation.navigate("Compare", {productsParam: cart.products})} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
