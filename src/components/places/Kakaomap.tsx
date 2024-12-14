import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import Modal from './Modal';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/outline'; // XMark 아이콘 추가

const KEYWORD_LIST = [
  { id: 1, value: '애견카페', emoji: '☕️' },
  { id: 2, value: '동물병원', emoji: '🧑‍⚕️' },
  { id: 3, value: '애견호텔', emoji: '🏨' },
];

export interface Place {
  id: string;
  name: string;
  address: string;
  x: string;
  y: string;
  phone: string | undefined;
}

interface KakaoPlace {
  id: string;
  place_name: string;
  address_name: string;
  road_address_name?: string;
  x: string;
  y: string;
  phone: string | undefined;
}

interface MarkerPosition {
  lat: number;
  lng: number;
  name: string;
  address: string; // address 추가
  phone?: string;
}

const Kakao = () => {
  const [search, setSearch] = useState<Place[]>([]);
  const [kakao, setKakao] = useState<typeof window.kakao | null>(null);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const [state, setState] = useState({
    center: { lat: 33.450701, lng: 126.570667 },
    errMsg: null,
    isLoading: true,
  });
  const [selectedMarker, setSelectedMarker] = useState<MarkerPosition | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [openMarkerId, setOpenMarkerId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<MarkerPosition | null>(null);
  const [isCurrentLocationVisible, setIsCurrentLocationVisible] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src =
      '//dapi.kakao.com/v2/maps/sdk.js?appkey=acf4479a39c6800a7a112e1e85028978&libraries=services&autoload=false';
    document.head.appendChild(script);

    script.addEventListener('load', () => {
      if (window.kakao && window.kakao.maps) {
        setKakao(window.kakao);
        setIsKakaoLoaded(true);
        setState((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
    });

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: null,
            isLoading: false,
          }));
        },
      );
    }
  }, []);

  const handleKeywordSearch = (keyword: string, center: { lat: number; lng: number }) => {
    if (!isKakaoLoaded || !kakao || !kakao.maps || !kakao.maps.services) {
      return;
    }

    const ps = new kakao.maps.services.Places();
    const options = {
      location: new kakao.maps.LatLng(center.lat, center.lng),
      radius: 4000,
    };

    ps.keywordSearch(
      keyword,
      (data: KakaoPlace[], status: string) => {
        if (status === kakao.maps.services.Status.OK) {
          const places = data.map((place) => ({
            id: place.id,
            name: place.place_name,
            address: place.address_name,
            x: place.x,
            y: place.y,
            phone: place.phone,
          }));
          setSearch(places);
        }
      },
      options,
    );
  };

  const handleMarkerClick = (marker: MarkerPosition) => {
    setSelectedMarker(marker);
  };

  const handleSearchResultClick = (place: Place) => {
    const markerPosition = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
      name: place.name,
      address: place.address, // address 추가
      phone: place.phone,
    };

    setSelectedLocation(markerPosition);
    setSelectedMarker(markerPosition);
    setIsModalOpen(false);
  };

  const moveLatLng = (place: Place) => {
    const newCenter = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
    };
    setState((prev) => ({ ...prev, center: newCenter }));
    setSelectedMarker({
      lat: newCenter.lat,
      lng: newCenter.lng,
      name: place.name,
      address: place.address, // address 추가
      phone: place.phone,
    });
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-center items-start gap-6">
        <div className="flex flex-col gap-2 justify-center items-center relative">
          <Map
            center={selectedLocation || state.center}
            className="w-[1000px] h-[600px] rounded-lg shadow-md"
            level={3}>
            {isCurrentLocationVisible && (
              <MapMarker
                position={state.center}
                image={{
                  src: 'https://velog.velcdn.com/images/leeeee/post/4f0de3cf-1cfe-4db2-9afc-c900e030516d/image.png',
                  size: {
                    width: 50,
                    height: 50,
                  },
                }}
              />
            )}

            {search.map((data) => {
              const markerPosition = {
                name: data.name,
                lat: parseFloat(data.y),
                lng: parseFloat(data.x),
                address: data.address, // address 추가
              };

              return (
                <MapMarker
                  key={data.id}
                  position={markerPosition}
                  image={{
                    src: 'https://cdn-icons-png.flaticon.com/128/2098/2098567.png',
                    size: { width: 35, height: 35 },
                  }}
                  onClick={() => handleMarkerClick(markerPosition)}
                />
              );
            })}

            {selectedMarker && (
              <CustomOverlayMap position={selectedMarker} yAnchor={1}>
                <div className="bg-white p-2 rounded shadow-lg text-center z-10">
                  <p className="font-bold">{selectedMarker.name}</p>
                  <p className="text-sm text-gray-600">{selectedMarker.address}</p> {/* address 표시 */}
                </div>
              </CustomOverlayMap>
            )}
          </Map>

          <div
            className="absolute top-1/2 left-0 z-50 transform -translate-y-1/2 p-2 rounded-full cursor-pointer"
            onClick={toggleModal}>
            <ChevronRightIcon className="w-6 h-6 text-red-600" />
          </div>

          {/* Modal 컴포넌트 */}
          {isModalOpen && (
            <div className="absolute top-0 left-0  shadow-md z-20 transition-transform transform translate-x-0">
              <Modal
                search={search}
                openMarkerId={openMarkerId}
                setOpenMarkerId={setOpenMarkerId}
                moveLatLng={moveLatLng}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
          <div className="flex flex-row gap-2 mt-4">
            {KEYWORD_LIST.map((keywordObj) => (
              <button
                key={keywordObj.id}
                type="button"
                className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-400"
                onClick={() => handleKeywordSearch(keywordObj.value, state.center)}>
                {keywordObj.value + keywordObj.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kakao;
