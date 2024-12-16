import React from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { Place } from './Kakaomap';

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): string => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371; // 지구 반지름 (km)
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2) + ' km'; // 소수점 2자리까지
};

export interface ModalProps {
  search: Place[];
  openMarkerId: string | null;
  setOpenMarkerId: React.Dispatch<React.SetStateAction<string | null>>;
  moveLatLng: (place: Place) => void;
  pagination?: { last: number };
  currentPage: number;
  currentLocation: { lat: number; lng: number }; // 사용자 위치
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Modal = ({ search, openMarkerId, setOpenMarkerId, moveLatLng, currentLocation }: ModalProps) => {
  const handleShare = (place: Place) => {
    const defaultImageUrl =
      'https://velog.velcdn.com/images/leeeee/post/ab76b009-c886-4305-8adb-09abd4bd675a/image.png';

    if (window.Kakao && window.Kakao.Link) {
      window.Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: place.name,
          description: place.address,
          imageUrl: place.place_url
            ? `https://api.map.kakao.com/v2/maps/apis/places/${place.place_url}/image`
            : defaultImageUrl,
          link: {
            mobileWebUrl: 'http://localhost:3000', // 실제 URL로 변경
            webUrl: 'http://localhost:3000', // 실제 URL로 변경
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: 'http://localhost:3000', // 실제 URL로 변경
              webUrl: 'http://localhost:3000', // 실제 URL로 변경
            },
          },
        ],
      });
    } else {
      console.error('Kakao Link is not available');
    }
  };

  return (
    <div className="bg-white bg-opacity-40 rounded-lg shadow-lg w-[350px] h-[600px] overflow-y-auto absolute top-0 left-0 z-20">
      <ul className="flex flex-col gap-3 p-2">
        {search.map((place) => (
          <li
            key={place.id}
            onClick={() => {
              setOpenMarkerId(place.id);
              moveLatLng(place);
            }}
            className={`p-4 flex flex-row justify-between border-b cursor-pointer transition-colors duration-300 ease-in-out
            ${place.id === openMarkerId ? 'bg-lightPinkbg text-darkPink' : 'bg-lightPinkbg hover:bg-lightPinkbg'}`}>
            <div className="flex flex-col gap-2">
              <div>
                <h3 className="text-lg font-semibold">{place.name}</h3>
                {place.category_name && <p className="text-xs text-gray-400">{place.category_name}</p>}
              </div>
              <p className="text-sm text-gray-600">{place.address}</p>
              <p className="text-xs text-gray-500">{place.phone}</p>
              <p className="text-xs text-gray-500">
                {calculateDistance(currentLocation.lat, currentLocation.lng, parseFloat(place.y), parseFloat(place.x))}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleShare(place);
              }}>
              <ShareIcon className="size-5 text-black mt-2" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Modal;
