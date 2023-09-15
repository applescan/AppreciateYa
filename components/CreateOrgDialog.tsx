'use-client'
import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog";
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { useMutation } from '@apollo/client';
import { CREATE_ORGANIZATION } from '@/graphql/mutations';

interface CreateOrganizationDialogProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    refetchOrganizations: () => void;
}

const orgDataInitialState = {
    name: '',
    address: '',
    country: '',
    organizationType: ''
};

const fields = [
    { label: 'Name', id: 'name' as keyof typeof orgDataInitialState },
    { label: 'Address', id: 'address' as keyof typeof orgDataInitialState },
    { label: 'Country', id: 'country' as keyof typeof orgDataInitialState },
    { label: 'Organization Type', id: 'organizationType' as keyof typeof orgDataInitialState },
];

const CreateOrganizationDialog: React.FC<CreateOrganizationDialogProps> = ({ isOpen, onOpenChange, refetchOrganizations }) => {
    const [createOrganization] = useMutation(CREATE_ORGANIZATION);
    const [orgData, setOrgData] = useState<typeof orgDataInitialState>(orgDataInitialState);


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await createOrganization({ variables: orgData });
        refetchOrganizations();
        onOpenChange(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setOrgData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger>
                <div className='p-2 rounded-md text-sm border bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-400 hover:to-indigo-400 text-white'>
                    <div className='flex items-center gap-2'><BiSolidMessageSquareAdd /> Create new user</div>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={handleSubmit}>
                            {fields.map(field => (
                                <div key={field.id} className="mt-4">
                                    <label htmlFor={field.id}>{field.label}</label>
                                    <Input
                                        type="text"
                                        id={field.id}
                                        name={field.id}
                                        placeholder='Type..'
                                        className="w-full p-2 mt-2 border rounded"
                                        value={orgData[field.id]}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            ))}
                            <div className="mt-6 flex justify-end items-center gap-2">
                                <Button onClick={() => onOpenChange(false)} variant={"outline"}>Cancel</Button>
                                <Button type="submit">Create User</Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default CreateOrganizationDialog;
