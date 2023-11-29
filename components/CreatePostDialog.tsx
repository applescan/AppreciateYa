import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Button } from '@/components/ui/Button';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST } from '@/graphql/mutations';
import { GET_USERS_BY_ORGANIZATION_ID } from '@/graphql/queries';
import { User } from '@/lib/types/types';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup
} from "@/components/ui/Dropdown";
import PostSuccessDialog from './PostSuccessDialog';
import { Skeleton } from './ui/Skeleton';

interface CreatePostDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    recipientId: string;
    setRecipientId: (recipientId: string) => void;
    selectedImage: string;
    content: string;
    setContent: (content: string) => void;
    authorId: string;
    orgId: string;
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({ isOpen, onOpenChange, recipientId, setRecipientId, selectedImage, content, setContent, authorId, orgId }) => {
    const [createPost] = useMutation(CREATE_POST);
    const { data: usersData, loading: usersLoading, error: usersError } = useQuery<{ usersByOrganizationId: User[] }>(GET_USERS_BY_ORGANIZATION_ID, {
        variables: { orgId: parseInt(orgId) },
    });

    const [selectedRecipient, setSelectedRecipient] = useState({ id: '', name: '' });
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

    const handleRecipientSelect = (userId: string, userName: string) => {
        setRecipientId(userId);
        setSelectedRecipient({ id: userId, name: userName });
    };

    const resetForm = () => {
        setRecipientId('');
        setSelectedRecipient({ id: '', name: '' });
        setContent('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedImage && recipientId && content) {
            try {
                await createPost({
                    variables: {
                        content: content + `\n![image](${selectedImage})`,
                        authorId: parseInt(authorId),
                        orgId: parseInt(orgId),
                        recipientId: parseInt(recipientId),
                    },
                });
                resetForm()
                setIsSuccessDialogOpen(true);
            } catch (error) {
                console.error(error);
                alert('Failed to create post');
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    const handleClose = (isOpen: boolean) => {
        if (!isOpen) {
            resetForm();
        }
        onOpenChange(isOpen);
    };

    const handleSuccessDialogClose = () => {
        setIsSuccessDialogOpen(false);
        onOpenChange(false);
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={handleClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>What do you want to say?</DialogTitle>
                    </DialogHeader>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <img src={selectedImage} alt="Selected" className="w-full rounded-lg" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Select Recipient:</label>
                                {usersData ? (
                                    <Select onValueChange={(value) => {
                                        const user = usersData.usersByOrganizationId.find(user => user.id === value);
                                        if (user) {
                                            handleRecipientSelect(user.id, user.name);
                                        }
                                    }}>
                                        <SelectTrigger aria-label="Recipient">
                                            <SelectValue placeholder="Select Recipient">{selectedRecipient.name}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {usersData.usersByOrganizationId.map((user) => (
                                                    <SelectItem key={user.id} value={user.id}>
                                                        {user.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                ) : usersLoading ? (
                                    <Skeleton />
                                ) : usersError ? (
                                    <div>Error: {usersError.message}</div>
                                ) : null}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
                                <textarea
                                    id="content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    className="mt-1 block w-full py-2 px-3 border border-purple-800/30 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder='Give a shout-out, express thanks, or cheer on a teammate! Your kudos make a difference.'
                                />
                            </div>
                            <div className="flex justify-end">
                                <Button type="submit">Create Post</Button>
                            </div>
                        </form>
                    </div>
                </DialogContent >
            </Dialog >

            {/* Success Dialog */}
            < PostSuccessDialog isOpen={isSuccessDialogOpen} onOpenChange={handleSuccessDialogClose} />
        </>
    );
}

export default CreatePostDialog;
