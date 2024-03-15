import { Task } from '../../domain/models/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class ListTasks {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(): Promise<Task[]> {
    return (await this.taskRepository.findAll()) as Task[];
  }
}
