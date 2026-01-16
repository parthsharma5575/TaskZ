import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Select, FormControl, InputLabel, Box } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const CreateTaskModal = ({ open, handleClose, onSave, initialData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('MEDIUM');
    const [status, setStatus] = useState('OPEN');

    useEffect(() => {
        if (open) {
            if (initialData) {
                setTitle(initialData.title || '');
                setDescription(initialData.description || '');
                setPriority(initialData.priority || 'MEDIUM');
                setStatus(initialData.status || 'OPEN');
                if (initialData.dueDate) {
                    setDueDate(initialData.dueDate.slice(0, 16));
                } else {
                    setDueDate('');
                }
            } else {
                setTitle('');
                setDescription('');
                setDueDate('');
                setPriority('MEDIUM');
                setStatus('OPEN');
            }
        }
    }, [open, initialData]);

    const handleSubmit = () => {
        if (title.trim()) {
            let formattedDate = null;
            if(dueDate) {
                formattedDate = new Date(dueDate).toISOString().slice(0, 19);
            }

            onSave({ 
                ...initialData,
                title: title.trim(), 
                description: description.trim(), 
                dueDate: formattedDate, 
                priority, 
                status 
            });
            
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
                            {initialData ? 'Edit Task' : 'Create New Task'}
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
                                    placeholder="Enter task title"
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
                                    rows={3}
                                    variant="outlined"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter task description (optional)"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />
                                <TextField
                                    label="Due Date"
                                    type="datetime-local"
                                    fullWidth
                                    variant="outlined"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                        }
                                    }}
                                />
                                <FormControl fullWidth>
                                    <InputLabel>Priority</InputLabel>
                                    <Select
                                        value={priority}
                                        label="Priority"
                                        onChange={(e) => setPriority(e.target.value)}
                                        sx={{
                                            borderRadius: 2,
                                        }}
                                    >
                                        <MenuItem value="HIGH">High</MenuItem>
                                        <MenuItem value="MEDIUM">Medium</MenuItem>
                                        <MenuItem value="LOW">Low</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={status}
                                        label="Status"
                                        onChange={(e) => setStatus(e.target.value)}
                                        sx={{
                                            borderRadius: 2,
                                        }}
                                    >
                                        <MenuItem value="OPEN">Open</MenuItem>
                                        <MenuItem value="CLOSED">Closed</MenuItem>
                                    </Select>
                                </FormControl>
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
                                {initialData ? 'Save' : 'Create'}
                            </Button>
                        </DialogActions>
                    </motion.div>
                </Dialog>
            )}
        </AnimatePresence>
    );
};

export default CreateTaskModal;
