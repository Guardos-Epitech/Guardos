import axios from 'axios';

const baseUrl = 'http://localhost:8081/api/filter/';
const selectedURL = 'http://localhost:8081/api/filteredlist';

export const getFilteredRestos = async (body: any) => {
    try {
        const response = await axios({
            method: 'POST',
            url: baseUrl,
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error in getFilteredRestos: ${error}`);
        throw error;
    }
}

export const getSelectedFilteredRestos = async (body: any) => {
    try {
        const response = await axios({
            method: 'POST',
            url: selectedURL,
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error in getFilteredRestos: ${error}`);
        throw error;
    }
}