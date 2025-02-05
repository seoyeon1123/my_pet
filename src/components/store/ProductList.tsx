'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProduct } from '@/app/(layout)/store/actions';
import ProductSearchForm from './ProductSearch';
import { formatToWon, stripTags } from '@/lib/utils';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import { useSetRecoilState } from 'recoil';
import { storeState } from '@/state/storeState';
import Loading from '../Loading';
import LoadingSpinner from '../LoadingSpinner';

export interface IPetStore {
  link: string;
  image: string;
  thumbnail: string;
  title: string;
  lprice: string;
  mallName: string;
  productId: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
}

const ProductList = () => {
  const [product, setProducts] = useState<IPetStore[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('강아지 간식');
  const [hasMore, setHasMore] = useState(true); // 더 이상 로드할 데이터가 있는지 체크
  const setStoreState = useSetRecoilState(storeState);

  const fetchPets = async (page: number, query: string) => {
    try {
      setLoading(true);
      const offset = (page - 1) * 16;
      const petData = await getProduct({ query, offset });

      if (petData.length > 0) {
        setProducts((prevPets) => [...prevPets, ...petData]);
      } else {
        setHasMore(false); // 더 이상 데이터가 없으면 hasMore를 false로 설정
      }

      setLoading(false);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
      setLoading(false);
    }
  };

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && !loading && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, loading, hasMore]);

  useEffect(() => {
    fetchPets(page, query);
  }, [page, query]);

  useEffect(() => {
    setStoreState((prevState) => {
      if (!prevState.productId) {
        return {
          link: '',
          image: '',
          thumbnail: '',
          title: '',
          lprice: '',
          mallName: '',
          productId: '',
          category1: '',
          category2: '',
          category3: '',
          category4: '',
        };
      }
      return prevState;
    });
  }, []);

  const router = useRouter();

  const handleProductClick = (productId: string) => {
    const selectedProduct = product.find((pet) => pet.productId === productId);
    if (selectedProduct) {
      setStoreState({
        link: selectedProduct.link,
        image: selectedProduct.image,
        thumbnail: selectedProduct.thumbnail,
        title: selectedProduct.title,
        lprice: selectedProduct.lprice,
        mallName: selectedProduct.mallName,
        productId: selectedProduct.productId,
        category1: selectedProduct.category1,
        category2: selectedProduct.category2,
        category3: selectedProduct.category3,
        category4: selectedProduct.category4,
      });
      router.push(`/store/group_purchase/${productId}`);
    }
  };

  return (
    <div className="mx-auto p-4 max-w-7xl min-h-screen">
      <ProductSearchForm setProducts={setProducts} setQuery={setQuery} />

      {loading && page === 1 ? (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      ) : (
        product.length > 0 && (
          <ul className="grid grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-6">
            {product.map((pet, index) => (
              <li key={index} className="p-4">
                <div
                  onClick={() => handleProductClick(pet.productId)}
                  className="cursor-pointer flex flex-col justify-center items-center text-center">
                  <Image
                    src={pet.image}
                    alt={pet.title}
                    width={250}
                    height={250}
                    className="mb-4 rounded-xl aspect-square"
                  />
                  <div className="w-full flex flex-row gap-2 justify-start items-center mb-2 self-start xs:flex-col sm:flex-col">
                    <span className="text-xs text-white bg-darkPink rounded-xl px-1 py-0.5">{pet.category4}</span>
                    <span className="text-xs text-gray-500 xs:hidden sm:hidden"> | </span>
                    <span className="text-xs text-gray-500">판매처: {pet.mallName}</span>
                  </div>

                  <h3 className="text-lg xs:text-base sm:text-base font-semibold text-gray-800 mb-2">
                    {stripTags(pet.title)}
                  </h3>
                  <p className="text-base text-red-500 mb-2"> {formatToWon(pet.lprice)} </p>
                </div>
              </li>
            ))}
          </ul>
        )
      )}

      {loading && hasMore && page !== 1 && (
        <div className="flex justify-center items-center h-[60px]">
          <LoadingSpinner />
        </div>
      )}

      <div ref={ref} className="h-10" />
    </div>
  );
};

export default ProductList;
