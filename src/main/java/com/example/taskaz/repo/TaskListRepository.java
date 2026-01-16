package com.example.taskaz.repo;

import com.example.taskaz.domain.entity.TaskLists;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface TaskListRepository extends JpaRepository<TaskLists, UUID> {
}
