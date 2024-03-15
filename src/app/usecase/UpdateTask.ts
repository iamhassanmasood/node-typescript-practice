import { Task } from '../../domain/models/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';
import moment from 'moment-timezone';

export class UpdateTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: number, title: string, description: string): Promise<Task> {
    const task: Task = await this.taskRepository.find(id);
    task.title = title;
    task.description = description;
    task.updatedAt = moment();
    return (await this.taskRepository.merge(task)) as Task;
  }
}
