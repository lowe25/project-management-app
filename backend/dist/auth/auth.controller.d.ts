import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
