import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const CreateTaskListModal = ({ open, handleClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!open) {
            setTitle('');
            setDescription('');
        }
    }, [open]);

    const handleSubmit = () => {
        if (title.trim()) {
            onSave({ title: title.trim(), description: description.trim() });
            setTitle('');
            setDescription('');
            handleClose();
        }
    };

    return (
        <AnimatePresence>
            {open && (
                <Dialog 
                    open={open} 
                    onClose={handleClose} 
                    fullWidth 
                    maxWidth="sm"
                    PaperProps={{
                        sx: {
                            borderRadius: 3,
                            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        }
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    >
                        <DialogTitle
                            sx={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '1.5rem',
                                pb: 2,
                            }}
                        >
                            Create New Task List
                        </DialogTitle>
                        <DialogContent sx={{ mt: 3 }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <TextField
                                    autoFocus
                                    label="Title"
                                    fullWidth
                                    variant="outlined"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Enter task list title"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />
                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter task list description (optional)"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ p: 3, pt: 2 }}>
                            <Button 
                                onClick={handleClose}
                                sx={{
                                    color: 'text.secondary',
                                    '&:hover': {
                                        background: 'rgba(0, 0, 0, 0.05)',
                                    }
                                }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                onClick={handleSubmit} 
                                variant="contained" 
                                disabled={!title.trim()}
                                sx={{
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                    boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                        boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.5)',
                                    },
                                    '&:disabled': {
                                        background: 'rgba(0, 0, 0, 0.12)',
                                    },
                                    transition: 'all 0.3s ease',
                                    px: 3,
                                    borderRadius: 2,
                                }}
                            >
                                Create
                            </Button>
                        </DialogActions>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default CreateTaskListModal;
