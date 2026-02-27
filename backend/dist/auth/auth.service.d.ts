import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login(loginDto: {
        username: string;
        password: string;
    }): Promise<{
        access_token: string;
    }>;
    signup(signupDto: {
        username: string;
        password: string;
        firstname?: string;
        lastname?: string;
    }): Promise<{
        message: string;
    }>;
}
