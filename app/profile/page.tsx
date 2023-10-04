'use client'
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_USER } from '@/graphql/mutations';
import { GET_USER_BY_ID } from '@/graphql/queries';
import { useSession } from 'next-auth/react';

export default function Page() {
    const { data: sessionData, status } = useSession();
    const user = sessionData?.user;
    const [editUser] = useMutation(EDIT_USER);
    const [imageUrl, setImageUrl] = useState(user?.image || "");
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();

    // Fetch user data based on their ID using GET_USER_BY_ID query
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { id: user?.id },
        skip: !user // Skip the query if user is not available
    });
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const currentUser = data?.user;
    console.log(currentUser)


    const handleOnChange = (changeEvent: { target: { files: Blob[]; }; }) => {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            setImageSrc(onLoadEvent.target.result);
            setUploadData(undefined);
        }

        reader.readAsDataURL(changeEvent.target.files[0]);
    }

    const handleOnSubmit = async (event: { preventDefault: () => void; currentTarget: any; }) => {
        event.preventDefault();

        const form = event.currentTarget;
        const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

        const formData = new FormData();

        for (const file of fileInput.files) {
            formData.append('file', file);
        }

        formData.append('upload_preset', 'profile');

        const data = await fetch('https://api.cloudinary.com/v1_1/dek61sfoh/image/upload', {
            method: 'POST',
            body: formData
        }).then(r => r.json());

        // After uploading to Cloudinary, update the user's image in the database.
        editUser({
            variables: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                orgId: user.orgId,
                image: data.secure_url
            }
        })
            .then(response => {
                setImageUrl(response.data.editUser.image);
            })
            .catch(error => {
                console.error('Error updating user with new image:', error);
            });

        setImageSrc(data.secure_url);
        setUploadData(data);
    }

    if (status === "loading") return <p>Loading...</p>;

    return (
        <div>
            <main>
                <h1>Profile: {currentUser.name}</h1>
                <p>Email: {currentUser.email}</p>
                <p>Role: {currentUser.role}</p>
                <img src={currentUser.image} alt="User profile" />


                <h1>Image Uploader</h1>
                <p>Upload your image to Cloudinary!</p>
                <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
                    <p>
                        <input type="file" name="file" />
                    </p>
                    <img src={imageSrc} alt="Selected for upload" />
                    {imageSrc && !uploadData && (
                        <p>
                            <button type="submit">Upload Files</button>
                        </p>
                    )}
                    {uploadData && (
                        <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
                    )}
                </form>
            </main>
        </div>
    );
}
