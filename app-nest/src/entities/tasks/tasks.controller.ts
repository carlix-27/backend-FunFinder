import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto } from './dto/task.dto';
import { Task } from './task.entity';

@Controller('/api/tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Post('/create-task')
  createTask(@Body() newTask: createTaskDto) {
    return this.taskService.createTask(newTask.title, newTask.description);
  }

  @Patch('/edit-task/:id')
  editTask(@Param('id') id: number, @Body('title') title: string, @Body('description') description: string,): Promise<Task> {
    return this.taskService.editTask(id, title, description);
  }

  @Delete('/delete-task/:id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(id);
  }
}
