# Let's Eat 🚀
[Live Project](http://ec2-3-135-17-202.us-east-2.compute.amazonaws.com:8081/)

Fullstack application deployed on AWS built with React.js and Spring Boot following Microservice Archietecture guidelines.

Let's Eat allows you to find recipes based on the ingredients you have readily available to you in your kitchen.

## Technologies Used
- [React.js](https://reactjs.org/) - Javascript library used for the frontend
- [Spring](https://spring.io/projects/spring-boot)  - Java backend for my own REST API
- [Postgres](https://www.postgresql.org/) - SQL database for storing user info
- [Docker](https://www.docker.com/) - Tool for containerizing and transofrming the application into a microservice
- [AWS EC2](https://aws.amazon.com/ec2/) - Amazon Web Services is hosting the application
- [Maven](https://maven.apache.org/) - Dependency manager
- [Spoonacular API](https://spoonacular.com/food-api) - External API which allowed for recipe fetching

## How To Use
On the site itself after selecting ingredients and pressing the submit button you must press on the words "Select Your Ingredients" text to generate the results. This is a deliberate precaution to not accidentally make extra API calls, and to ensure that only those who have read this repo would know how to use the app.

## User Stories
- As a user I can Sign Up and Log In to my account.
- As a user I can Log Out of my account.
- As a user I can search for ingredients in my kitchen.
- As a user I can have my search query autocompleted.
- As a user I can remove search terms.
- As a user, I can save recipes.
- As a user I can view my saved recipes.
- As a user I can delete saved recipes from my list.

## Entity Relationship Model
![alt text](https://i.imgur.com/mQMG2Wq.png)

## Work Approach
Since this was a solo project I created a physical list of things to do every morning and would check them off as I go. I started with building out the backend and then working on the frontend.

## Major Hurdles
The biggest by far was workign with an external API. I was not used to having to deal with API limits, as such I ahd to be evry seliberate in my testing. At one point I managed to use up my monthly API limit and was forced to change my API and start the project over from scratch.

COntainerizing the project on my own machine was very costly. Docker would take 5-10 minutes on my computer to finish composing. While it took at most a minute on AWS. I was forced to keep my project as a monolith until the very end in which I turned it into a microservice.

Additionally, time. I had grand plans for this project but was not able to implement my vision in its entirety due to time restraints. See below for future goals.

## Prerequisites For Local Testing

To conduct testing you must have Java SE8, Docker, and Spring installed on your machine.

## Testing On Own Machine

Navigate to the directory containing the docker-compose.yml file and run the following command:
```sh
$ docker-compose up
```
## Shutting Down Instance

```sh
$ docker-compose down && docker-compose stop
```

## Future Goals
- Have the ability to order ingredients listed in the recipe
- Style the website
- Allow for the user to select ingredients based on categories
