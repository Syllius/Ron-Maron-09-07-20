import * as mongoose from "mongoose";
import { TaskSchema } from "../models/task";
import { Request, Response } from "express";

const Task = mongoose.model("Task", TaskSchema);

export class TaskController {

    public addNewTask(req: Request, res: Response) {
        let newTask = new Task(req.body);
        console.log('newTask', newTask);

        newTask.save((err, task) => {
            if (err) {
                res.send(err);
            }
            res.json("Task " + task + " has been added");
        });
    }

    public getTasks(req: Request, res: Response) {
        Task.find({}, (err, tasks) => {
            if (err) {
                res.send(err);
            }
            res.json(tasks);
        });
    }

    public getTasksByUserId(req: Request, res: Response) {
        Task.find(
            // { "user._id": req.params.userId }
            { "user._id": req.params.userId }
            // { _id: "5f08752a003fce5a6cbf1e00" }
        )
            // .populate("user") // maybe its "user" only
            .exec(function (err, tasks) {
                if (err) {
                    console.log('error', err);
                    res.send(err);
                }
                res.json(tasks);
                console.log('tasks', tasks);
            });
    }

    public getTaskById(req: Request, res: Response) {
        Task.findById(req.params.taskId, (err, task) => {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }

    public updateTask(req: Request, res: Response) {
        Task.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, (err, task) => {
            if (err) {
                res.send(err);
            }
            res.json(task);
        });
    }

    public deleteTask(req: Request, res: Response) {
        Task.findOneAndRemove({ _id: req.params.taskId }, (err, data) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: "Successfully deleted task" });
        });
    }

}