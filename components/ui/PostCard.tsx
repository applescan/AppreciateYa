import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';
import { capitalizeEachWord, getInitials } from '@/helpers/helpers';
import { Button } from './Button';
import EditPostDialog from '../EditPostDialog';
import { CiClock2 } from "react-icons/ci";

type PostCardProps = {
    postId: number;
    authorName: string;
    authorImage: string;
    postImage: string;
    recipient: string;
    content: string;
    postTime: React.ReactNode;
    edit?: boolean
    deletePost?: boolean
}

export default function PostCard({
    postId,
    authorName,
    authorImage,
    postImage,
    recipient,
    content,
    postTime,
    edit = false,
    deletePost = false
}: PostCardProps) {

    const [isEdit, setIsEdit] = useState(false)

    return (
        <div className="flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-xl bg-gray-100/30 text-gray-900">
            <div className="flex space-x-4 items-center">
                <Avatar className='w-12 h-12'>
                    <AvatarImage src={authorImage} />
                    <AvatarFallback>
                        {authorName ? getInitials(authorName) : 'NA'}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-1">
                    <span className="text-sm font-semibold">{capitalizeEachWord(authorName)}</span>
                    <span className="text-xs text-gray-600 flex gap-0.5 items-center">
                        <CiClock2 className='h-3 w-3' />
                        {postTime}
                    </span>
                </div>
            </div>
            <div>
                <img src={postImage} alt={recipient} height={100} width={200} className="object-cover w-full mb-4 bg-gray-500" />
                <span className="mb-1 text-lg font-medium text-purple-800"> To:</span><span className="mb-1 text-lg font-medium text-gray-800"> {recipient}</span>
                <p className="text-sm text-gray-800">{content}</p>
            </div>
            <div>
                <Button variant={'outline'} onClick={() => setIsEdit(true)} className={`${edit ? "" : "hidden"}`}>Edit</Button>
            </div>

            <EditPostDialog
                isOpen={isEdit}
                onOpenChange={setIsEdit}
                postId={postId}
                content={content}
                selectedImage={postImage}
            />
        </div>
    );
}
