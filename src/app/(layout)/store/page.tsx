// PetStore.tsx
'use client';

import { useState } from 'react';
import SelectComponent from '@/components/places/SelectComponent';
import StoreBanner from '@/components/store/Banner';
import GroupPurchase from '@/components/store/GroupPurchase';
import ProductList from '@/components/store/ProductList';

const PetStore = () => {
  const [selectedOption, setSelectedOption] = useState<string>('store');

  return (
    <>
      <StoreBanner />
      <SelectComponent selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      {selectedOption === 'store' ? <ProductList /> : <GroupPurchase />}
    </>
  );
};

export default PetStore;
