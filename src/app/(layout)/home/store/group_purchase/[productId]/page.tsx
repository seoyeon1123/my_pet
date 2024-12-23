import GroupPurchaseDetail from '@/components/store/GroupPurchaseDetail';
import GroupPurchaseList from '@/components/store/GroupPurchaseList';

const GroupProductPage = ({ params }: { params: { productId: string } }) => {
  return (
    <>
      <div className="max-w-7xl mx-auto h-full mt-5 mb-10">
        <GroupPurchaseDetail productId={params.productId} />
        <hr className="border border-neutral-300 my-10" />
        <GroupPurchaseList productId={params.productId} />
      </div>
    </>
  );
};

export default GroupProductPage;
