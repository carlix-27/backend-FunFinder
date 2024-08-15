import {Injectable, NotFoundException} from '@nestjs/common';

import {Task, TaskStatus} from "./task.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";


@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>,
    ) {}

    async getAllTasks(): Promise<Task[]>{
        return await this.tasksRepository.find();
    }

    async createTask(title: string, description: string): Promise<Task>{
        const task = this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.PENDING
        });
        await this.tasksRepository.save(task);
        return task;
    }

    async editTask(id: number, title: string, description: string) {
        console.log('Este es el id que consigo en service: ', id);
        const task = await this.tasksRepository.findOne({where:{id}});

        if(!task){
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        task.title = title;
        task.description = description;

        await this.tasksRepository.save(task);

        return task;
    }

    async deleteTask(id: number): Promise<void>{
        await this.tasksRepository.delete(id);
    }
}
