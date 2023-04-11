import axios from 'axios'

const client = axios.create({ baseUrl: 'https://flexkim.herokuapp.com/api' })

export default client;
