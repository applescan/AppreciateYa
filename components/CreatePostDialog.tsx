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

    const [selectedRecipient, setSelectedRecipient] = useState({ id: '', name: '', recipientEmail: '', });
    const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

    const handleRecipientSelect = (userId: string, userName: string, email: string) => {
        setRecipientId(userId);
        setSelectedRecipient({ id: userId, name: userName, recipientEmail: email });
    };

    const resetForm = () => {
        setRecipientId('');
        setSelectedRecipient({ id: '', name: '', recipientEmail: '' })
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
                const response = await fetch('/api/email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: selectedRecipient.recipientEmail,
                        subject: 'You have received a new kudos!',
                        message: `
                        <div marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                        <!--100% body table-->
                        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                            style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                            <tr>
                                <td>
                                    <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                                        align="center" cellpadding="0" cellspacing="0">
                                        <tr>
                                            <td style="height:80px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center;">
                                              <a href="https://appreciateya.com" title="logo" target="_blank">
                                                <img width="100" src="https://res.cloudinary.com/dek61sfoh/image/upload/v1705564118/misc/bjtwdlwiwarrjvgjybct.png" title="logo" alt="logo">
                                              </a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:20px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                    style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                    <tr>
                                                        <td style="height:40px;">&nbsp;</td>
                                                    </tr>
                                                    <tr>
                                                        <td style="padding:0 35px;">
                                                            <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have received a new kudos</h1>
                                                            <span
                                                                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">You've received kudos from a coworker! This is a shout-out to your hard work and the positive difference you make in our team. Keep up the great work.
                                                            </p>
                                                            <a href="javascript:void(0);"
                                                                style="background:#ec4899;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">See your kudos</a>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td style="height:40px;">&nbsp;</td>
                                                    </tr>
                                                </table>
                                            </td>
                                        <tr>
                                            <td style="height:20px;">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:center;">
                                                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.appreciateya.com</strong></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="height:80px;">&nbsp;</td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                          
                        `,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to send email');
                }

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
                                            handleRecipientSelect(user.id, user.name, user.email);
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
