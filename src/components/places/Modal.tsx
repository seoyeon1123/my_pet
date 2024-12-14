import Image from 'next/image';
import React from 'react';
import dog from '../../asserts/places/dogPlaces.png';
import { Place } from './Kakaomap';

export interface ModalProps {
  search: Place[];
  openMarkerId: string | null;
  setOpenMarkerId: React.Dispatch<React.SetStateAction<string | null>>;
  moveLatLng: (place: Place) => void;
  pagination?: { last: number };
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const Modal: React.FC<ModalProps> = ({ search, openMarkerId, setOpenMarkerId, moveLatLng, setCurrentPage }) => {
  return (
    <div className="w-96 bg-white rounded-lg shadow-lg h-[600px] overflow-y-auto absolute top-0 left-0 z-20">
      <ul className="flex flex-col gap-3 p-4">
        {search.map((place) => (
          <li
            key={place.id}
            onClick={() => {
              setOpenMarkerId(place.id); // 마커 ID만 설정
              moveLatLng(place); // 위치 이동
              // 모달을 닫는 로직은 제거
            }}
            className={`p-4 border-b cursor-pointer ${place.id === openMarkerId ? 'bg-gray-100' : 'hover:bg-gray-50'}`}>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">{place.name}</h3>
              <p className="text-sm text-gray-600">{place.address}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Modal;
