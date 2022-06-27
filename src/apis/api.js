import axios from "axios";
import { isExpired } from "react-jwt";

const apis = {
  development: "https://testedailyapi.herokuapp.com/",
  production: "https://testedailyapi.herokuapp.com/",
};

// Pré-configurando a URL padrão do nosso backend em uma instância do Axios
const api = axios.create({
  baseURL: apis[process.env.NODE_ENV],
});

// Configura a instância do Axios para injetar o cabeçalho de autenticação antes de cada requisição
api.interceptors.request.use((config) => {
  // Verifica se já temos as informações do usuário logado no localStorage
  const storedUser = localStorage.getItem("loggedInUser");

  const loggedInUser = JSON.parse(storedUser || '""');

  if (isExpired(loggedInUser.token)) {
    localStorage.removeItem("loggedInUser");
  }

  if (loggedInUser.token) {
    config.headers = {
      Authorization: `Bearer ${loggedInUser.token}`,
    };
  }

  return config;
});

export default api;
