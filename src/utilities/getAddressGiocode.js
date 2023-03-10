import axios from "axios";

const getAddressGiocode = async (address) => {
  if (address.length === 0) return alert("Address cannot be empty.");
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );
    const coordinates = res.data.results[0].geometry.location;
    const { lat, lng } = coordinates;
    return { lat, lng };
  } catch (error) {
    console.log(error);
    alert("Error getting location");
    return { lat: 0, lng: 0 };
  }
};

export default getAddressGiocode;
