'use client'
import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from "@apollo/client";
import { useSession } from 'next-auth/react';

const GET_USERS = gql`
  query Query {
    users {
      name
      id
      role
      organization {
        name
        posts {
          content
          author {
            name
          }
        }
      }
    }
  }
`;


const UsersPage = () => {
    const { loading, error, data } = useQuery(GET_USERS);
    const user = useSession()
    console.log(user.data?.user.role)
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Users</h2>
            {data.users.map((user : any) => (
                <div key={user.id} className="bg-white p-4 mb-6 rounded shadow">
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-500">ID: {user.role}</p>
                    <h4 className="mt-4 text-lg font-semibold">Organization</h4>
                    <p className="text-gray-700">Name: {user.organization.name}</p>
                    <h4 className="mt-4 text-lg font-semibold">Posts</h4>
                    {user.organization.posts.map((post : any, index : any) => (
                        <div key={index} className="bg-gray-100 p-3 rounded mt-3">
                            <p className="text-gray-700">Content: {post.content}</p>
                            <p className="text-gray-500">Author: {post.author.name}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default UsersPage;
