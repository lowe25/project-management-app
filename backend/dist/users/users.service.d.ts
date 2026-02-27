import { Repository } from "typeorm";
import { User } from "./user.entity";
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    validateUser(username: string, password: string): Promise<User | null>;
    findByUsername(username: string): Promise<User | null>;
    createUser(userData: Partial<User>): Promise<User>;
}
