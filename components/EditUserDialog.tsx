'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_USER, EDIT_USER } from '@/graphql/mutations';
import { Organization, User, UserRole } from '@/lib/types/types';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Input } from '@/components/ui/Input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/Dropdown";
import { Button } from '@/components/ui/Button';
import { capitalizeEachWord } from '@/helpers/helpers';

interface EditUserDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    user: User | null;
    organizations: Organization[];
    refetchUsers: () => void;
}


const EditUserDialog: React.FC<EditUserDialogProps> = ({ isOpen, onOpenChange, user, organizations, refetchUsers }) => {
    const [editUserMutation] = useMutation(EDIT_USER);
    const [deleteUserMutation] = useMutation(DELETE_USER);

    const [editUserData, setEditUserData] = useState<{
        name: string;
        email: string;
        password?: string;
        role: string;
        orgId: number | null;
    }>({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || '',
        orgId: Number(user?.organization?.id) || null,
    });

    const mutationVariables = useMemo(() => ({
        id: Number(user?.id),
        name: editUserData.name,
        email: editUserData.email,
        role: editUserData.role,
        orgId: editUserData.orgId,
    }), [user, editUserData]);

    const handleEditUser = async () => {
        try {
            await editUserMutation({ variables: mutationVariables });
            onOpenChange(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteUser = async () => {
        if (user && user.id) {
            try {
                await deleteUserMutation({ variables: { id: Number(user.id) } });
                onOpenChange(false);
                refetchUsers(); // Refetching the users after deletion.
            } catch (error) {
                console.error("Error deleting user:", error);
            }
        }
    };

    useEffect(() => {
        setEditUserData({
            name: user?.name || '',
            email: user?.email || '',
            role: user?.role || '',
            orgId: Number(user?.organization?.id) || null,
        });
    }, [user]);


    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                                        className={capitalizeEachWord(editUserData.role) ? '' : 'italic text-gray-400 font-light'}
                                    >
                                        {capitalizeEachWord(editUserData.role) || "Select Role"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[29rem]">
                                    {Object.keys(UserRole).map((key) => (
                                        <DropdownMenuItem key={key} onSelect={() => {
                                            const role = UserRole[key as keyof typeof UserRole];
                                            setEditUserData(prev => ({ ...prev, role }));
                                        }}>
                                            {capitalizeEachWord(key)}
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
                                        {
                                            editUserData.orgId !== null
                                                ? organizations.find(org => Number(org.id) === editUserData.orgId)?.name
                                                : "Select Organization"
                                        }
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[29rem]">
                                    {organizations.map((org) => (
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
                            <div>
                                <Button variant="outline" onClick={handleDeleteUser}>Delete User</Button>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Button onClick={() => onOpenChange(false)} variant={"outline"}>Cancel</Button>
                                <Button type="submit">Update User</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditUserDialog;