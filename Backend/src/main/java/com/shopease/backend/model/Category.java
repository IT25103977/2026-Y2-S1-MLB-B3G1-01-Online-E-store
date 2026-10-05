package com.shopease.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "categories")
public class Category {

    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String name;

    private String icon;

    private String bg;

    @Column(length = 1000)
    private String description;

    private Boolean active = true;

    public Category() {
    }

    public Category(String id, String name, String icon, String bg, String description) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.bg = bg;
        this.description = description;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getBg() {
        return bg;
    }

    public void setBg(String bg) {
        this.bg = bg;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
