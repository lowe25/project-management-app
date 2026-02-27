import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ProjectsService } from "./projects.service";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly svc: ProjectsService) {}

  @Get()
  getAll() {
    return this.svc.findAll();
  }

  @Get(":id")
  getOne(@Param("id") id: string) {
    return this.svc.findOne(Number(id));
  }

  @Post()
  create(@Body() body: any) {
    return this.svc.create(body);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() body: any) {
    return this.svc.update(Number(id), body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.svc.remove(Number(id));
  }
}
