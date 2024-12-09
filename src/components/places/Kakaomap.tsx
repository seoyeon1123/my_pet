import React, { useEffect, useState } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const KEYWORD_LIST = [
  { id: 1, value: '애견카페', emoji: '☕️' },
  { id: 2, value: '동물병원', emoji: '🧑‍⚕️' },
  { id: 3, value: '애견호텔', emoji: '🏨' },
];

const Kakao = () => {
  const [search, setSearch] = useState<any[]>([]);
  const [kakao, setKakao] = useState<any>(null);
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);
  const [state, setState] = useState<{
    center: { lat: number; lng: number };
    errMsg: string | null;
    isLoading: boolean;
  }>({
    center: {
      lat: 33.450701,
      lng: 126.570667,
    },
    errMsg: null,
    isLoading: true,
  });

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
            errMsg: err.message,
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
      location: new kakao.maps.LatLng(center.lat, center.lng), // 현재 지도 중심
      radius: 5000, // 5km 반경
    };

    ps.keywordSearch(
      keyword,
      (data: any, status: any) => {
        if (status === kakao.maps.services.Status.OK) {
          const places = data.map((place: any) => ({
            id: place.id,
            x: place.x,
            y: place.y,
          }));
          setSearch(places);
        }
      },
      options,
    );
  };

  return (
    <>
      <Map
        center={state.center}
        className="w-[800px] h-[500px] rounded-lg"
        level={3}
        onCenterChanged={(map) => {
          const center = map.getCenter();
          setState((prev) => ({
            ...prev,
            center: {
              lat: center.getLat(),
              lng: center.getLng(),
            },
          }));
        }}>
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

        {/* 검색된 위치를 표시 */}
        {search.map((data) => (
          <MapMarker
            key={data.id}
            position={{
              lat: parseFloat(data.y),
              lng: parseFloat(data.x),
            }}
            image={{
              src: 'https://cdn-icons-png.flaticon.com/128/2098/2098567.png',
              size: {
                width: 35,
                height: 35,
              },
            }}
          />
        ))}

        <div className="flex flex-row">
          {KEYWORD_LIST.map((keywordObj) => (
            <button
              key={keywordObj.id}
              type="button"
              className="px-3 py-2 bg-darkPink text-white rounded-md hover:bg-lightPink"
              onClick={() => handleKeywordSearch(keywordObj.value, state.center)}>
              {keywordObj.value + keywordObj.emoji}
            </button>
          ))}
        </div>
      </Map>
    </>
  );
};

export default Kakao;
