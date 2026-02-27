import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectsModule } from "./projects/projects.module";
import { AuthModule } from "./auth/auth.module";
import * as dotenv from "dotenv";
import { DataSourceOptions } from "typeorm";

dotenv.config();

const ormConfig: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "management-system",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: true,
};

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), ProjectsModule, AuthModule],
})
export class AppModule {}
