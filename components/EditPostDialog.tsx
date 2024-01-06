'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_POST } from '@/graphql/mutations';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { capitalizeEachWord } from '@/helpers/helpers';

interface EditUserDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    postId: number
    content: string
    selectedImage: string;
}


const EditPostDialog: React.FC<EditUserDialogProps> = ({ isOpen, onOpenChange, postId, content, selectedImage }) => {
    const [editPostMutation] = useMutation(UPDATE_POST);

    const [editPostData, setEditPostData] = useState<{
        id: number;
        content: string;
    }>({
        id: postId,
        content: content,
    });

    const mutationVariables = useMemo(() => ({
        id: Number(postId),
        content: editPostData.content + `\n![image](${selectedImage})`,
    }), [postId, editPostData]);

    const handleEditUser = async () => {
        try {
            await editPostMutation({ variables: mutationVariables });
            onOpenChange(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setEditPostData({
            id: postId,
            content: content,
        });
    }, [postId, content]);


    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Edit Message</DialogTitle>
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleEditUser();
                    }}>


                        <img src={selectedImage} height={100} width={200} className="object-cover w-full mb-4 bg-gray-500" />

                        {/* Name field */}
                        <div className="mt-4">
                            <label htmlFor="editPost">Message</label>
                            <textarea
                                id="editPost"
                                value={editPostData.content}
                                onChange={(event) => {
                                    const { value } = event.target;
                                    setEditPostData(prev => ({ ...prev, content: value }));
                                }}
                                className="mt-1 block w-full py-2 px-3 border border-purple-800/30 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                          
                        </div>

                        {/* Submit and Cancel Buttons */}
                        <div className="mt-6 flex justify-between">
                            <div className='flex items-center gap-2'>
                                <Button onClick={() => onOpenChange(false)} variant={"outline"}>Cancel</Button>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Button type="submit">Update Message</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditPostDialog;