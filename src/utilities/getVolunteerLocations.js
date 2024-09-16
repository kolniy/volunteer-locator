import axios from "axios";

const getVolunteerLocations = async ({ lat, lng }) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      location: {
        lat,
        lng,
      },
      token: process.env.REACT_APP_TOKEN,
    });
    const url =
      "https://youtube-downloader-cli-app.onrender.com/api/v1/google/locator";
    const res = await axios.post(url, body, config);
    return res.data.results;
  } catch (error) {
    console.log(error);
    alert("Error Finding Locations");
    return [];
  }
};

export default getVolunteerLocations;
