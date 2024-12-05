'use server';

import db from '@/lib/db';
import { IPostProps } from '@/state/postState';

export const userPet = async (id: number) => {
  const pets = await db.pet.findMany({
    where: {
      user: {
        id,
      },
    },
    select: {
      id: true,
      name: true,
      type: true,
    },
  });
  return pets;
};

export const petId = async (name: string) => {
  const pets = await db.pet.findFirst({
    where: {
      name,
    },
    select: {
      id: true,
    },
  });
  return pets;
};

const CreatePostActions = async (post: IPostProps, userId: number) => {
  const data = {
    title: post.title,
    content: post.content,
    isFor: post.isFor,
    petname: post.petname,
    imageUrl: post.imageUrl,
    petId: post.petId,
  };

  console.log(data.content, data.imageUrl, data.isFor, data.petId, data.petname, data.title);

  if (!data.title || !data.content || !data.isFor) {
    throw new Error('필수 데이터가 누락되었습니다.');
  }
  const petid = Number(data.petId);

  const newPost = await db.post.create({
    data: {
      title: data.title,
      content: data.content,
      isFor: data.isFor,
      imageUrl: data.imageUrl,
      petName: data.petname,
      petId: petid,
      userId: userId,
    },
  });

  return newPost;
};

export default CreatePostActions;
