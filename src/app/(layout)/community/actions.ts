'use server';
import db from '@/lib/db';

const CommunityActions = async (isFor: string, type?: string) => {
  const getCommunity = await db.post.findMany({
    where: {
      isFor,
      ...(type && { pet: { type } }),
    },
    select: {
      id: true,
      title: true,
      content: true,
      imageUrl: true,
      petId: true,
      petName: true,
      updatedAt: true,
      pet: {
        select: {
          type: true,
        },
      },
      user: {
        select: {
          username: true,
        },
      },
    },
  });
  return getCommunity;
};

export const CommentCount = async (postId: number) => {
  const getCommentCount = await db.comment.count({
    where: {
      postId,
    },
  });

  return { postId, count: getCommentCount }; // postId와 count를 반환
};
export default CommunityActions;
