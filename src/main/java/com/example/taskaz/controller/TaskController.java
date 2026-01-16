package com.example.taskaz.controller;

import com.example.taskaz.domain.dto.TaskDto;
import com.example.taskaz.domain.entity.Task;
import com.example.taskaz.mappers.TaskMapper;
import com.example.taskaz.services.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/task-lists/{task_list_id}/tasks")
public class TaskController {
    private final TaskService taskService;
    private final TaskMapper taskMapper;

    public TaskController(TaskService taskService, TaskMapper taskMapper) {
        this.taskService = taskService;
        this.taskMapper = taskMapper;
    }

    @GetMapping
    public List<TaskDto> listTasks(@PathVariable UUID task_list_id){
        return taskService.listTasks(task_list_id)
                .stream()
                .map(taskMapper::toDto)
                .toList();
    }
    @PostMapping
    public TaskDto createTask(@PathVariable UUID task_list_id,@RequestBody TaskDto taskDto){
        return taskMapper.toDto(taskService.createTask(task_list_id,taskMapper.fromDto(taskDto)));
    }

    @GetMapping("/{id}")
    public Optional<TaskDto> getTask(@PathVariable UUID task_list_id, @PathVariable UUID id){
        return taskService.getTask(id,task_list_id).map(taskMapper::toDto);
    }

    @PutMapping("/{task_id}")
    public TaskDto updateTask(@PathVariable UUID task_id, @PathVariable UUID task_list_id, @RequestBody TaskDto taskDto){
       Task updatedTask= taskService.updateTask(task_list_id,task_id,taskMapper.fromDto(taskDto));
       return taskMapper.toDto(updatedTask);
    }

    @DeleteMapping("/{task_id}")
    public void deleteTask(@PathVariable UUID task_list_id, @PathVariable UUID task_id){
        taskService.deleteTask(task_list_id,task_id);
    }

}
