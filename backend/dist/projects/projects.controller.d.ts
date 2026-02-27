import { ProjectsService } from "./projects.service";
export declare class ProjectsController {
    private readonly svc;
    constructor(svc: ProjectsService);
    getAll(): Promise<import("./project.entity").Project[]>;
    getOne(id: string): Promise<import("./project.entity").Project>;
    create(body: any): Promise<import("./project.entity").Project>;
    update(id: string, body: any): Promise<import("./project.entity").Project>;
    remove(id: string): Promise<import("./project.entity").Project>;
}
