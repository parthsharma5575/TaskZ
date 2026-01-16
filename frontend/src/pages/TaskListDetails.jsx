import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button, LinearProgress, Paper, IconButton, Alert, CircularProgress, Stack, Skeleton } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import TaskCard from '../components/TaskCard';
import CreateTaskModal from '../components/CreateTaskModal';
import { getTaskList } from '../api/taskListService';
import { getTasks, createTask, updateTask, deleteTask } from '../api/taskService';
import { toast } from 'react-toastify';

const TaskListDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [taskList, setTaskList] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            const listData = await getTaskList(id);
            setTaskList(listData);
            
            const tasksData = await getTasks(id);
            setTasks(tasksData);
            setError(null);
        } catch (err) {
            setError('Failed to fetch data.');
            toast.error('Failed to fetch data. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleSaveTask = async (taskData) => {
        try {
            if (taskToEdit) {
                await updateTask(id, taskToEdit.id, taskData);
                toast.success('Task updated successfully!');
            } else {
                await createTask(id, taskData);
                toast.success('Task created successfully!');
            }
            fetchData();
            handleModalClose();
        } catch (err) {
            console.error('Failed to save task', err);
            toast.error('Failed to save task. Please try again.');
        }
    };

    const handleDelete = async (taskId) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(id, taskId);
                toast.success('Task deleted successfully!');
                fetchData();
            } catch (err) {
                console.error(err);
                toast.error('Failed to delete task. Please try again.');
            }
        }
    };

    const handleStatusToggle = async (task) => {
        const newStatus = task.status === 'OPEN' ? 'CLOSED' : 'OPEN';
        try {
            await updateTask(id, task.id, { ...task, status: newStatus });
            toast.success(`Task marked as ${newStatus.toLowerCase()}!`);
            fetchData();
        } catch (err) {
            console.error('Failed to update status', err);
            toast.error('Failed to update task status. Please try again.');
        }
    };

    const handleEdit = (task) => {
        setTaskToEdit(task);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setTaskToEdit(null);
    };

    if (loading) {
        return (
            <Box>
                <Skeleton variant="rectangular" width={150} height={40} sx={{ mb: 2, borderRadius: 2 }} />
                <Skeleton variant="rectangular" height={200} sx={{ mb: 4, borderRadius: 3 }} />
                <Skeleton variant="text" width={200} height={40} sx={{ mb: 2 }} />
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} variant="rectangular" height={150} sx={{ mb: 2, borderRadius: 3 }} />
                ))}
            </Box>
        );
    }

    if (!taskList) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
                <Typography variant="h6" color="error">Task List not found.</Typography>
            </Paper>
        );
    }

    let progressValue = taskList.progress || 0;
    if (progressValue <= 1 && progressValue > 0) {
        progressValue = progressValue * 100;
    }

    const getProgressColor = () => {
        if (progressValue === 100) return '#10b981';
        if (progressValue >= 50) return '#6366f1';
        return '#f59e0b';
    };

    const openTasks = tasks.filter(t => t.status === 'OPEN').length;
    const closedTasks = tasks.filter(t => t.status === 'CLOSED').length;

    return (
        <Box>
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Button 
                    startIcon={<ArrowBackIcon />} 
                    onClick={() => navigate('/')} 
                    sx={{ 
                        mb: 3,
                        color: '#6366f1',
                        '&:hover': {
                            background: 'rgba(99, 102, 241, 0.1)',
                        }
                    }}
                >
                    Back to Dashboard
                </Button>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Paper 
                    sx={{ 
                        p: 4, 
                        mb: 4, 
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.5)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography 
                                variant="h4" 
                                gutterBottom
                                sx={{
                                    fontWeight: 700,
                                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                    mb: 1,
                                }}
                            >
                                {taskList.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                {taskList.description || 'No description'}
                            </Typography>
                            <Stack direction="row" spacing={2}>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>{openTasks}</strong> Open
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>{closedTasks}</strong> Completed
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>{tasks.length}</strong> Total
                                </Typography>
                            </Stack>
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
                            New Task
                        </Button>
                    </Box>
                    
                    <Box sx={{ mt: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                Overall Progress
                            </Typography>
                            <Typography 
                                variant="body2" 
                                sx={{ 
                                    fontWeight: 700,
                                    color: getProgressColor(),
                                }}
                            >
                                {Math.round(progressValue)}%
                            </Typography>
                        </Box>
                        <LinearProgress 
                            variant="determinate" 
                            value={progressValue}
                            sx={{ 
                                height: 12, 
                                borderRadius: 6,
                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 6,
                                    background: `linear-gradient(90deg, ${getProgressColor()} 0%, ${getProgressColor()}80 100%)`,
                                }
                            }}
                        />
                    </Box>
                </Paper>
            </motion.div>

            <Box>
                <Typography 
                    variant="h5" 
                    sx={{ 
                        mb: 3,
                        fontWeight: 600,
                        color: '#1e293b',
                    }}
                >
                    Tasks ({tasks.length})
                </Typography>
                
                <AnimatePresence>
                    {tasks.length === 0 ? (
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
                                <Typography variant="h6" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                                    📝 No tasks yet
                                </Typography>
                                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                    Create your first task to get started!
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
                                    Create Your First Task
                                </Button>
                            </Paper>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            <AnimatePresence>
                                {tasks.map((task, index) => (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ 
                                            type: 'spring',
                                            stiffness: 100,
                                            damping: 15,
                                            delay: index * 0.05
                                        }}
                                    >
                                        <TaskCard 
                                            task={task} 
                                            onDelete={handleDelete} 
                                            onUpdateStatus={handleStatusToggle}
                                            onEdit={handleEdit}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Box>

            <CreateTaskModal 
                open={modalOpen} 
                handleClose={handleModalClose} 
                onSave={handleSaveTask} 
                initialData={taskToEdit}
            />
        </Box>
    );
};

export default TaskListDetails;
