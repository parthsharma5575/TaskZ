package com.example.taskaz.mappers;

import com.example.taskaz.domain.dto.TaskDto;
import com.example.taskaz.domain.dto.TaskListDto;
import com.example.taskaz.domain.entity.TaskLists;

public interface TaskListMapper {
    TaskLists fromDto(TaskListDto taskListDto);
    TaskListDto toDto(TaskLists taskLists);
}
