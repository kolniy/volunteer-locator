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
    });
    const url = "/api/v1/webhooks/google";
    const res = await axios.post(url, body, config);
    return res.data.results;
  } catch (error) {
    console.log(error);
    alert("Error Finding Locations");
    return [];
  }
};

export default getVolunteerLocations;
