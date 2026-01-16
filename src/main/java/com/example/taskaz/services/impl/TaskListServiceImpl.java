package com.example.taskaz.services.impl;

import com.example.taskaz.domain.entity.TaskLists;
import com.example.taskaz.repo.TaskListRepository;
import com.example.taskaz.services.TaskListService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TaskListServiceImpl implements TaskListService {
   private final TaskListRepository taskListRepository;

    public TaskListServiceImpl(TaskListRepository taskListRepository) {
        this.taskListRepository = taskListRepository;
    }

    @Override
    public List<TaskLists> listTaskLists() {
        return taskListRepository.findAll();
    }

    @Override
    public TaskLists createTaskList(TaskLists taskLists) {
        LocalDateTime now = LocalDateTime.now();
        if(taskLists.getId() != null){
            throw new IllegalArgumentException("Id must be null");
        }
        if(taskLists.getTitle()==null || taskLists.getTitle().isBlank()){
            throw new IllegalArgumentException("Title must not be empty");
        }
        return taskListRepository.save(
                new TaskLists(null, taskLists.getTitle(), taskLists.getDescription(), now, now, null)
        );

    }

    @Override
    public Optional<TaskLists> getTaskList(UUID id) {
        return taskListRepository.findById(id);
    }

    @Override
    public TaskLists updateTaskList(UUID id, TaskLists taskLists) {
        if(null==taskLists.getId()){
            throw new IllegalArgumentException("Task list must have an id");
        }
        if(!taskLists.getId().equals(id)){
            throw new IllegalArgumentException("Task list id must be the same as in the path variable");
        }
        TaskLists existingTaskLists = taskListRepository.findById(id).orElseThrow();
        existingTaskLists.setTitle(taskLists.getTitle());
        existingTaskLists.setDescription(taskLists.getDescription());
        existingTaskLists.setUpdated(LocalDateTime.now());
        return taskListRepository.save(existingTaskLists);
    }

    @Override
    public void deleteTaskList(UUID taskListId) {
        taskListRepository.deleteById(taskListId);
    }
}
