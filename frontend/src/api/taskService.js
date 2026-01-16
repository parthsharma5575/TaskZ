import api from './axiosConfig';

export const getTasks = async (taskListId) => {
    const response = await api.get(`/task-lists/${taskListId}/tasks`);
    return response.data;
};

export const createTask = async (taskListId, task) => {
    const response = await api.post(`/task-lists/${taskListId}/tasks`, task);
    return response.data;
};

export const updateTask = async (taskListId, taskId, task) => {
    const response = await api.put(`/task-lists/${taskListId}/tasks/${taskId}`, task);
    return response.data;
};

export const deleteTask = async (taskListId, taskId) => {
    await api.delete(`/task-lists/${taskListId}/tasks/${taskId}`);
};
