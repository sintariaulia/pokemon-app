import axios from "axios";
const baseURL = "https://tari-pokemon-server-production.up.railway.app"

export const client = axios.create({
  baseURL
})

client.interceptors.request.use((config) => {
  return config;
});

client.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error
  }
);