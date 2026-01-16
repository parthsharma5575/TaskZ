import React, { useEffect, useState } from 'react';
import { Grid, Typography, Button, Box, CircularProgress, Alert, Paper, Skeleton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import AddIcon from '@mui/icons-material/Add';
import TaskListCard from '../components/TaskListCard';
import CreateTaskListModal from '../components/CreateTaskListModal';
import { getTaskLists, createTaskList, deleteTaskList } from '../api/taskListService';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const [taskLists, setTaskLists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const fetchTaskLists = async () => {
        try {
            setLoading(true);
            const data = await getTaskLists();
            setTaskLists(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch task lists. Please try again.');
            toast.error('Failed to fetch task lists. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTaskLists();
    }, []);

    const handleCreate = async (taskListData) => {
        try {
            await createTaskList(taskListData);
            toast.success('Task list created successfully!');
            fetchTaskLists();
        } catch (err) {
            console.error('Failed to create task list', err);
            toast.error('Failed to create task list. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task list?')) {
            try {
                await deleteTaskList(id);
                toast.success('Task list deleted successfully!');
                fetchTaskLists();
            } catch (err) {
                console.error('Failed to delete task list', err);
                toast.error('Failed to delete task list. Please try again.');
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 12
            }
        }
    };

    if (loading) {
        return (
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Skeleton variant="text" width={200} height={40} />
                    <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 2 }} />
                </Box>
                <Grid container spacing={3}>
                    {[1, 2, 3].map((i) => (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }

    return (
        <Box>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography 
                            variant="h4" 
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                mb: 0.5,
                            }}
                        >
                            My Task Lists
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Organize your tasks efficiently
                        </Typography>
                    </Box>
                    <Button 
                        variant="contained" 
                        startIcon={<AddIcon />} 
                        onClick={() => setModalOpen(true)}
                        sx={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.5)',
                                transform: 'translateY(-2px)',
                            },
                            transition: 'all 0.3s ease',
                            px: 3,
                            py: 1.5,
                            borderRadius: 2,
                        }}
                    >
                        New List
                    </Button>
                </Box>
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>
                    </motion.div>
                )}
            </AnimatePresence>

            {taskLists.length === 0 && !error ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper
                        sx={{
                            p: 6,
                            textAlign: 'center',
                            borderRadius: 3,
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                        }}
                    >
                        <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                            📋 No task lists yet
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                            Create your first task list to get started organizing your tasks!
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={() => setModalOpen(true)}
                            sx={{
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                boxShadow: '0 4px 14px 0 rgba(99, 102, 241, 0.39)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                    boxShadow: '0 6px 20px 0 rgba(99, 102, 241, 0.5)',
                                    transform: 'translateY(-2px)',
                                },
                                transition: 'all 0.3s ease',
                                px: 4,
                                py: 1.5,
                                borderRadius: 2,
                            }}
                        >
                            Create Your First List
                        </Button>
                    </Paper>
                </motion.div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Grid container spacing={3}>
                        <AnimatePresence>
                            {taskLists.map((list, index) => (
                                <Grid item xs={12} sm={6} md={4} key={list.id}>
                                    <motion.div
                                        variants={itemVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        layout
                                    >
                                        <TaskListCard taskList={list} onDelete={handleDelete} />
                                    </motion.div>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    </Grid>
                </motion.div>
            )}

            <CreateTaskListModal 
                open={modalOpen} 
                handleClose={() => setModalOpen(false)} 
                onSave={handleCreate} 
            />
        </Box>
    );
};

export default Dashboard;
