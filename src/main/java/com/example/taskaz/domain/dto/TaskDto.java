package com.example.taskaz.domain.dto;

import com.example.taskaz.domain.entity.TaskPriority;
import com.example.taskaz.domain.entity.TaskStatus;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskDto(
        UUID id,
        String title,
        String description,
        LocalDateTime dueDate,
        TaskPriority priority,
        TaskStatus status
) {
}
