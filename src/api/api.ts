import axios from 'axios';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? 'DEMO_KEY';
const BASE_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${API_KEY}`;

export const getPhotos = async (date: string, camera: string) => {
  try {
    const res = await axios.get(
      `${BASE_URL}&earth_date=${date}&camera=${camera}&`,
    );
    return res.data;
  } catch (e) {
    console.log('Error fetching pictures: ', e.message);
    return [];
  }
};
