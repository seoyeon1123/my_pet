'use client';

import { useState } from 'react';

interface Address {
  address_name: string;
}

const AddressSearch = () => {
  const [query, setQuery] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  // 주소 검색 함수
  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (!searchQuery) {
      setAddresses([]);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/search-address?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data.error) {
        setError('주소 검색에 실패했습니다.');
        setAddresses([]);
      } else {
        setAddresses(data.documents);
      }
    } catch {
      setError('주소 검색에 실패했습니다.');
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="주소를 입력하세요..."
        className="p-2 border border-gray-300 rounded"
      />
      {loading && <p>주소를 검색 중입니다...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-2">
        {addresses.map((address, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-200 p-2"
            onClick={() => alert(`선택된 주소: ${address.address_name}`)}>
            {address.address_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddressSearch;
