"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup
} from "@/components/ui/Dropdown";
import { Organization } from '@/lib/types/types';
import { useQuery } from '@apollo/client';
import { GET_ORGANIZATIONS } from '@/graphql/queries';
import Loading from '@/components/ui/Loading';
import { signIn } from 'next-auth/react';
import ErrorPage from '@/components/ui/Error';

const SignUp: React.FC = () => {
    const { data, loading, error } = useQuery(GET_ORGANIZATIONS);
    const [selectedOrg, setSelectedOrg] = useState<number | null>(null);
    const [signupData, setSignupData] = useState<{
        name: string;
        email: string;
        password: string;
        role: string;
        orgId: number | null;
    }>({
        name: '',
        email: '',
        password: '',
        role: '',
        orgId: null,
    });

    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    const validateEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    if (loading) return <Loading />
    if (error) return <ErrorPage />

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        const newValue = (name === 'orgId') ? (value ? parseInt(value, 10) : null) : value;
        setSignupData({ ...signupData, [name]: newValue });

        // Remove the error message when the user updates the input
        let errors = { ...formErrors };
        delete errors[name];
        setFormErrors(errors);
    };

    const handleOrgSelect = (value: string) => {
        const orgId = parseInt(value, 10);
        setSelectedOrg(orgId);
        setSignupData({ ...signupData, orgId });

        // Remove organization error if previously selected
        let errors = { ...formErrors };
        delete errors['orgId'];
        setFormErrors(errors);
    };

    const handleSignUpSubmit = async (event: FormEvent) => {
        event.preventDefault();

        let errors = {};

        if (!signupData.name) errors = { ...errors, name: "Name is required." };
        if (!signupData.email) errors = { ...errors, email: "Email is required." };
        else if (!validateEmail(signupData.email)) errors = { ...errors, email: "Invalid email format." };
        if (!signupData.password) errors = { ...errors, password: "Password is required." };
        else if (!validatePassword(signupData.password)) errors = { ...errors, password: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character." };
        if (!selectedOrg) errors = { ...errors, orgId: "Organization is required." };

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(signupData),
        });

        if (response.ok) {
            signIn();
        } else {
            if (response.status === 500) {
                setFormErrors({ ...formErrors, email: "Email already exists." });
            } else {
                console.error('Error during sign-up:', response.status);
                setFormErrors({ ...formErrors, general: "An unexpected error occurred. Please try again." });
            }
        }
    };

    return (
        <div className="relative flex h-full">
            <div className="w-1/2 bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: `url('/bg-1.jpg')` }}></div>
            <div className="w-1/2 bg-no-repeat bg-cover bg-center relative" style={{ backgroundImage: `url('/bg-2.jpg')` }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex flex-col items-center justify-center h-full w-[450px] mx-auto text-gray-600">
                    <div className="w-full bg-white rounded-xl shadow-xl p-8 space-y-2 md:space-y-2">
                        <h2 className="text-4xl font-extrabold text-center text-purple-900">Sign-up</h2>
                        {Object.keys(formErrors).length > 0 && (
                            <ul className="list-disc list-inside text-sm font-normal text-red-500 py-4">
                                {Object.entries(formErrors).map(([key, error]) => (
                                    <li key={key}>{error}</li>
                                ))}
                            </ul>
                        )}
                        <form className="space-y-2 md:space-y-4" onSubmit={handleSignUpSubmit}>
                            <div>
                                <label htmlFor="name" className='text-sm font-medium'>Name</label>
                                <Input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder='Enter name...'
                                    className="w-full border rounded"
                                    value={signupData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className='text-sm font-medium'>Email</label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder='Enter email...'
                                    className="w-full border rounded"
                                    value={signupData.email.toLowerCase()}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className='text-sm font-medium'>Password</label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder='Enter password...'
                                    className="w-full border rounded"
                                    value={signupData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor="orgId" className='text-sm font-medium'>Organization</label>
                                <Select name="orgId" onValueChange={handleOrgSelect}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Organization" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {data?.organizations.map((org: Organization) => (
                                                <SelectItem key={org.id} value={org.id.toString()}>
                                                    {org.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="mt-6 flex w-full items-center gap-2">
                                <Button type="submit" className='w-full text-center flex justify-center items-center'>Start appreciating!</Button>
                            </div>
                        </form>
                        <p className='font-normal text-center py-4 text-sm text-purple-900'>Already have an account? Please <span className='underline font-bold text-sm text-purple-900 italic cursor-pointer' onClick={() => signIn()}>sign in</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
