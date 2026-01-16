package com.example.taskaz.services.impl;

import com.example.taskaz.domain.entity.Task;
import com.example.taskaz.domain.entity.TaskLists;
import com.example.taskaz.domain.entity.TaskPriority;
import com.example.taskaz.domain.entity.TaskStatus;
import com.example.taskaz.repo.TaskListRepository;
import com.example.taskaz.repo.TaskRepository;
import com.example.taskaz.services.TaskService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    public TaskServiceImpl(TaskRepository taskRepository, TaskListRepository taskListRepository) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    @Override
    public List<Task> listTasks(UUID taskListId) {
        return taskRepository.findByTaskListId(taskListId);

    }

    @Transactional
    @Override
    public Task createTask(UUID taskListId, Task task) {
        if(null!=task.getId()){
            throw  new IllegalArgumentException("Task already has an ID!");
        }
        if(null==task.getTitle() || task.getTitle().isBlank()){
            throw new IllegalArgumentException("Title must not be empty");
        }
        TaskPriority taskPriority= Optional.ofNullable(task.getPriority()).orElse(TaskPriority.MEDIUM);
        TaskStatus taskStatus=TaskStatus.OPEN;
        TaskLists taskList=taskListRepository.findById(taskListId)
                .orElseThrow(()->new IllegalArgumentException("Task list not found!"));
        LocalDateTime now=LocalDateTime.now();
        Task taskToSave=new Task(
                null,
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                taskStatus,
                taskPriority,
                taskList,
                now,
                now

        );
        return taskRepository.save(taskToSave);
    }

    @Override
    public Optional<Task> getTask(UUID id, UUID taskListId) {
        return taskRepository.findByTaskListIdAndId(taskListId,id);
    }

    @Transactional
    @Override
    public Task updateTask(UUID taskListId, UUID taskId, Task task) {
        if(null==task.getId()){
            throw new IllegalArgumentException("Task must have an id");
        }
        if(!task.getId().equals(taskId)){
            throw new IllegalArgumentException("Task id must be the same as in the path variable");
        }
        if(null==task.getTitle() || task.getTitle().isBlank()){
            throw new IllegalArgumentException("Title must not be empty");
        }
        if(null==task.getStatus()){
            throw new IllegalArgumentException("Status must not be null");
        }
        if(null==task.getPriority()){
            throw new IllegalArgumentException("Priority must not be null");
        }
        Optional<Task> taskOptional=taskRepository.findByTaskListIdAndId(taskListId,taskId);
        if(taskOptional.isPresent()){
            Task taskToUpdate=taskOptional.get();
            taskToUpdate.setTitle(task.getTitle());
            taskToUpdate.setDescription(task.getDescription());
            taskToUpdate.setDueDate(task.getDueDate());
            taskToUpdate.setStatus(task.getStatus());
            taskToUpdate.setPriority(task.getPriority());
            taskToUpdate.setUpdated(LocalDateTime.now());
            return taskRepository.save(taskToUpdate);
        }
        return null;

    }

    @Transactional
    @Override
    public void deleteTask(UUID taskListId, UUID taskId) {
        taskRepository.deleteByTaskListIdAndId(taskListId,taskId);
    }
}
