import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: { username: string; password: string }) {
    const user = await this.usersService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async signup(signupDto: {
    username: string;
    password: string;
    firstname?: string;
    lastname?: string;
  }) {
    // Check if user exists
    const exists = await this.usersService.findByUsername(signupDto.username);
    if (exists) {
      throw new BadRequestException("Username already exists");
    }
    const hashed = await bcrypt.hash(signupDto.password, 10);
    const user = await this.usersService.createUser({
      username: signupDto.username,
      password: hashed,
      firstname: signupDto.firstname,
      lastname: signupDto.lastname,
    });
    return { message: "User created" };
  }
}
