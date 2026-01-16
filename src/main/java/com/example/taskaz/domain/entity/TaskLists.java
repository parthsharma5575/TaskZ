package com.example.taskaz.domain.entity;


import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Stream;

@Table(name = "task_list")
@Entity
public class TaskLists {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id",updatable = false, nullable = false)
    private UUID id;

    @Column(name = "title", nullable = false)
    private String title;
    @Column(name = "description")
    private String description;
    @Column(name = "created", nullable = false)
    private LocalDateTime created;
    @Column(name = "updated",nullable = false)
    private LocalDateTime updated;

    @OneToMany(mappedBy = "taskList",cascade = {CascadeType.PERSIST,CascadeType.REMOVE})
    private List<Task> tasks;


    @Override
    public String toString() {
        return "TaskLists{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", created=" + created +
                ", updated=" + updated +
                ", tasks=" + tasks +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        TaskLists taskLists = (TaskLists) o;
        return Objects.equals(id, taskLists.id) && Objects.equals(title, taskLists.title) && Objects.equals(description, taskLists.description) && Objects.equals(created, taskLists.created) && Objects.equals(updated, taskLists.updated) && Objects.equals(tasks, taskLists.tasks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, title, description, created, updated, tasks);
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }

    public LocalDateTime getUpdated() {
        return updated;
    }

    public void setUpdated(LocalDateTime updated) {
        this.updated = updated;
    }

    public List<Task> getTasks() {
        return tasks;
    }

    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }

    public TaskLists(UUID id, String title, String description, LocalDateTime created, LocalDateTime updated, List<Task> tasks) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.created = created;
        this.updated = updated;
        this.tasks = tasks;
    }

    public TaskLists() {
    }
}
