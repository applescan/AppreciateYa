'use client'
import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS_BY_ORG } from '@/graphql/queries';
import PostCard from '@/components/ui/PostCard';
import Button from "@/components/Button";
import { RiHeartAddLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import { Post } from '@/lib/types/types';
import Loading from '@/components/ui/Loading';
import { capitalizeEachWord, countGiftCards, extractImageUrlFromContent, formatTime, removeImageUrlFromContent } from '@/helpers/helpers';
import { useSession } from 'next-auth/react';
import { Card } from '@/components/ui/Card';
import CoffeeChart from '@/components/CoffeeCharts';
import ThankYouChart from '@/components/ThankYouCharts';
import GiftCharts from '@/components/GiftCharts';
import FilterDropdown from '@/components/FilterDropdown';

const UserPostPage = () => {
  const { data: sessionData } = useSession();
  const currentOrgId = parseInt(sessionData?.user?.orgId);
  const [selectedFilter, setSelectedFilter] = useState('MONTH');

  const { loading, error, data, refetch } = useQuery(GET_ALL_POSTS_BY_ORG, {
    variables: { orgId: currentOrgId, filter: { type: selectedFilter } },
  });

  const router = useRouter();

  const [thanksCards, setThanksCards] = useState({ card1: 0, card2: 0, card3: 0 });
  const [giftCards, setGiftCards] = useState({ card4: 0, card5: 0, card6: 0 });
  const [coffeeCards, setCoffeeCards] = useState({ card7: 0, card8: 0, card9: 0 });


  const [totalCoffeeCards, setTotalCoffeeCards] = useState(0);
  const [totalGiftCards, setTotalGiftCards] = useState(0);
  const [totalThanksCards, setTotalThanksCards] = useState(0);



  useEffect(() => {
    if (data && data.postsByOrganizationId) {
      countGiftCards(data.postsByOrganizationId, setThanksCards, setTotalThanksCards, '/giftCards/1.png', '/giftCards/2.png', '/giftCards/3.png');
      countGiftCards(data.postsByOrganizationId, setGiftCards, setTotalGiftCards, '/giftCards/4.png', '/giftCards/5.png', '/giftCards/6.png');
      countGiftCards(data.postsByOrganizationId, setCoffeeCards, setTotalCoffeeCards, '/giftCards/7.png', '/giftCards/8.png', '/giftCards/9.png');
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;


  const handleFilterSelect = (value: string) => {
    const filterType = value
    setSelectedFilter(filterType);
    refetch({ orgId: currentOrgId, filter: { type: filterType } });
  };

  return (
    <>
      <div className='pb-5 flex justify-between'>
        <Button className='p-2 rounded-md text-sm border bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white'
          onClick={() => router.push('/add')}>
          <div className='flex items-center gap-2'>
            <RiHeartAddLine />Send Kudos</div>
        </Button>
        <div className='flex min-w-fit items-center gap-2'>
          <span className='text-gray-500 font-normal text-sm min-w-[55px]'>Filter by</span>
          <div className='w-[150px]'>
            <FilterDropdown handleFilterSelect={handleFilterSelect} selectedFilter={selectedFilter} />
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-4'>
        <h2 className='font-bold text-lg text-gray-900'>Overview</h2>
        <div className='flex w-full justify-between gap-8'>
          <Card className="mt-2 mb-4 w-full h-full flex items-center gap-2 justify-center border-0">
            <ThankYouChart thankYous={totalThanksCards} totalPost={data?.postsByOrganizationId.length} />
            <div className='flex gap-4 flex-col pr-6'>
              <h2 className='text-xl font-bold text-gray-800'>Thank yous</h2>
              <p className='text-5xl font-extrabold bg-clip-text  text-transparent bg-gradient-to-r from-purple-700 to-gray-800'>{totalThanksCards}/{data?.postsByOrganizationId.length}</p>
            </div>
          </Card>
          <Card className="mt-2 mb-4 w-full h-full flex items-center gap-2 justify-center border-0">
            <CoffeeChart coffees={totalCoffeeCards} totalPost={data?.postsByOrganizationId.length} />
            <div className='flex gap-4 flex-col pr-6'>
              <h2 className='text-xl font-bold text-gray-800'>Coffees</h2>
              <p className='text-5xl font-extrabold bg-clip-text  text-transparent bg-gradient-to-r from-purple-700 to-gray-800'>{totalCoffeeCards}/{data?.postsByOrganizationId.length}</p>
            </div>
          </Card>
          <Card className="mt-2 mb-4 w-full h-full flex items-center gap-2 justify-center border-0">
            <GiftCharts gifts={totalGiftCards} totalPost={data?.postsByOrganizationId.length} />
            <div className='flex gap-4 flex-col pr-6'>
              <h2 className='text-xl font-bold text-gray-800'>Vouchers</h2>
              <p className='text-5xl font-extrabold bg-clip-text  text-transparent bg-gradient-to-r from-purple-700 to-gray-800'>{totalGiftCards}/{data?.postsByOrganizationId.length}</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {data.postsByOrganizationId ? (
          data.postsByOrganizationId.map((post: Post) => (
            <PostCard
              key={post.id}
              postId={Number(post.id)}
              authorName={post.author.name}
              authorImage={post.author.image || 'default-avatar-url'}
              postImage={extractImageUrlFromContent(post.content)}
              recipient={post.recipient.name}
              content={removeImageUrlFromContent(post.content)}
              postTime={formatTime(post.createdAt)} edit={false} deletePost={false} />
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </>
  );
};

export default UserPostPage;
