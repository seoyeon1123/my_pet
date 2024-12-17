import React from 'react';
import { Place } from '@/types/kakaomap.types';
import addPlace from '@/app/home/places/actions';
import { ShareIcon, BookmarkIcon } from '@heroicons/react/24/solid';

const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): string => {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2) + ' km';
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
            mobileWebUrl: 'http://localhost:3000',
            webUrl: 'http://localhost:3000',
          },
        },
        buttons: [
          {
            title: '자세히 보기',
            link: {
              mobileWebUrl: place.place_url,
              webUrl: place.place_url,
            },
          },
        ],
      });
    } else {
      console.error('Kakao Link is not available');
    }
  };

  const handleAddPlace = async (place: Place) => {
    const placeData = {
      name: place.name,
      address: place.address,
      category: place.category_name,
      phone: place.phone,
      placeUrl: place.place_url,
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
    };

    await addPlace(placeData);
    alert(`"${place.name}"를 즐겨찾기에 추가하였습니다 🫶`);
  };

  return (
    <div
      className="bg-white bg-opacity-70 rounded-lg shadow-lg w-[350px] h-[600px]
    xs:w-[180px] sm:w-[150px] md:w-[200px]
    overflow-y-auto absolute top-0 left-0 z-20">
      <ul className="flex flex-col gap-3 p-2">
        {search.map((place) => (
          <li
            key={place.id}
            onClick={() => {
              setOpenMarkerId(place.id);
              moveLatLng(place);
            }}
            className={`p-4 flex flex-row justify-between border-b  cursor-pointer transition-colors duration-300 ease-in-out
            ${place.id === openMarkerId ? 'bg-[#FFF7FC] text-darkPink' : 'bg-white bg-opacity-40 hover:bg-[#faf4f8]'}`}>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h3 className="text-lg xs:text-base font-semibold">{place.name}</h3>
                  {place.category_name && <p className="text-xs text-gray-400">{place.category_name}</p>}
                </div>
                <div className="flex flex-row gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(place);
                    }}>
                    <ShareIcon className="size-5 sm:size-3 xs:size-3 text-black mt-2" />
                  </button>
                  <BookmarkIcon
                    onClick={(e) => {
                      e.stopPropagation(); // 클릭 이벤트 전파 방지
                      handleAddPlace(place); // 클릭한 place만 저장
                    }}
                    className="w-5 h-5 sm:w-3 sm:h-3 xs:w-3 xs:h-3 text-darkPink active:text-lightPink mt-2"
                  />
                </div>
              </div>
              <p className="text-sm xs:text-xs  text-gray-600">{place.address}</p>
              <p className="text-xs  text-gray-500">{place.phone}</p>
              <p className="text-xs text-gray-500">
                {calculateDistance(currentLocation.lat, currentLocation.lng, parseFloat(place.y), parseFloat(place.x))}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Modal;
