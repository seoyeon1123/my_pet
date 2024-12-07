import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { postState } from '@/state/postState';

const PostImageUpload = () => {
  const setPost = useSetRecoilState(postState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const uploadImageAndSavePet = async (file: File) => {
    const { data: session, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !session) {
      console.error('사용자 인증 실패:', sessionError!.message);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string); // 미리보기 설정
    };
    reader.readAsDataURL(file);

    const sanitizedFileName = file.name
      .replace(/ /g, '_')
      .replace(/[^\w\-._]+/g, '')
      .toLowerCase();
    const fileName = `${Date.now()}_${sanitizedFileName}`;

    const { data, error } = await supabase.storage.from('post-images').upload(`${fileName}`, file);

    if (error) {
      console.error('이미지 업로드 실패:', error.message);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from('post-images').getPublicUrl(data?.path || '');

    if (publicUrlData) {
      const publicURL = publicUrlData.publicUrl;
      setPost((prev) => ({
        ...prev,
        imageUrl: publicURL,
      }));
    } else {
      console.error('공개 URL을 가져오는 데 실패했습니다.');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      uploadImageAndSavePet(file);
    }
  };

  return (
    <div className="flex justify-center items-center mb-4">
      <div className="w-[300px] h-[300px] border-2 border-dashed border-gray-300 rounded-2xl flex justify-center items-center relative overflow-hidden">
        <input
          type="file"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {!imagePreview ? (
          <div className="flex flex-col justify-center items-center text-gray-500 text-center space-y-2">
            <PhotoIcon className="size-8" />
            <span>이미지 업로드</span>
          </div>
        ) : (
          <Image
            src={imagePreview}
            width={300}
            height={300}
            className="object-cover aspect-square rounded-lg"
            alt="Preview"
          />
        )}
      </div>
    </div>
  );
};

export default PostImageUpload;
