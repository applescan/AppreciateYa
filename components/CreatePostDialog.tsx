import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { Button } from '@/components/ui/Button';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_POST } from '@/graphql/mutations';
import { GET_USERS } from '@/graphql/queries';
import { User } from '@/lib/types/types';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup
} from "@/components/ui/Dropdown";

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
    const { data: usersData } = useQuery<{ users: User[] }>(GET_USERS);
    const [selectedRecipient, setSelectedRecipient] = useState({ id: '', name: 'Select Recipient' });
    const handleRecipientSelect = (userId: string, userName: string) => {
        setRecipientId(userId);
        setSelectedRecipient({ id: userId, name: userName });
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
                alert('Post created successfully!');
                onOpenChange(false);
            } catch (error) {
                console.error(error);
                alert('Failed to create post');
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
                            <Select onValueChange={(value) => {
                                const user = usersData?.users.find(user => user.id === value);
                                if (user && user.name) {
                                    handleRecipientSelect(user.id, user.name);
                                }
                            }}>
                                <SelectTrigger aria-label="Recipient">
                                    <SelectValue>{selectedRecipient.name}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {usersData?.users.map((user) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content:</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                        </div>

                        <Button type="submit">Create Post</Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default CreatePostDialog;
