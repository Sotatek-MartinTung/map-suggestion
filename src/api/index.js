import axios from "axios";

const mainApi = axios.create({
  baseURL: "https://api.foursquare.com/v2/venues/",
});

export default mainApi;
