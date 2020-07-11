import * as mongoose from "mongoose";
import { UserSchema } from "../models/user";
import { Request, Response } from "express";

const User = mongoose.model("User", UserSchema);

export class UserController {

    public addNewUser(req: Request, res: Response) {
        let newUser = new User(req.body);

        newUser.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    }

    public getUsers(req: Request, res: Response) {
        User.find({}, (err, users) => {
            if (err) {
                res.send(err);
            }
            res.json(users);
        });
    }

    public getUserByUsernameAndPassword(req: Request, res: Response) {
        console.log('username', req.body.username);
        User.findOne({ $and: [{ "username": req.body.username }, { "password": req.body.password }] }
        )
            // .populate("user") // maybe its "user" only
            .exec(function (err, user) {
                if (err) {
                    console.log('error', err);
                    res.send(err);
                }
                res.json(user);
                console.log('user', user);
            });
    }

}