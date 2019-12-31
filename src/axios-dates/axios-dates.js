import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://sz-termin-app.firebaseio.com/'
});

export default instance;
