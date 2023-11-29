import React from 'react';

interface PostCardProps {
    authorName: string;
    authorImage: string;
    postImage: string;
    recipient: string;
    content: string;
    postTime: string;

}

export default function PostCard({
    authorName,
    authorImage,
    postImage,
    recipient,
    content,
    postTime,

}: PostCardProps) {

    return (
        <div className="flex flex-col p-6 space-y-6 overflow-hidden rounded-lg shadow-xl bg-gray-100/30 text-gray-900">
            <div className="flex space-x-4">
                <img alt={authorName} src={authorImage} className="object-cover w-12 h-12 rounded-full shadow bg-gray-500" />
                <div className="flex flex-col space-y-1">
                    <span className="text-sm font-semibold">{authorName}</span>
                    <span className="text-xs text-gray-400">{postTime}</span>
                </div>
            </div>
            <div>
                <img src={postImage} alt={recipient} height={100} width={200} className="object-cover w-full mb-4 bg-gray-500" />
                <span className="mb-1 text-lg font-medium text-purple-800"> To:</span><span className="mb-1 text-lg font-medium text-gray-800"> {recipient}</span>
                <p className="text-sm text-gray-800">{content}</p>
            </div>

        </div>
    );
}
