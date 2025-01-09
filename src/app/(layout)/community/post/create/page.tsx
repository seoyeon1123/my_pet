'use client';

import ChoosePet from '@/components/community/ChoosePet';
import Input from '@/components/shared/Input';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { IPostProps, postState } from '@/state/postState';
import PostImageUpload from '@/components/community/PostImageUpload';
import CreatePostActions from './actions';
import { useMutation } from 'react-query';

const PostCreate = () => {
  const router = useRouter();
  const [isFor, setIsFor] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const { data: session } = useSession();
  const user = session?.user;
  const userId = Number(user?.id);

  const post = useRecoilValue(postState);

  const mutation = useMutation(
    async (postData: IPostProps) => {
      await CreatePostActions(postData, userId);
    },
    {
      onSuccess: () => {
        router.push('/community');
      },
      onError: (error) => {
        console.error('Failed to create post:', error);
      },
    },
  );

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsFor(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필요한 데이터를 명시적으로 생성
    const postData: IPostProps = {
      ...post,
      title: title,
      content: content,
      isFor: isFor,
      petname: isFor === '견주' ? '' : post.petname,
      petId: isFor === '견주' ? '' : post.petId,
    };

    // mutation 호출 시 명시적으로 생성한 데이터를 전달
    await mutation.mutateAsync(postData);
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
