'use client';

import React, { useEffect, useState } from 'react';
import Input from '../shared/Input';
import Button from '../shared/Button';
import { useRecoilValue } from 'recoil';
import { placeState } from '@/state/PlaceState';
import { addPlaceReview, getPlaceReview } from '@/app/(layout)/home/places/actions';
import { useSession } from 'next-auth/react';

interface placeReview {
  rating: number;
  comment: string;
  placeId: number;
  placename: string;
  user: {
    username: string | null;
  };
}

const PetFriendlyPlace = () => {
  const [onClick, setOnClick] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const place = useRecoilValue(placeState);
  const { data: userData } = useSession();
  const [reviews, setReviews] = useState<placeReview[]>([]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  useEffect(() => {
    const getPlaceReviw = async () => {
      const placeReview = await getPlaceReview(Number(place.id));
      setReviews(placeReview);
    };

    getPlaceReviw();
  }, [place.id]);

  const handleAddPlaceReview = async () => {
    if (!userData?.user?.id) {
      alert('로그인 후 리뷰를 작성할 수 있습니다.');
      return;
    }

    const placeReview = await addPlaceReview({
      placeId: Number(place.id),
      userId: Number(userData.user.id),
      placename: place.name,
      rating: rating,
      comment: comment,
    });

    if (placeReview) {
      alert('리뷰가 성공적으로 추가되었습니다.');

      setRating(0);
      setComment('');

      const updatedReviews = await getPlaceReview(Number(place.id));
      setReviews(updatedReviews);

      setOnClick(false);
    } else {
      alert('리뷰 추가에 실패했습니다.');
    }
  };

  return (
    <>
      <div className="w-[1000px] xs:w-[330px] sm:w-[450px] md:w-[750px] flex flex-col p-3">
        <hr className="border border-b border-neutral-300 my-4" />
        <div className="flex flex-col w-full bp-6 mt-4 ">
          <div className="flex flex-row justify-between">
            <h2 className="text-3xl xs:text-base sm:text-base font-semibold text-gray-800">
              &quot;{place.name}&quot;에 대한 리뷰
            </h2>
            <button
              className="px-3 xs:text-sm sm:text-sm bg-[rgba(78,140,133,0.7)] text-white py-3 rounded-md hover:bg-[rgba(94,148,142,0.7)] transition duration-200"
              onClick={() => setOnClick(!onClick)}>
              리뷰 작성하기
            </button>
          </div>

          <div className="mb-2">
            {onClick && (
              <div className="mt-5 flex flex-col gap-3 bg-lightPink p-3 rounded-xl">
                <div className="flex space-x-1 mt-2 flex-row gap-2 justify-start items-center">
                  <span className="text-base text-gray-700 font-semibold">평점 :</span>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`cursor-pointer text-3xl transition-all duration-200 ease-in-out transform ${
                        index < rating ? 'text-yellow-400 scale-110' : 'text-gray-400'
                      } hover:text-yellow-500 hover:scale-110`}
                      onClick={() => handleRatingChange(index + 1)}>
                      {index < rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
                <Input
                  name="comment"
                  type="text"
                  placeholder="리뷰 내용을 입력해주세요!"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <Button type="button" description="저장" onClick={handleAddPlaceReview} />
              </div>
            )}
          </div>

          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="space-y-6 my-2">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-400">
                      {[...Array(5)].map((_, starIndex) => (
                        <span
                          key={starIndex}
                          className={`text-2xl ${starIndex < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                          {starIndex < review.rating ? '★' : '☆'}
                        </span>
                      ))}
                    </span>{' '}
                    <span className="text-gray-600 font-medium">{review.user.username}</span>
                  </div>
                  <p className="text-gray-800 text-lg">{review.comment}</p>
                </div>
                {index !== reviews.length - 1 && <hr className="border border-b border-neutral-200" />}
              </div>
            ))
          ) : (
            <>
              {!onClick && (
                <p className="text-2xl text-darkPink my-5 text-center">
                  리뷰가 없습니다! <br />
                  리뷰를 작성해주세요!
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PetFriendlyPlace;
