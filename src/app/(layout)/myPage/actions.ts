'use server';
import db from '@/lib/db';

export const MyPet = async (userId: number | null) => {
  if (!userId) {
    return [];
  }

  const myPet = await db.pet.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      imageUrl: true,
      name: true,
      type: true,
    },
  });

  return myPet;
};

export const MyCommunity = async (userId: number | null) => {
  if (!userId) {
    return [];
  }

  const myPost = await db.post.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      imageUrl: true,
      title: true,
      isFor: true,
      createdAt: true,
    },
  });

  return myPost;
};

export const MyPlace = async (userId: number | null) => {
  if (!userId) {
    return [];
  }

  const myPlace = await db.place.findMany({
    where: {
      userId,
    },
    select: {
      placeUrl: true,
      category: true,
      name: true,
      address: true,
      phone: true,
    },
  });

  return myPlace;
};

export const MyGroupPurchase = async (userId: number | null) => {
  if (!userId) {
    return [];
  }

  const myGroupPurchase = await db.groupPurchase.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      image: true,
      description: true,
      deadline: true,
      reason: true,
      productCategory: true,
      status: true,
    },
  });

  return myGroupPurchase;
};

export const MyJoinGroupPurchase = async (userId: number | null) => {
  if (!userId) {
    return [];
  }

  const myJoinGroupPurchase = await db.groupPurchase.findMany({
    where: {
      participants: {
        some: {
          userId,
        },
      },
    },
    select: {
      id: true,
      title: true,
      image: true,
      description: true,
      deadline: true,
      reason: true,
      productCategory: true,
      status: true,
    },
  });

  return myJoinGroupPurchase;
};
