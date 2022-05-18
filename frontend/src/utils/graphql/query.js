import axios from 'axios';
import { getCookie } from 'react-use-cookie';

const query = async (query, variables) => {
  const response = await axios.post(
    'http://localhost:3001/query',
    { query, variables }
  );

  return response.data?.data;
};

export default query;
