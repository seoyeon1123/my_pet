import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';
import Modal from './Modal';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { KakaoPlace, MarkerPosition, Place } from '@/types/kakaomap.types';
import { useSetRecoilState } from 'recoil';
import { placeState } from '@/state/PlaceState';
import Loading from '../Loading';

const KEYWORD_LIST = [
  { id: 1, value: '애견카페', emoji: '☕️' },
  { id: 2, value: '애견미용실', emoji: '✂️' },
  { id: 3, value: '동물병원', emoji: '🏥' },
  { id: 4, value: '애견호텔', emoji: '🏨' },
];

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openMarkerId, setOpenMarkerId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<MarkerPosition | null>(null);
  const [isCurrentLocationVisible, setIsCurrentLocationVisible] = useState(false);

  const setPlace = useSetRecoilState(placeState);

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

  const [isFetchingLocation, setIsFetchingLocation] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      setIsFetchingLocation(true);
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
          setIsFetchingLocation(false);
          setIsCurrentLocationVisible(true);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsFetchingLocation(false);
        },
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setIsFetchingLocation(false);
    }
  }, []);

  const handleKeywordSearch = (keyword: string, center: { lat: number; lng: number }) => {
    if (!isKakaoLoaded || !kakao || !kakao.maps || !kakao.maps.services) {
      return;
    }
    setSearch([]);
    setSelectedMarker(null);
    setOpenMarkerId(null);

    const ps = new kakao.maps.services.Places();
    const options = {
      location: new kakao.maps.LatLng(center.lat, center.lng),
      radius: 10000,
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
            place_url: place.place_url,
            category_name: place.category_name || '카테고리 없음',
          }));
          setSearch(places);
        }
      },
      options,
    );
  };

  const handleMarkerClick = (marker: MarkerPosition) => {
    setSelectedMarker(marker);
    setOpenMarkerId(marker.name);

    setPlace({
      id: marker.id,
      name: marker.name,
      address: marker.address,
      phone: marker.phone || '전화번호 없음',
      placeUrl: marker.place_url || '',
      latitude: marker.lat,
      longitude: marker.lng,
      category: marker.category_name || '카테고리 없음',
    });
  };

  const moveLatLng = (place: Place) => {
    const newCenter = {
      lat: parseFloat(place.y),
      lng: parseFloat(place.x),
    };

    setPlace({
      id: place.id,
      name: place.name,
      address: place.address,
      category: place.category_name || '카테고리 없음',
      phone: place.phone || '전화번호 없음',
      placeUrl: place.place_url || '',
      latitude: parseFloat(place.y),
      longitude: parseFloat(place.x),
    });

    setSelectedMarker({
      id: place.id,
      lat: newCenter.lat,
      lng: newCenter.lng,
      name: place.name,
      address: place.address,
      phone: place.phone,
      place_url: place.place_url,
      category_name: place.category_name,
    });

    setSelectedLocation({
      id: place.id,
      lat: newCenter.lat,
      lng: newCenter.lng,
      name: place.name,
      address: place.address,
      phone: place.phone,
      place_url: place.place_url,
      category_name: place.category_name,
    });
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  }; // <-- Added the missing closing bracket here

  return (
    <div className="flex flex-col items-center ">
      <div className="flex flex-col justify-center items-start gap-6">
        <div
          className="flex flex-row gap-2 mt-4
          xs:grid xs:grid-cols-2 sm:grid sm:grid-cols-2">
          {KEYWORD_LIST.map((keywordObj) => (
            <button
              key={keywordObj.id}
              type="button"
              className="px-4 py-2 bg-darkPink text-white rounded-md hover:bg-mediumPink active:bg-mediumPink"
              onClick={() => handleKeywordSearch(keywordObj.value, state.center)}>
              {keywordObj.value + keywordObj.emoji}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center relative">
          {isKakaoLoaded ? (
            <Map
              center={selectedLocation || state.center}
              className="w-[1000px] 
            xs:w-[320px] sm:w-[450px] md:w-[750px]
            h-[600px] rounded-lg shadow-md relative"
              level={3}>
              {isFetchingLocation && (
                <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-30 z-10">
                  <p className="text-lg font-bold text-gray-700">현재 위치를 불러오는 중입니다...</p>
                </div>
              )}

              {isCurrentLocationVisible && (
                <MapMarker
                  position={state.center}
                  image={{
                    src: 'https://velog.velcdn.com/images/leeeee/post/4f0de3cf-1cfe-4db2-9afc-c900e030516d/image.png',
                    size: { width: 50, height: 50 },
                  }}
                />
              )}

              {search.map((data) => {
                const markerPosition: MarkerPosition = {
                  id: data.id, // id를 추가
                  name: data.name,
                  lat: parseFloat(data.y),
                  lng: parseFloat(data.x),
                  address: data.address,
                  place_url: data.place_url || '', // place_url을 추가
                  category_name: data.category_name, // 선택적으로 category_name도 추가
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
                  <div className="absolute -top-24 -left-20 bg-white p-2 rounded shadow-lg text-center z-10">
                    <p className="font-bold xs:text-sm sm:text-sm">{selectedMarker.name}</p>
                    <p className="text-xs text-gray-600">{selectedMarker.address}</p>
                  </div>
                </CustomOverlayMap>
              )}
            </Map>
          ) : (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          )}

          <div
            className="absolute top-1/2 -left-3 z-50 transform -translate-y-1/2 p-2 rounded-full cursor-pointer"
            onClick={toggleModal}>
            {isModalOpen ? (
              <ChevronLeftIcon className="size-7 font-bold text-red-600" />
            ) : (
              <ChevronRightIcon className="size-7 font-bold text-red-600" />
            )}
          </div>

          {isModalOpen && search.length > 0 && (
            <Modal
              search={search}
              openMarkerId={openMarkerId}
              setOpenMarkerId={setOpenMarkerId}
              moveLatLng={moveLatLng}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentLocation={state.center}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Kakao;
