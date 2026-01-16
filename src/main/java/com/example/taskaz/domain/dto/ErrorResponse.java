package com.example.taskaz.domain.dto;

public record ErrorResponse(
        int status,
        String message,
        String details
) {
}
