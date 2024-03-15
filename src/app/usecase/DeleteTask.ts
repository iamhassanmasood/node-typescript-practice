import { Task } from '../../domain/models/Task';
import { ITaskRepository } from '../repositories/ITaskRepository';

export class DeleteTask {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: number): Promise<Task> {
    const task: Task = await this.taskRepository.find(id);
    return (await this.taskRepository.delete(task)) as Task;
  }
}
