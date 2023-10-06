'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { EDIT_USER } from '@/graphql/mutations';
import { GET_USER_BY_ID } from '@/graphql/queries';
import { Input } from '@/components/ui/Input';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/Button';
import Loading from '@/components/ui/Loading';

export default function Page() {
    const { data: sessionData, status } = useSession();
    const user = sessionData?.user;
    const [editUser] = useMutation(EDIT_USER);
    const [imageUrl, setImageUrl] = useState(user?.image || "");
    const [imageSrc, setImageSrc] = useState();
    const [uploadData, setUploadData] = useState();
    const [editUserMutation] = useMutation(EDIT_USER);
    // Fetch user data based on their ID using GET_USER_BY_ID query
    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: { id: user?.id },
        skip: !user
    });

    console.log(data?.user?.organization.id)
    const [editUserData, setEditUserData] = useState<{
        name: string;
        email: string;
        password?: string;
        role: string;
        orgId: number;
    }>({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || '',
        orgId: Number(data?.user?.organization.id)
    });

    const mutationVariables = useMemo(() => ({
        id: Number(user?.id),
        name: editUserData.name,
        email: editUserData.email,
        role: editUserData.role,
        orgId: editUserData.orgId,
    }), [user, editUserData]);

    const handleEditUser = async () => {
        console.log("Editing user...");

        try {
            await editUserMutation({ variables: mutationVariables });
        } catch (error) {
            console.error(error);
        }
    };



    const currentUser = data?.user;

    useEffect(() => {
        // This ensures that when the current user data is fetched,
        // you're updating the role and orgId in your state.
        if (currentUser) {
            setEditUserData({
                name: currentUser?.name || '',
                email: currentUser?.email || '',
                role: currentUser?.role || '',
                orgId: Number(data?.user?.organization.id)
            });
        }
    }, [currentUser]);

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

    const handleDeletePicture = () => {
        editUser({
            variables: {
                id: user.id,
                image: null // Remove the image URL from the user's profile
            }
        })
            .then(response => {
                setImageUrl(null);
            })
            .catch(error => {
                console.error('Error deleting user image:', error);
            });
    }

    if (loading) return <Loading></Loading>;
    if (error) return <p>Error: {error.message}</p>;


    return (
        <div>
            <main>
                <p>Profile: {currentUser.name}</p>
                <p>Email: {currentUser.email}</p>
                <p>Role: {currentUser.role}</p>
                <img src={currentUser.image} alt="User profile" />

                {/* Delete Picture Button */}
                <button onClick={handleDeletePicture}>Delete Picture</button>

                <p>Upload your image to Cloudinary!</p>
                <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
                    <p>
                        <input type="file" name="file" />
                    </p>
                    {imageSrc && !uploadData && (
                        <p>
                            <button type="submit">Upload Files</button>
                        </p>
                    )}
                </form>

                {/* Profile Details Form */}
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

                    {/* Submit and Cancel Buttons */}
                    <div className="mt-6 flex justify-between">

                        <div className='flex items-center gap-2'>
                            <Button type="submit">Update User</Button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
