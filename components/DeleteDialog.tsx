'use-client'
import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/Dialog";
import { Button } from '@/components/ui/Button';


type DeleteDialogProps = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    handleSubmit: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ isOpen, onOpenChange, handleSubmit }) => {

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure you want to delete?</DialogTitle>
                    <DialogDescription>
                        <form onSubmit={handleSubmit}>
                            <div className="mt-6 flex justify-between items-center gap-2">
                                <Button onClick={() => onOpenChange(false)} variant={"outline"}>Cancel</Button>
                                <Button type="submit" className='px-4'>Yes</Button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteDialog;
