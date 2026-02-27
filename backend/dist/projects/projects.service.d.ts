import { Repository } from "typeorm";
import { Project } from "./project.entity";
export declare class ProjectsService {
    private readonly repo;
    constructor(repo: Repository<Project>);
    findAll(): Promise<Project[]>;
    findOne(id: number): Promise<Project>;
    create(data: Partial<Project>): Promise<Project>;
    update(id: number, data: Partial<Project>): Promise<Project>;
    remove(id: number): Promise<Project>;
}
