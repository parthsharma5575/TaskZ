package com.example.taskaz.mappers.impl;

import com.example.taskaz.domain.dto.TaskDto;
import com.example.taskaz.domain.entity.Task;
import com.example.taskaz.mappers.TaskMapper;
import org.springframework.stereotype.Component;

@Component
public class TaskMapperImp implements TaskMapper {
    @Override
    public Task fromDto(TaskDto taskDto) {
        return new Task(
                taskDto.id(),
                taskDto.title(),
                taskDto.description(),
                taskDto.dueDate(),
                taskDto.status(),
                taskDto.priority(),
                null,
                null,
                null
        );
    }

    @Override
    public TaskDto toDto(Task task) {
        return new TaskDto(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getDueDate(),
                task.getPriority(),
                task.getStatus()
        );
    }
}
