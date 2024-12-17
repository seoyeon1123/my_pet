'use server';

import db from '@/lib/db';

interface IPlace {
  name: string;
  address: string;
  category: string | undefined;
  phone: string | undefined;
  placeUrl: string | undefined;
  latitude: number;
  longitude: number;
}

const addPlace = async (data: IPlace) => {
  const place = await db.place.create({
    data: {
      name: data.name,
      address: data.address,
      category: data.category!,
      phone: data.phone,
      placeUrl: data.placeUrl,
      latitude: data.latitude,
      longitude: data.longitude,
    },
  });

  return place;
};

export default addPlace;
