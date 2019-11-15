package com.project.service;

import com.project.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;


public interface UserService  extends UserDetailsService {
    public User getUser(String username);

    public String createUser(User newUser) throws Exception;

    public String login(User returningUser, HttpServletRequest request, HttpSession session);

    public List<User> listUsers();

    User addRecipe(Integer rid);

    User removeRecipe(Integer rid);

    List<Integer> getRecipes();

    User getUser();
}
