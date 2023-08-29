import { useContext } from 'react';
import { AxiosContext } from '../../context/AxiosContext';

const API_URL = '/carrito';

export function useCartService() {
	const { authAxios } = useContext(AxiosContext);

	const getUserCart = (userId) => {
		let url = API_URL + '/' + userId;
		return authAxios.get(url);
	};

	const addProductToCart = (userId, productId) => {
		let url = API_URL + '/' + userId + '/' + productId;
		return authAxios.post(url, null);
	};

	const deleteProductFromCart = async (userId, productId) => {
		let url = API_URL + '/' + userId + '/' + productId;
		return authAxios.delete(url);
	};

	return {getUserCart, addProductToCart, deleteProductFromCart};
}

