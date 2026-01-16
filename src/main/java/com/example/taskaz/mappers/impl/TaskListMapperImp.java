package com.example.taskaz.mappers.impl;

import com.example.taskaz.domain.dto.TaskDto;
import com.example.taskaz.domain.dto.TaskListDto;
import com.example.taskaz.domain.entity.Task;
import com.example.taskaz.domain.entity.TaskLists;
import com.example.taskaz.domain.entity.TaskStatus;
import com.example.taskaz.mappers.TaskListMapper;
import com.example.taskaz.mappers.TaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Component
public class TaskListMapperImp implements TaskListMapper {
    @Autowired
    private TaskMapper taskMapper;

    @Override
    public TaskLists fromDto(TaskListDto taskListDto) {
        return new TaskLists(
                taskListDto.id(),
                taskListDto.title(),
                taskListDto.description(),
                null,
                null,
                Optional.ofNullable(taskListDto.tasks())
                        .map(tasks -> tasks.stream()
                                .map(taskMapper::fromDto)
                                .toList()
                        ).orElse(null)
        );
    }

    @Override
    public TaskListDto toDto(TaskLists taskLists) {
        return new TaskListDto(
          taskLists.getId(),
                taskLists.getTitle(),
                taskLists.getDescription(),
                Optional.ofNullable(taskLists.getTasks())
                        .map(List::size)
                        .orElse(0),
                calculateTaskListProgress(taskLists.getTasks()),
                Optional.ofNullable(taskLists.getTasks())
                        .map(tasks -> tasks.stream()
                                .map(taskMapper::toDto).toList())
                        .orElse(null)
        );
    }
    private Double calculateTaskListProgress(List<Task> tasks) {
        if(null==tasks)return null;
        long countClosedTasks = tasks.stream().filter(task -> TaskStatus.CLOSED==task.getStatus()).count();
        return (double) countClosedTasks/tasks.size();
    }
}
