import axios from "axios";

const API_URL = "https://6343dcad2dadea1175aebff4.mockapi.io";

const getClients = async () => {
  try {
    const clients = await axios.get(`${API_URL}/clients`);
    return clients.data;
  } catch (error) {
    console.log(error.message);
  }
}

const getClient = async (id) => {
  const clients = await axios.get(`${API_URL}/clients/${id}`);
  return clients.data;
}

const createClient = async (clientData) => {
  try {
    const clients = await axios.post(`${API_URL}/clients`, clientData);
    return clients.data;
  } catch (error) {
    console.log(error);
  }
}

const deleteClient = async (id) => {
  const clients = await axios.delete(`${API_URL}/clients/${id}`);
  return clients.data;
}

const clientsService = {
  getClients,
  getClient,
  createClient,
  deleteClient
}

export default clientsService;