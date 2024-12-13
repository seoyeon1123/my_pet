import React, { useEffect, useState } from 'react';
import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

const KEYWORD_LIST = [
  { id: 1, value: '애견카페', emoji: '☕️' },
  { id: 2, value: '동물병원', emoji: '🧑‍⚕️' },
  { id: 3, value: '애견호텔', emoji: '🏨' },
];

interface Place {
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
  phone?: string;
}

const Kakao = () => {
  const [search, setSearch] = useState<Place[]>([]);
  const [kakao, setKakao] = useState<typeof window.kakao | null>(null);
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

  const [selectedMarker, setSelectedMarker] = useState<MarkerPosition | null>(null);
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
          if (!isCurrentLocationVisible) {
            setIsCurrentLocationVisible(true);
          }
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
  }, [isCurrentLocationVisible]);

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
      phone: place.phone,
    };

    setSelectedLocation(markerPosition);
    setSelectedMarker(markerPosition);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row justify-center items-start gap-6">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Map center={selectedLocation || state.center} className="w-[800px] h-[500px] rounded-lg shadow-md" level={3}>
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
              };

              return (
                <MapMarker
                  key={data.id}
                  position={markerPosition}
                  image={{
                    src: 'https://cdn-icons-png.flaticon.com/128/2098/2098567.png',
                    size: {
                      width: 35,
                      height: 35,
                    },
                  }}
                  onClick={() => handleMarkerClick(markerPosition)}
                />
              );
            })}

            {selectedMarker && (
              <CustomOverlayMap position={selectedMarker} yAnchor={1}>
                <div className="bg-white p-2 rounded shadow-lg text-center z-10">
                  <p className="font-bold">{selectedMarker.name}</p>
                  <p className="text-sm text-gray-600">{selectedMarker.phone}</p>
                </div>
              </CustomOverlayMap>
            )}
          </Map>
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

        <div className="flex flex-col ml-4 w-[320px]">
          {search.length > 0 && (
            <div className="p-4 bg-white rounded-lg shadow-lg max-h-[500px] overflow-auto">
              <h3 className="text-lg font-semibold mb-3">검색 결과</h3>
              <ul className="divide-y divide-gray-200">
                {search.map((data) => (
                  <li
                    key={data.id}
                    className="p-4 cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md transition mb-2 shadow-sm"
                    onClick={() => handleSearchResultClick(data)}>
                    <div className="flex flex-col">
                      <span className="text-pink-600 font-medium">{data.name}</span>
                      <span className="text-gray-500 text-sm">{data.address}</span>
                      <span className="text-gray-400 text-xs mt-1">{data.phone}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kakao;
