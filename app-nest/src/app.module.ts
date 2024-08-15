import { Module } from '@nestjs/common';
import { TasksModule } from './entities/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './entities/tasks/task.entity';

@Module({
  imports: [
      TasksModule,
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'carlosposgres1',
          database: 'postgres',
          entities: [Task],
          synchronize:true,
      }),
      TypeOrmModule.forFeature([Task])
  ],
})
export class AppModule {}
