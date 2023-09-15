import React, { useState, useMemo, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_ORGANIZATION } from '@/graphql/mutations';

import { Organization } from '@/lib/types/types';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { countryList } from '@/helpers/helpers';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/Dropdown';

interface EditOrganizationDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    organization: Organization | null;
    refetchOrganizations: () => void; // Changed from refetchUsers
}

const EditOrganizationDialog: React.FC<EditOrganizationDialogProps> = ({ isOpen, onOpenChange, organization, refetchOrganizations }) => {
    const [editOrganizationMutation] = useMutation(EDIT_ORGANIZATION);
    //const [deleteOrganizationMutation] = useMutation(DELETE_ORGANIZATION);

    const [currentCountry, setCurrentCountry] = useState<string>('');

    // Infer country from browser's locale
    useEffect(() => {
        const country = new Intl.Locale(navigator.language).maximize().region;
        setCurrentCountry(country || "New Zealand");
    }, []);
    


    const [editOrganizationData, setEditOrganizationData] = useState<{
        name: string;
        address: string;
        country: string;
        organizationType: string;
    }>({
        name: organization?.name || '',
        address: organization?.address || '',
        country: organization?.country || '',
        organizationType: organization?.organizationType || '',
    });

    const mutationVariables = useMemo(() => ({
        data: {
            id: Number(organization?.id),
            ...editOrganizationData
        }
    }), [organization, editOrganizationData]);


    const handleEditOrganization = async () => {
        try {
            await editOrganizationMutation({ variables: mutationVariables });
            onOpenChange(false);
            refetchOrganizations();
        } catch (error) {
            console.error(error);
        }
    };

    // const handleDeleteOrganization = async () => {
    //     if (organization && organization.id) {
    //         try {
    //             await deleteOrganizationMutation({ variables: { id: Number(organization.id) } });
    //             onOpenChange(false);
    //             refetchOrganizations(); // Refetching the organizations after deletion.
    //         } catch (error) {
    //             console.error("Error deleting organization:", error);
    //         }
    //     }
    // };

    useEffect(() => {
        setEditOrganizationData({
            name: organization?.name || '',
            address: organization?.address || '',
            country: organization?.country || currentCountry,
            organizationType: organization?.organizationType || '',
        });
    }, [organization, currentCountry]);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Edit Organization</DialogTitle>
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleEditOrganization();
                    }}>
                        <div className="mt-4">
                            <label htmlFor="editName">Name</label>
                            <Input
                                type="text"
                                id="editName"
                                name="name"
                                placeholder='Type..'
                                className="w-full p-2 mt-2 border rounded"
                                value={editOrganizationData.name}
                                onChange={(event) => {
                                    const { name, value } = event.target;
                                    setEditOrganizationData(prev => ({ ...prev, [name]: value }));
                                }}
                            />
                        </div>

                        <div className="mt-4">
                            <label htmlFor="editAddress">Address</label>
                            <Input
                                type="text"
                                id="editAddress"
                                name="address"
                                placeholder='Type..'
                                className="w-full p-2 mt-2 border rounded"
                                value={editOrganizationData.address}
                                onChange={(event) => {
                                    const { name, value } = event.target;
                                    setEditOrganizationData(prev => ({ ...prev, [name]: value }));
                                }}
                            />
                        </div>

                        <div className="mt-4 flex flex-col">
                            <label htmlFor="editCountry">Country</label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                    >
                                        {editOrganizationData.country || "Select Country"}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-[29rem]">
                                    {countryList.map((country) => (
                                        <DropdownMenuItem key={country} onSelect={() => {
                                            setEditOrganizationData(prev => ({ ...prev, country }));
                                        }}>
                                            {country}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="editOrganizationType">Organization Type</label>
                            <Input
                                type="text"
                                id="editOrganizationType"
                                name="organizationType"
                                placeholder='Type..'
                                className="w-full p-2 mt-2 border rounded"
                                value={editOrganizationData.organizationType}
                                onChange={(event) => {
                                    const { name, value } = event.target;
                                    setEditOrganizationData(prev => ({ ...prev, [name]: value }));
                                }}
                            />
                        </div>

                        {/* Submit and Cancel Buttons */}
                        <div className="mt-6 flex justify-between">
                            <div>
                                {/* <Button variant="outline" onClick={handleDeleteOrganization}>Delete Organization</Button> */}
                            </div>
                            <div className='flex items-center gap-2'>
                                <Button onClick={() => onOpenChange(false)} variant={"outline"}>Cancel</Button>
                                <Button type="submit">Update Organization</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditOrganizationDialog;
