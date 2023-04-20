import axios from 'axios';

const baseUrl = 'http://localhost:8081/api/filter/';

export const getFilteredRestos = async (body: any) => {
  const response = await axios({
    method: 'POST',
    url: baseUrl,
    data: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}
