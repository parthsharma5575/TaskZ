package com.example.taskaz.controller;

import com.example.taskaz.domain.dto.TaskListDto;
import com.example.taskaz.domain.entity.TaskLists;
import com.example.taskaz.mappers.TaskListMapper;
import com.example.taskaz.services.TaskListService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/task-lists")
public class TaskListController {
    private final TaskListService taskListService;
    private final TaskListMapper taskListMapper;

    public TaskListController(TaskListService taskListService, TaskListMapper taskListMapper) {
        this.taskListService = taskListService;
        this.taskListMapper = taskListMapper;
    }

    @GetMapping
    public List<TaskListDto> listTaskLists(){
            return taskListService.listTaskLists()
                    .stream().map(taskListMapper::toDto)
                    .toList();
    }

    @PostMapping
    public TaskListDto createTaskList(@RequestBody TaskListDto taskListDto){
        TaskLists tasklistDto1= taskListService.createTaskList(taskListMapper.fromDto(taskListDto));
        return taskListMapper.toDto(tasklistDto1);
    }
    @GetMapping("/{id}")
    public Optional<TaskListDto> getTaskList(@PathVariable UUID id){
        return taskListService.getTaskList(id).map(taskListMapper::toDto);
    }

    @PutMapping("/{taskListId}")
    public TaskListDto updateTaskList(@PathVariable UUID taskListId,@RequestBody TaskListDto taskListDto){
        TaskLists updatedTaskList=taskListService.updateTaskList(taskListId,taskListMapper.fromDto(taskListDto));
        return taskListMapper.toDto(updatedTaskList);
    }

    @DeleteMapping("/{taskListId}")
    public void deleteTaskList(@PathVariable UUID taskListId){
        taskListService.deleteTaskList(taskListId);
    }
}
