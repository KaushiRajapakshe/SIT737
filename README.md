# SIT737 - sit737-2025-prac5p

## Week 05 practical

### 1. Introduction
This project explains the steps I took to build a simple web calculator using Node.js and the Express framework.

## 2. Tools and Prerequisites
- **Git**: Version control tool. [Installation Instructions](https://git-scm.com)
- **Visual Studio Code**: Code editor. [Installation Instructions](https://code.visualstudio.com)
- **Node.js**: JavaScript runtime. [Installation Instructions](https://nodejs.org)
- **Express**: Web framework for Node.js.
- **Winston**: A versatile logging library for Node.js. [Installation Instructions](https://www.npmjs.com/package/winston)
- **Mongoose**: MongoDB object modeling tool for Node.js. [Installation Instructions](https://www.npmjs.com/package/mongoose)

## 3. Setting Up the Git Repository
1. Create a GitHub account at [GitHub](https://github.com).
2. Create a new repository named `SIT737`. [Git Repo](https://github.com/KaushiRajapakshe/SIT737)
3. Create a new branch named `sit737-2025-prac5p`. [Git Branch](https://github.com/KaushiRajapakshe/SIT737/tree/sit737-2025-prac4c)
4. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/KaushiRajapakshe/SIT737.git
5. Swith to the branch in your local machine:
    ```bash
    git checkout sit737-2025-prac5p
6. Navigate to the folder `sit737-2025-prac5p` and Run `npm install` command.
7. Build the docker container run `docker build -t calculator .` command.
8. Up the docker container run `docker-compose up -d --build` and application is listening on `3041` port. http://localhost:3041.
9. To stop and remove the container run `docker compose down`.
