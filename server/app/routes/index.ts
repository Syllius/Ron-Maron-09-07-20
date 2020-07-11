import { Request, Response } from "express";
import { UserController } from "../controllers/userController";
import { TaskController } from "../controllers/taskController";

export class Routes {

    userController: UserController = new UserController();
    taskController: TaskController = new TaskController();

    public routes(app: any): void {

        app.route("/").get((req: Request, res: Response) => {
            res.status(200).send("Propit tasks api");
        });

        // Get all users
        app.route("/api/users").get(this.userController.getUsers);

        // Create a new user
        app.route("/api/users").post(this.userController.addNewUser);

        // Get user by username and password
        app.route("/api/users/login").post(this.userController.getUserByUsernameAndPassword);


        // Get all tasks
        app.route("/api/tasks").get(this.taskController.getTasks);

        // Create a new task
        app.route("/api/tasks").post(this.taskController.addNewTask);

        // Get task by id
        app.route("/api/tasks/:taskId").get(this.taskController.getTaskById);

        // Get task by user id
        app.route("/api/tasks/user/:userId").get(this.taskController.getTasksByUserId);

        // Update an existing task
        app.route("/api/tasks/:taskId").put(this.taskController.updateTask);

        // Delete an existing task
        app.route("/api/tasks/:taskId").delete(this.taskController.deleteTask);

    }

}