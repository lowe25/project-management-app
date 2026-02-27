import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./project.entity";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    const p = await this.repo.findOne({ where: { id } });
    if (!p) throw new NotFoundException("Project not found");
    return p;
  }

  create(data: Partial<Project>) {
    const ent = this.repo.create(data);
    return this.repo.save(ent);
  }

  async update(id: number, data: Partial<Project>) {
    const p = await this.findOne(id);
    Object.assign(p, data);
    return this.repo.save(p);
  }

  async remove(id: number) {
    const p = await this.findOne(id);
    return this.repo.remove(p);
  }
}
