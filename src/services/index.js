import axios from "axios";

const apiService = {
  getRandomJoke: async () => {
    const response = await axios.get("https://api.chucknorris.io/jokes/random");
    return response?.data?.value;
  },
};

export default apiService;
