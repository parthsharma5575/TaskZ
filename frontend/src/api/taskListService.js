import api from './axiosConfig';

export const getTaskLists = async () => {
    const response = await api.get('/task-lists');
    return response.data;
};

export const getTaskList = async (id) => {
    const response = await api.get(`/task-lists/${id}`);
    return response.data;
};

export const createTaskList = async (taskList) => {
    const response = await api.post('/task-lists', taskList);
    return response.data;
};

export const updateTaskList = async (id, taskList) => {
    const response = await api.put(`/task-lists/${id}`, taskList);
    return response.data;
};

export const deleteTaskList = async (id) => {
    await api.delete(`/task-lists/${id}`);
};
