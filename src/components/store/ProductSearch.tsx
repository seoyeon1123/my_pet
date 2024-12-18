'use client';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { IPetStore } from './ProductList';

interface ProductSearchFormProps {
  setProducts: (products: IPetStore[]) => void;
  setQuery: (query: string) => void;
}

export default function ProductSearchForm({ setProducts, setQuery }: ProductSearchFormProps) {
  const [product, setProduct] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.trim()) {
      console.error('검색어가 비어있습니다.');
      return;
    }
    try {
      setProducts([]);
      setQuery(product);
    } catch (error) {
      console.error('제품 검색 중 오류 발생:', error);
    }
  };

  return (
    <form className="flex flex-row justify-center items-center mb-4" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="검색할 상품을 입력해주세요"
        required
        name="product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="px-5 py-1 rounded-full border-[#78B3CE] focus:ring-2 focus:ring-[#78B3CE] transition-all duration-200 ease-in-out focus:outline-none w-72"
      />
      <button type="submit">
        <MagnifyingGlassCircleIcon className="size-8 text-[#78B3CE] ml-2" />
      </button>
    </form>
  );
}
