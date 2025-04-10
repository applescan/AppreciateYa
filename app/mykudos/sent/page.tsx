"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import {
  GET_POSTS_BY_SPECIFIC_AUTHOR,
  GET_USERS_BY_ORGANIZATION_ID,
} from "@/graphql/queries";
import PostCard from "@/components/ui/PostCard";
import Button from "@/components/Button";
import { RiHeartAddLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { Post, User } from "@/lib/types/types";
import Loading from "@/components/ui/Loading";
import {
  capitalizeEachWord,
  extractImageUrlFromContent,
  formatTime,
  removeImageUrlFromContent,
  topFansCount,
} from "@/helpers/helpers";
import { useSession } from "next-auth/react";
import { Card } from "@/components/ui/Card";
import FilterDropdown from "@/components/FilterDropdown";
import ErrorPage from "@/components/ui/Error";

const UserPostPage = () => {
  const { data: sessionData } = useSession();
  const currentOrgId = parseInt(sessionData?.user?.orgId);
  const currentUserId = parseInt(sessionData?.user?.id);
  const [selectedFilter, setSelectedFilter] = useState("YEAR");

  const { data: usersData, error: usersError } = useQuery<{
    usersByOrganizationId: User[];
  }>(GET_USERS_BY_ORGANIZATION_ID, {
    variables: { orgId: currentOrgId },
  });

  const { loading, error, data, refetch } = useQuery(
    GET_POSTS_BY_SPECIFIC_AUTHOR,
    {
      variables: {
        orgId: currentOrgId,
        authorId: currentUserId,
        filter: { type: selectedFilter },
      },
    },
  );

  const router = useRouter();

  if (loading || !data) return <Loading />;
  if (error || usersError) return <ErrorPage />;

  const handleFilterSelect = (value: string) => {
    const filterType = value;
    setSelectedFilter(filterType);
    refetch({ orgId: currentOrgId, filter: { type: filterType } });
  };

  const authorNames = data.postsBySpecificSender.map(
    (post: { recipient: { name: string } }) => post.recipient.name,
  );

  const topMVP = topFansCount(authorNames);

  return (
    <>
      <div className="pb-5 flex flex-col md:flex-row justify-between">
        <Button
          className="mb-4 md:mb-0 p-2 rounded-md text-sm border bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white"
          onClick={() => router.push("/add")}
        >
          <div className="flex items-center gap-2">
            <RiHeartAddLine />
            Send Kudos
          </div>
        </Button>
        <div className="flex items-center gap-2">
          <span className="text-gray-500 font-normal text-sm min-w-[55px]">
            Filter by
          </span>
          <div className="w-[150px]">
            <FilterDropdown
              handleFilterSelect={handleFilterSelect}
              selectedFilter={selectedFilter}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-8">
        <Card className="mt-2 px-6 mb-6 w-full h-full flex items-center gap-6 justify-center border-0">
          <div>
            {" "}
            <img
              src="/mvp.png"
              alt="mvp logo"
              height={100}
              width={100}
            ></img>{" "}
          </div>
          <div className="flex gap-2 flex-col pr-6">
            <h2 className="text-lg font-bold text-gray-800">
              Your MVP this {selectedFilter.toLocaleLowerCase()}
            </h2>
            <div className="p-0">
              {topMVP.length > 0 ? (
                topMVP.map((name) => (
                  <p className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-gray-800">
                    {capitalizeEachWord(name)}
                  </p>
                ))
              ) : (
                <p className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-gray-800">
                  Unknown
                </p>
              )}
            </div>
          </div>
        </Card>
        <Card className="mt-2 px-6 mb-6 w-full h-full flex items-center gap-6 justify-center border-0">
          <div>
            {" "}
            <img
              src="/kudos.png"
              alt="kudos logo"
              height={100}
              width={100}
            ></img>{" "}
          </div>
          <div className="flex gap-2 flex-col pr-6">
            <h2 className="text-lg font-bold text-gray-800">
              Total kudos delivered
            </h2>
            <p className="text-2xl font-extrabold bg-clip-text  text-transparent bg-gradient-to-r from-purple-700 to-gray-800">
              {data.postsBySpecificSender.length}
            </p>
          </div>
        </Card>
        <Card className="mt-2 px-6 mb-6 w-full h-full flex items-center gap-6 justify-center border-0">
          <div>
            {" "}
            <img
              src="/team.png"
              alt="team logo"
              height={100}
              width={100}
            ></img>{" "}
          </div>
          <div className="flex gap-2 flex-col pr-6">
            <h2 className="text-lg font-bold text-gray-800 flex justify-start">
              My Team
            </h2>
            <p className="text-2xl font-extrabold bg-clip-text  text-transparent bg-gradient-to-r from-purple-700 to-gray-800">
              {usersData?.usersByOrganizationId.length} people
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.postsBySpecificSender &&
          data.postsBySpecificSender.map((post: Post) => (
            <PostCard
              key={post.id}
              postId={Number(post.id)}
              authorName={post.author.name}
              authorImage={post.author.image || "default-avatar-url"}
              postImage={extractImageUrlFromContent(post.content)}
              recipient={post.recipient.name}
              content={removeImageUrlFromContent(post.content)}
              postTime={formatTime(post.createdAt)}
              edit={true}
              deletePost={true}
              refetch={refetch}
            />
          ))}
      </div>

      {data.postsBySpecificSender.length === 0 && (
        <div className="flex justify-center w-full py-10 h-56 my-auto item">
          <p className="font-semibold text-gray-400 flex justify-center items-center">
            It's empty in here, let's start posting!
          </p>
        </div>
      )}
    </>
  );
};

export default UserPostPage;
