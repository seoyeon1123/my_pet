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
  userId: number;
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
      userId: data.userId,
    },
  });

  return place;
};

interface IPlaceReviewProps {
  placeId: number;
  userId: number;
  rating: number;
  comment: string;
  placename: string;
}

export const addPlaceReview = async (data: IPlaceReviewProps) => {
  const placeReview = await db.review.create({
    data: {
      placename: data.placename,
      placeId: data.placeId,
      userId: data.userId,
      rating: data.rating,
      comment: data.comment,
    },
  });

  return placeReview;
};

export const getPlaceReview = async (placeId: number) => {
  const placeReview = await db.review.findMany({
    where: {
      placeId,
    },
    select: {
      user: {
        select: {
          username: true, // 사용자 이름
        },
      },
      placeId: true, // 장소 ID
      placename: true, // 장소 이름
      rating: true, // 별점
      comment: true, // 댓글
    },
  });

  return placeReview;
};

export default addPlace;
