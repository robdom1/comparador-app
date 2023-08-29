import { useContext } from 'react';
import { AxiosContext } from '../../context/AxiosContext';

const API_URL = '/ruta';

export function useRoutesService() {
	const { authAxios } = useContext(AxiosContext);

	const getRoute = (latitude, longitude) => {
		let url = API_URL;
        var bodyFormData = new FormData();
        bodyFormData.append('latitud', latitude);
        bodyFormData.append('longitud', longitude);


        return authAxios.post(url, bodyFormData, {headers: { "Content-Type": "multipart/form-data" }},);
	};


	return {getRoute};
}
