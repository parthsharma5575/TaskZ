import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, LinearProgress, Box, IconButton, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ListIcon from '@mui/icons-material/List';
import { useNavigate } from 'react-router-dom';

const TaskListCard = ({ taskList, onDelete }) => {
    const navigate = useNavigate();

    let progressValue = taskList.progress || 0;
    if (progressValue <= 1 && progressValue > 0) {
        progressValue = progressValue * 100;
    }

    const getProgressColor = () => {
        if (progressValue === 100) return '#10b981';
        if (progressValue >= 50) return '#6366f1';
        return '#f59e0b';
    };

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Card 
                sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden',
                    position: 'relative',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '4px',
                        background: `linear-gradient(90deg, ${getProgressColor()} 0%, ${getProgressColor()}80 100%)`,
                    },
                    '&:hover': { 
                        boxShadow: '0 12px 48px rgba(99, 102, 241, 0.2)',
                        borderColor: 'rgba(99, 102, 241, 0.3)',
                    }
                }}
            >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                        <Box
                            sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 2,
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                            }}
                        >
                            <ListIcon sx={{ color: 'white', fontSize: 24 }} />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography 
                                variant="h6" 
                                component="div" 
                                gutterBottom
                                sx={{
                                    fontWeight: 600,
                                    color: '#1e293b',
                                    mb: 0.5,
                                }}
                            >
                                {taskList.title}
                            </Typography>
                            <Typography 
                                variant="body2" 
                                color="text.secondary" 
                                paragraph
                                sx={{
                                    mb: 0,
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                }}
                            >
                                {taskList.description || 'No description'}
                            </Typography>
                        </Box>
                    </Box>
                    
                    <Box sx={{ mt: 3, mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                                Progress
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
                                height: 8,
                                borderRadius: 4,
                                backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 4,
                                    background: `linear-gradient(90deg, ${getProgressColor()} 0%, ${getProgressColor()}80 100%)`,
                                }
                            }}
                        />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
                        <Chip
                            icon={<ListIcon sx={{ fontSize: 16 }} />}
                            label={`${taskList.count || 0} Tasks`}
                            size="small"
                            sx={{
                                background: 'rgba(99, 102, 241, 0.1)',
                                color: '#6366f1',
                                fontWeight: 600,
                                border: '1px solid rgba(99, 102, 241, 0.2)',
                            }}
                        />
                    </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 3, pb: 3, pt: 0 }}>
                    <Button 
                        size="medium" 
                        variant="contained"
                        endIcon={<ArrowForwardIcon />} 
                        onClick={() => navigate(`/task-lists/${taskList.id}`)}
                        sx={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                            '&:hover': {
                                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)',
                                transform: 'translateY(-1px)',
                            },
                            transition: 'all 0.2s ease',
                            borderRadius: 2,
                            px: 2.5,
                        }}
                    >
                        View
                    </Button>
                    <IconButton 
                        aria-label="delete" 
                        onClick={() => onDelete(taskList.id)}
                        sx={{
                            color: '#ef4444',
                            '&:hover': {
                                background: 'rgba(239, 68, 68, 0.1)',
                                transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease',
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        </motion.div>
    );
};

export default TaskListCard;
