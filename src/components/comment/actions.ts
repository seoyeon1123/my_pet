'use server';

import db from '@/lib/db';

interface ICommentProps {
  content: string;
  postId: number; // postId는 Int 타입이므로, number로 설정
  userId: number; // userId도 Int 타입
}

const createComment = async (data: ICommentProps) => {
  try {
    const comment = await db.comment.create({
      data: {
        userId: data.userId,
        postId: data.postId,
        content: data.content,
      },
    });

    console.log(comment.content, comment.userId, comment.postId);
    return comment;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw new Error('댓글 생성 중 오류가 발생했습니다.');
  }
};

export const getComments = async (postId: number) => {
  const getComment = await db.comment.findMany({
    where: {
      postId,
    },
    select: {
      content: true,
      createdAt: true,
      userId: true,
      user: {
        select: {
          username: true,
        },
      },
      post: {
        select: {
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },
  });
  return getComment;
};

export default createComment;
