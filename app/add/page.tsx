'use client'
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { GET_USERS } from '@/graphql/queries';
import CreatePostDialog from '@/components/CreatePostDialog';

const imageOptions = Array.from({ length: 16 }, (_, i) => `/giftCards/${i + 1}.png`);

export default function page() {
    const [selectedImage, setSelectedImage] = useState('');
    const [recipientId, setRecipientId] = useState('');
    const [content, setContent] = useState('');
    const [userOptions, setUserOptions] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { data: sessionData } = useSession();
    const user = sessionData?.user;
    const orgId = sessionData?.user.orgId
    const { data } = useQuery(GET_USERS);

    useEffect(() => {
        if (data) {
            setUserOptions(data.users);
        }
    }, [data]);

    const openDialog = (image: string) => {
        setSelectedImage(image);
        setIsDialogOpen(true);
    };

    return (
        <div className="my-4">
            <div className="grid grid-cols-4 gap-8 mb-6">
                {imageOptions.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Card ${index + 1}`}
                        className="w-full cursor-pointer rounded-2xl border-8 border-transparent"
                        onClick={() => openDialog(image)}
                    />
                ))}
            </div>
            <CreatePostDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                recipientId={recipientId}
                setRecipientId={setRecipientId}
                selectedImage={selectedImage}
                content={content}
                setContent={setContent}
                authorId={user?.id ?? ''}
                orgId={orgId}
                filter={'MONTH'} />
        </div>
    );
}
