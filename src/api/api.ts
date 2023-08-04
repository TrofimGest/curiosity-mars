import axios, {AxiosError} from 'axios';

import {IPhoto} from '@/types/types';

const API_KEY = process.env.EXPO_PUBLIC_API_KEY ?? 'DEMO_KEY';
const BASE_URL = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=${API_KEY}`;

type GetPhotosType = {
  photos: IPhoto[];
};

export const getPhotos = async (
  date: string,
  camera: string,
): Promise<GetPhotosType | undefined> => {
  try {
    const res = await axios.get(
      `${BASE_URL}&earth_date=${date}&camera=${camera}&`,
    );
    return res.data;
  } catch (err) {
    const errors = err as Error | AxiosError;
    if (!axios.isAxiosError(errors)) {
      console.log(errors);
    }
    console.log(errors);
  }
};
