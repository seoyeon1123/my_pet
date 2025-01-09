'use server';
import db from '@/lib/db';

const getPostDetail = async (id: number) => {
  const postDatail = await db.post.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      pet: {
        select: {
          type: true,
        },
      },
      user: {
        select: { username: true, id: true },
      },
      petName: true,
      isFor: true,
      createdAt: true,
      imageUrl: true,
    },
  });

  return postDatail;
};

export const deletePost = async (id: number) => {
  await db.post.delete({
    where: {
      id,
    },
  });
};

export default getPostDetail;
