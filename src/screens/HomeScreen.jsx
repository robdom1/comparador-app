/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, FlatList, SafeAreaView, Platform } from 'react-native';
import { Button, SearchBar } from '@rneui/base';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useProductService } from '../hooks/services/useProductService';
import HomeProductItem from '../components/Home/HomeProductItem';
import { useIsFocused } from '@react-navigation/native';

function HomeScreen() {
	const { logout, userInfo } = useContext(AuthContext);
	const { getAllProducts } = useProductService();
	const [productsList, setProductsList] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const isFocused = useIsFocused();

	const fetchProducts = (page, query, callback) => {
		if (isLoading) {
			return;
		}

		setIsLoading(true);

		getAllProducts(page, query)
			.then(res => {
				if (res?.data) {
					callback(res.data);
				}
			})
			.catch(e => {
				console.error(e.response.data.message);
			});

		setIsLoading(false);
	};

	const fetchMore = () => {
		const nextPage = currentPage + 1;
		fetchProducts(nextPage, searchQuery, (data) => {
			setProductsList(prevData => [...prevData, ...data]);
			setCurrentPage(nextPage);
		});
	};

	const fetchInitialData = () => {
		fetchProducts(0, '', (data) => {
			setProductsList(data);
		});
	}

	useEffect(() => {
		fetchInitialData();
	}, []);

	useEffect(() => {
		fetchProducts(0, searchQuery, (data) => {
			setProductsList(data);
		});
	}, [searchQuery]);

	useEffect(() => {
        if (isFocused && !productsList) {
            fetchInitialData();
        }
    }, [isFocused]);

	return (
		<SafeAreaView style={styles.container}>
			<SearchBar
				platform={Platform.OS === 'android' ? 'android' : 'ios'}
				placeholder="Buscar..."
				onChangeText={setSearchQuery}
				value={searchQuery}
			/>
			<FlatList
				data={productsList}
				renderItem={({ item }) => <HomeProductItem item={item} userId={userInfo.id} />}
				keyExtractor={item => item.id}
				onEndReached={fetchMore}
				onEndReachedThreshold={0.1}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default HomeScreen;
