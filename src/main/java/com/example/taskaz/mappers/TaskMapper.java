package com.example.taskaz.mappers;

import com.example.taskaz.domain.dto.TaskDto;
import com.example.taskaz.domain.dto.TaskListDto;
import com.example.taskaz.domain.entity.Task;

public interface TaskMapper {
    Task fromDto(TaskDto taskDto);
    TaskDto toDto(Task task);
}
