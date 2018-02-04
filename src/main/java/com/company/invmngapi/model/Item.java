package com.company.invmngapi.model;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="item")
public class Item {

    public Item() {
    }

    public Item(String category, String name, String description, Long stock) {
        this.category = category;
        this.name = name;
        this.description = description;
        this.stock = stock;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long ID;

    @Column(name = "category")
    @NotBlank
    private String category;

    @Column(name = "name")
    @NotBlank
    private String name;

    @Column(name = "description")
    @Type(type = "text")
    @NotBlank
    private String description;

    @Column(name = "stock")
    @NotNull
    private Long stock;

    public Long getID() {
        return ID;
    }

    public void setID(Long ID) {
        this.ID = ID;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String desc) {
        this.description = desc;
    }

    public Long getStock() {
        return stock;
    }

    public void setStock(Long stock) {
        this.stock = stock;
    }

    @Override
    public String toString() {
        return "Item{" +
                "ID=" + ID +
                ", category='" + category + '\'' +
                ", name='" + name + '\'' +
                ", desc='" + description + '\'' +
                ", stock=" + stock +
                '}';
    }
}
