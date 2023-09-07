'use client'
import React, { useState, useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Organization, User, UserRole } from '@/lib/types/types';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/Dialog"
import { GET_USERS_AND_ORGANIZATIONS } from '@/graphql/queries';
import { EDIT_USER } from '@/graphql/mutations';
import { Input } from '@/components/ui/Input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/Dropdown"
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar"
import { capitalizeEachWord, getInitials } from '@/helpers/helpers';
import { MdOutlineBusiness, MdOutlineMailOutline, MdWorkOutline, MdEdit } from 'react-icons/md';
import CreateUserDialog from '@/components/CreateUserDialog';
import Loading from '@/components/ui/Loading';

interface AdminPageProps {
  sessionData: any;
}

interface UsersAndOrganizationsData {
  users: User[];
  organizations: Organization[];
}

const AdminPage: React.FC<AdminPageProps> = ({ sessionData }) => {
  const { loading, error, data } = useQuery<UsersAndOrganizationsData>(GET_USERS_AND_ORGANIZATIONS);
  const [editUserMutation, { error: mutationError }] = useMutation(EDIT_USER);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editUserData, setEditUserData] = useState<{
    name: string;
    email: string;
    password?: string;
    role: string;
    orgId: number | null;
  }>({
    name: '',
    email: '',
    role: '',
    orgId: null,
  });

  const mutationVariables = useMemo(() => ({
    id: Number(editingUser?.id),
    name: editUserData.name,
    email: editUserData.email,
    role: editUserData.role,
    orgId: editUserData.orgId,
  }), [editingUser, editUserData]);


  const handleEditUser = async () => {
    try {

      await editUserMutation({ variables: mutationVariables });
      setEditingUser(null);
      setIsEditDialogOpen(false);
      // You might want to update the users in your local state or refetch the GET_USERS_AND_ORGANIZATIONS query
    } catch (error) {
      console.error(error);
    }
  };

  // Somewhere in your component's effect or render logic:
  if (mutationError) {
    console.error(mutationError);
  }
  if (loading) return <Loading></Loading>;
  if (error) return <p>Error :(</p>;


  const handleDeleteUser = async () => {
    if (editingUser) {
      const response = await fetch(`/api/user/${editingUser.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Handle successful delete, maybe remove user from the UI or refresh list
        setEditingUser(null);
      } else {
        console.error('Error deleting user:', response.status);
      }
    }
  };


  return (
    <div className="container mx-auto px-4">
      <div className='flex justify-end gap-2 pb-4'>
        <CreateUserDialog data={data || { organizations: [] }} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.users.map((user) => (
          <Card key={user.id} className="mt-2 mb-4">
            <div className="flex items-center">
              <Avatar className='h-20 w-20 ml-5'>
                <AvatarImage src="" />
                <AvatarFallback className='text-2xl'>
                  {user?.name ? getInitials(user.name) : 'NA'}
                </AvatarFallback>
              </Avatar>
              <CardHeader>
                <div className='flex gap-2'>
                  <CardTitle>{capitalizeEachWord(user.name)}</CardTitle>
                  <MdEdit
                    className='cursor-pointer'
                    onClick={() => {
                      setEditingUser(user);
                      setEditUserData({
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        orgId: Number(user.organization.id)
                      });
                      setIsEditDialogOpen(true);
                    }}
                  />

                </div>
                <CardDescription>
                  <span className='text-xs flex gap-2 items-center'><MdOutlineMailOutline className='text-gray-600' /> {user.email}</span>
                  <span className='text-xs flex gap-2 items-center'><MdWorkOutline className='text-gray-600' />{capitalizeEachWord(user.role)}</span>
                  <span className='text-xs flex gap-2 items-center'><MdOutlineBusiness className='text-gray-600' />@{capitalizeEachWord(user.organization.name)}</span>
                </CardDescription>
              </CardHeader>
            </div>
          </Card>
        ))}

        {/* Display editing dialog if editingUser is set */}
        <Dialog open={isEditDialogOpen} onOpenChange={(isOpen) => setIsEditDialogOpen(isOpen)}>
          <DialogContent>
            <DialogTitle>Edit User</DialogTitle>
            <div>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleEditUser();
              }}>

                {/* Name field */}
                <div className="mt-4">
                  <label htmlFor="editName">Name</label>
                  <Input
                    type="text"
                    id="editName"
                    name="name"
                    placeholder='Type..'
                    className="w-full p-2 mt-2 border rounded"
                    value={editUserData.name}
                    onChange={(event) => {
                      const { name, value } = event.target;
                      setEditUserData(prev => ({ ...prev, [name]: value }));
                    }}

                  />
                </div>

                {/* Email field */}
                <div className="mt-4">
                  <label htmlFor="editEmail">Email</label>
                  <Input
                    type="email"
                    id="editEmail"
                    name="email"
                    placeholder='Type..'
                    className="w-full p-2 mt-2 border rounded"
                    value={editUserData.email}
                    onChange={(event) => {
                      const { name, value } = event.target;
                      setEditUserData(prev => ({ ...prev, [name]: value }));
                    }}

                  />
                </div>

                {/* Role Dropdown */}
                <div className="mt-4 flex flex-col">
                  <label htmlFor="editRole">Role</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={editUserData.role ? '' : 'italic text-gray-400 font-light'}
                      >
                        {editUserData.role || "Select Role"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[29rem]">
                      {Object.keys(UserRole).map((key) => (
                        <DropdownMenuItem key={key} onSelect={() => {
                          const role = UserRole[key as keyof typeof UserRole];
                          setEditUserData(prev => ({ ...prev, role }));
                        }}>
                          {key}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Organization Dropdown */}
                <div className="mt-4 flex flex-col">
                  <label htmlFor="editOrgId">Organization</label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={editUserData.orgId !== null ? 'text-left' : 'italic text-gray-400 font-light'}
                      >
                        {editUserData.orgId !== null ? data?.organizations.find(org => Number(org.id) === editUserData.orgId)?.name : "Select Organization"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[29rem]">
                      {data?.organizations.map((org) => (
                        <DropdownMenuItem key={org.id} onSelect={() => {
                          setEditUserData(prev => ({ ...prev, orgId: Number(org.id) }));
                        }}>
                          {org.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Submit and Cancel Buttons */}
                <div className="mt-6 flex justify-between">
                  <Button type="submit">Update User</Button>
                  <Button onClick={() => setIsEditDialogOpen(false)} variant={"outline"}>Cancel</Button>
                </div>

                {/* Optional: Delete User Button */}
                <div className="mt-6">
                  <Button onClick={handleDeleteUser} variant={"outline"}>Delete User</Button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div >
  );
};

export default AdminPage; 