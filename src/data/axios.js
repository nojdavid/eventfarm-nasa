import axios from 'axios';
import qs from 'qs';

export default (state, {
  queries, rover
}) => {
	const method = 'GET';
  const apiRoot = process.env.REACT_APP_API_HOST;
  queries.api_key = process.env.REACT_APP_API_KEY;
  const query = qs.stringify(queries);

  const url = `${apiRoot}/${rover}/photos?${query}`;

  return axios({
    method,
    url
  })
    .then(res => res)
    .catch((err) => { throw err; });
};


