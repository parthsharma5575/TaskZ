import React from 'react';
import { Card, CardContent, Typography, CardActions, IconButton, Chip, Box, Stack } from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import EventIcon from '@mui/icons-material/Event';
import { format } from 'date-fns';

const TaskCard = ({ task, onDelete, onUpdateStatus, onEdit }) => {
    
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'HIGH': return { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' };
            case 'MEDIUM': return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' };
            case 'LOW': return { bg: '#d1fae5', color: '#059669', border: '#a7f3d0' };
            default: return { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' };
        }
    };

    const isClosed = task.status === 'CLOSED';
    const priorityColors = getPriorityColor(task.priority);
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !isClosed;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            <Card 
                sx={{ 
                    mb: 2,
                    borderRadius: 3,
                    background: isClosed 
                        ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(255, 255, 255, 0.95) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: `2px solid ${isClosed ? 'rgba(16, 185, 129, 0.3)' : 'rgba(99, 102, 241, 0.2)'}`,
                    borderLeft: `6px solid ${isClosed ? '#10b981' : '#6366f1'}`,
                    boxShadow: isClosed 
                        ? '0 4px 16px rgba(16, 185, 129, 0.1)'
                        : '0 4px 16px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                        boxShadow: isClosed 
                            ? '0 8px 24px rgba(16, 185, 129, 0.2)'
                            : '0 8px 24px rgba(99, 102, 241, 0.2)',
                        borderColor: isClosed ? 'rgba(16, 185, 129, 0.5)' : 'rgba(99, 102, 241, 0.4)',
                    }
                }}
            >
                <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ flexGrow: 1, pr: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography 
                                    variant="h6" 
                                    component="div" 
                                    sx={{ 
                                        textDecoration: isClosed ? 'line-through' : 'none',
                                        color: isClosed ? 'text.secondary' : '#1e293b',
                                        fontWeight: 600,
                                        flexGrow: 1,
                                    }}
                                >
                                    {task.title}
                                </Typography>
                            </Box>
                            <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                sx={{ 
                                    mt: 1,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {task.description || 'No description'}
                            </Typography>
                        </Box>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <IconButton 
                                onClick={() => onUpdateStatus(task)} 
                                sx={{
                                    color: isClosed ? '#10b981' : '#94a3b8',
                                    background: isClosed ? 'rgba(16, 185, 129, 0.1)' : 'rgba(148, 163, 184, 0.1)',
                                    '&:hover': {
                                        background: isClosed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                                    },
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                {isClosed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                            </IconButton>
                        </motion.div>
                    </Box>
                    
                    <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap', gap: 1 }}>
                        <Chip 
                            label={task.priority} 
                            size="small" 
                            sx={{
                                background: priorityColors.bg,
                                color: priorityColors.color,
                                border: `1px solid ${priorityColors.border}`,
                                fontWeight: 600,
                                fontSize: '0.75rem',
                            }}
                        />
                        {task.dueDate && (
                            <Chip 
                                icon={<EventIcon sx={{ fontSize: 16 }} />}
                                label={format(new Date(task.dueDate), 'MMM d, yyyy')}
                                size="small"
                                sx={{
                                    background: isOverdue ? '#fee2e2' : '#e0e7ff',
                                    color: isOverdue ? '#dc2626' : '#6366f1',
                                    border: `1px solid ${isOverdue ? '#fecaca' : '#c7d2fe'}`,
                                    fontWeight: 600,
                                    fontSize: '0.75rem',
                                }}
                            />
                        )}
                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end', px: 3, pb: 2, pt: 0 }}>
                    <IconButton 
                        size="small" 
                        onClick={() => onEdit(task)}
                        sx={{
                            color: '#6366f1',
                            '&:hover': {
                                background: 'rgba(99, 102, 241, 0.1)',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton 
                        size="small" 
                        onClick={() => onDelete(task.id)}
                        sx={{
                            color: '#ef4444',
                            '&:hover': {
                                background: 'rgba(239, 68, 68, 0.1)',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </CardActions>
            </Card>
        </motion.div>
    );
};

export default TaskCard;
