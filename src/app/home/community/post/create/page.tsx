'use client';

import ChoosePet from '@/components/community/ChoosePet';
import Input from '@/components/shared/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { postState } from '@/state/postState';
import PostImageUpload from '@/components/community/PostImageUpload';
import CreatePostActions from './actions';

const PostCreate = () => {
  const router = useRouter();
  const [isFor, setIsFor] = useState<string>('');
  const [petname, setPetname] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { data: session } = useSession();
  const user = session?.user;
  const userId = Number(user?.id);

  const [post, setPost] = useRecoilState(postState);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsFor(value);
    if (value === '견주') setPetname(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 상태를 덮어쓰는 방식으로 수정
    setPost((prev) => ({
      ...prev,
      title: title,
      content: content,
      isFor: isFor,
    }));

    console.log('psost', post);

    try {
      await CreatePostActions(post, userId);
      router.push('/home/community');
    } catch (error) {
      console.error('게시글 생성 중 오류:', error);
    }
  };

  return (
    <div className="pt-10 w-full flex flex-col justify-center items-center bg-lightPinkbg p-5">
      <form className="flex flex-col gap-4 lg:w-1/3 xl:w-1/3 p-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-xl font-bold">무엇이 고민이신가요?</h2>
        </div>

        <div className="flex flex-row justify-center items-center gap-4">
          <label className="flex items-center">
            <input type="radio" name="isFor" value="견주" className="mr-2" onChange={handleRadioChange} />
            견주
          </label>
          <label className="flex items-center">
            <input type="radio" name="isFor" value="애완견" className="mr-2" onChange={handleRadioChange} />
            애완견
          </label>
        </div>

        {isFor === '애완견' && <ChoosePet />}
        <PostImageUpload />
        <Input type="text" name="title" onChange={(e) => setTitle(e.target.value)} placeholder="제목을 입력해주세요" />

        <textarea
          onChange={(e) => setContent(e.target.value)}
          name="content"
          placeholder="고민을 적어주세요"
          className="p-5 border border-gray-300 rounded-2xl focus:outline-none focus:ring-1 focus:ring-darkPink focus:border-darkPink transition duration-300 ease-in-out w-full"
          rows={5}></textarea>

        {/* 버튼 */}
        <div className="flex justify-between gap-4">
          <button
            className="w-1/3 flex items-center justify-center bg-lightPink rounded-l-xl py-2"
            type="button"
            onClick={() => router.back()}>
            이전
          </button>
          <button
            className="w-2/3 flex items-center justify-center bg-darkPink text-white rounded-r-xl py-2"
            type="submit">
            완료
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostCreate;
