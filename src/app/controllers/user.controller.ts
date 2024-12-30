import { IUser } from '../types/user.types';
import { Response } from 'express';
import UserService from '../services/user.service';
import NotFoundError from '../errors/not-found.error';
import { UserViewModel } from '../models/users-view.model';
import { ParamsRequest, QueryRequest } from '../types/request.types';
import UserIdModel from '../models/user-id-param.model';
import GetUsersQueryModel from '../models/get-users-query.model';

const userController = {
    async getUsers(
        req: QueryRequest<GetUsersQueryModel>,
        res: Response<UserViewModel[]>
    ): Promise<void> {
        const result: IUser[] = await UserService.getAllUsers(
            req.query.page,
            req.query.limit
        );

        const users = result.map((u) => {
            return {
                _id: u._id,
                username: u.username,
                roles: u.roles,
            };
        });

        res.status(200).json(users);
    },

    async getUserById(
        req: ParamsRequest<UserIdModel>,
        res: Response<UserViewModel>
    ): Promise<void> {
        try {
            const result: IUser = await UserService.getUserById(req.params.id);

            const user = {
                _id: result._id,
                username: result.username,
                roles: result.roles,
            };

            res.status(200).json(user);
        } catch (err: unknown) {
            if (err instanceof NotFoundError) {
                res.sendStatus(404);
            }
        }
    },
};

export default userController;
