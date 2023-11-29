'use client'
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_POSTS } from '@/graphql/queries';
import PostCard from '@/components/ui/PostCard';
import Button from "@/components/Button";
import { RiHeartAddLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import { Post } from '@/lib/types/types';
import Loading from '@/components/ui/Loading';
import { formatTime } from '@/helpers/helpers';


const UserPostPage = () => {
  const { loading, error, data } = useQuery(GET_ALL_POSTS);
  const router = useRouter();

  function extractImageUrlFromContent(content: string) {
    // Regular expression to match Markdown image syntax
    const regex = /!\[.*?\]\((.*?)\)/;
    const matches = content.match(regex);

    // If matches found, return the first captured group, which is the URL
    if (matches && matches[1]) {
      return matches[1];
    }

    // If no matches, return a default image or an empty stringgtrf
    return '';
  }

  function removeImageUrlFromContent(content: string) {
    // Regular expression to match Markdown image syntax
    const regex = /!\[.*?\]\(.*?\)/g;
    return content.replace(regex, '').trim();
  }

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <>
      <div className='pb-5 flex justify-end'>
        <Button className='p-2 rounded-md text-sm border bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white'
          onClick={() => router.push('/add')}>
          <div className='flex items-center gap-2'>
            <RiHeartAddLine />Send Kudos ✨</div>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.posts.map((post: Post) => (
          <PostCard
            key={post.id}
            authorName={post.author.name}
            authorImage={post.author.image || 'default-avatar-url'}
            postImage={extractImageUrlFromContent(post.content)}
            recipient={post.recipient.name}
            content={removeImageUrlFromContent(post.content)}
            postTime={formatTime(post.createdAt)}
          />
        ))}
      </div>
    </>
  );
};

export default UserPostPage;
