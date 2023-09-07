'use client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { Organization, User, UserRole } from '@/lib/types/types';

const GET_USERS_AND_ORGANIZATIONS = gql`
  query Query {
    users {
      id
      name
      email
      role
      organization {
        id
        name
      }
    }
    organizations {
      id
      name
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($content: String!, $authorId: Int!, $orgId: Int!) {
    createPost(content: $content, authorId: $authorId, orgId: $orgId) {
      id
      content
    }
  }
`;

type FormData = {
  content: string;
  authorId: number;
  orgId: number;
};


interface UsersAndOrganizationsData {
  users: User[];
  organizations: Organization[];
}

const AdminPage: React.FC = () => {
  const { data: sessionData } = useSession();
  const { loading, error, data } = useQuery<UsersAndOrganizationsData>(GET_USERS_AND_ORGANIZATIONS);
  const [createPost] = useMutation(CREATE_POST);
  const [formData, setFormData] = useState<FormData>({ content: '', authorId: 0, orgId: 0 });
  const [createUserData, setCreateUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    orgId: null,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (sessionData?.user.role !== 'ADMIN') {
    return <p>You are not authorized to view this page!</p>;
  }

  const handleCreateUserInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const newValue = (name === 'orgId') ? (value ? parseInt(value, 10) : null) : value;
    setCreateUserData({ ...createUserData, [name]: newValue });
  };

  const handleCreateUserSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createUserData),
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result);
    } else {
      console.error('Error creating user:', response.status);
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    const newValue = (name === 'authorId' || name === 'orgId') ? parseInt(value, 10) : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const selectedUser = data?.users.find(user => Number(user.id) === formData.authorId);
    const orgId = selectedUser ? Number(selectedUser.organization.id) : 0;
    await createPost({ variables: { ...formData, orgId } });
  };
  
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="bg-white p-4 mb-6 rounded shadow">
        <h3 className="text-xl font-semibold">Create New Post</h3>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              className="w-full p-2 mt-2 border rounded"
              value={formData.content}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="authorId">Author</label>
            <select
              id="authorId"
              name="authorId"
              className="w-full p-2 mt-2 border rounded"
              value={formData.authorId}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled>Select author</option>
              {data?.users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="mt-6 p-2 bg-blue-500 text-white rounded">Create Post</button>
        </form>
      </div>

      <div className="bg-white p-4 mb-6 rounded shadow">
        <h3 className="text-xl font-semibold">Create New User</h3>
        <form onSubmit={handleCreateUserSubmit}>
          <div className="mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 mt-2 border rounded"
              value={createUserData.email}
              onChange={handleCreateUserInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 mt-2 border rounded"
              value={createUserData.password}
              onChange={handleCreateUserInputChange}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 mt-2 border rounded"
              value={createUserData.name}
              onChange={handleCreateUserInputChange}
              required
            />
          </div>

          <div className="mt-4">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              className="w-full p-2 mt-2 border rounded"
              value={createUserData.role}
              onChange={handleCreateUserInputChange}
              required
            >
              <option value="" disabled>Select role</option>
              {Object.keys(UserRole).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>


          <div className="mt-4">
            <label htmlFor="orgId">Organization</label>
            <select
              id="orgId"
              name="orgId"
              className="w-full p-2 mt-2 border rounded"
              value={createUserData.orgId || ''}
              onChange={handleCreateUserInputChange}
              required
            >
              <option value="" disabled>Select organization</option>
              {data?.organizations.map((org) => (
                <option key={org.id} value={org.id}>{org.name}</option>
              ))}
            </select>

          </div>
          <button type="submit" className="mt-6 p-2 bg-blue-500 text-white rounded">Create User</button>
        </form>
      </div>


      <div className="bg-white p-4 mb-6 rounded shadow">
        <h3 className="text-xl font-semibold">Users</h3>
        {data?.users.map((user) => (
          <div key={user.id} className="mt-4 border-b pb-4">
            <p className="text-gray-700">Name: {user.name}</p>
            <p className="text-gray-500">Email: {user.email}</p>
            <p className="text-gray-500">Role: {user.role}</p>
            <p className="text-gray-500">Organization: {user.organization.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage; 