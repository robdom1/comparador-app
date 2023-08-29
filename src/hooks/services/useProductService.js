import { useContext } from 'react';
import { AxiosContext } from '../../context/AxiosContext';

const API_URL = '/producto';
const PAGE_SIZE = 10;

export function useProductService() {
	const { authAxios } = useContext(AxiosContext);

	const getAllProducts = (page, query = '') => {
		let url = API_URL + `?page=${page}&size=${PAGE_SIZE}` + (query !== '' ? `&nombre=${query}` : '');
		return authAxios.get(url);
	};

	const getProductsCount = () => {
		let url = API_URL + '/count';
		return authAxios.get(url);
	};

	return {getAllProducts, getProductsCount};
}

