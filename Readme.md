# Used Docker Images:
- nginx:alpine
- mysql:5.7.22
- php:7.4-fpm
- node:12.18.4

# Installed PHP Packages
- laravel/passport: Passport for OAUTH authentication
- fruitcake/laravel-cors: For handling CORS

# Installed JS Packages:
- @material-ui/core: Material UI Framework for React
- @material-ui/icons: Material UI Icon Framework for React
- axios: HTTP Client for calling REST API
- formik: Form library for React
- formik-material-ui: Helper library for connecting Material UI and Formik
- js-cookie: Library for handling cookies
- jsonwebtoken: JSON Web Token library 
- react: Main library for rendering front-end
- styled-components: CSS in JS library for React
- yup: Validation Schema for Formik
- enzyme: Unit Testing Library

# Initial Setup
- $ `cd <PROJECT-DIRECTORY>/server`
- $ `cp .env.example .env`
- Modify environment values for:
    - DB_HOST=db (we want to connect to db service in docker)
    - DB_DATABASE= MySQL Database name goes here
    - DB_USERNAME= MySQL Username goes here
    - DB_PASSWORD= MySQL Password goes here
- We want to generate a MySQL Server based on the .env values of server, so:
    - $ `docker-compose --env-file ./server/.env up --build`
- Wait for docker to finish building
- Run these respective command via `docker-compose exec app <command>` or via `docker ps` or `docker exec -it <container_id> sh`
    - Generate Laravel Application Key: $ `php artisan key:generate`
    - Migrate DB: $ `php artisan migrate`
    - Generate passport tokens: $ `php artisan passport:install`

# Back-end Server
- URL: localhost:8000
- Has 4 REST APIs:
    - POST localhost:8000/api/login
    - POST localhost:8000/api/register
    - POST localhost:8000/api/logout
    - GET localhost:8000/api/user 

# SPA
- URL: localhost:3000
- Has 3 main pages:
    - Login page: localhost:3000/login
    - Register page: localhost:3000/register
    - Home page (accessible only after registering / logging in): localhost:3000/home 
    
# Testing
- SPA unit testing with Enzyme and Jest
    - $ `cd <PROJECT-DIRECTORY>/spa` 
    - Running test: $ `npm test -- --watchAll=false`
- Server unit and feature testing with in-built PHPUnit from Laravel via `docker-compose exec app <command>` or via `docker ps` or `docker exec -it <container_id> sh`
    - Running test: $ `php artisan test` 