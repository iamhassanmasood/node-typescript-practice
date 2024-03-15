import { Task } from '../../domain/models/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class GetTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: number): Promise<Task> {
    return (await this.taskRepository.find(id)) as Task;
  }
}
