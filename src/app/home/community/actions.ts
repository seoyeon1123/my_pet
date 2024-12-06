'use server';
import db from '@/lib/db';

const CommunityActions = async (isFor: string, type?: string) => {
  const getCommunity = await db.post.findMany({
    where: {
      isFor,
      ...(type && { pet: { type } }), // pet.type을 기준으로 필터링
    },
    select: {
      title: true,
      content: true,
      imageUrl: true,
      petId: true,
      petName: true,
      pet: {
        select: {
          type: true, // pet의 type 필드를 포함시켜 가져오기
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

export default CommunityActions;
