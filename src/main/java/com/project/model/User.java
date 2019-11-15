package com.project.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String username;

    private String password;

//    @ManyToMany
//    private List<Recipe> recipes;

    @ElementCollection
    private List<Integer> recipes;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Integer> getRecipes() {
        return recipes;
    }

    public void setRecipes(List<Integer> recipes) {
        this.recipes = recipes;
    }

    public void addRecipeToUser(Integer recipe){
        this.recipes.add(recipe);
    }

    public void removeRecipeFromUser(Integer recipe){
        this.recipes.removeIf((Integer r) -> r.equals(recipe));
    }

    //    public List<Recipe> getRecipes() {
//        return recipes;
//    }
//
//    public void setRecipes(List<Recipe> recipes) {
//        this.recipes = recipes;
//    }
}
