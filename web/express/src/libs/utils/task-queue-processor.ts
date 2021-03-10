'use strict';

import Utils from './utils';

export default class TaskQueueProcessor extends Utils {
  public async executeTask(task: any, retryCount: number = 0) {
    const self = this;
    try {
      await task;
    } catch (e) {
      console.warn(`[ERROR] executeTask() ${e.stack}`);
      if (e.statusCode < 500) {
        return;
      }
      if (retryCount < 5) {
        retryCount += 1;
        console.warn(`executeTask() retrying ${retryCount} time...`);
        await self.waitFor(1000 * retryCount);
        return self.executeTask(task, retryCount);
      }
    }
  }

  public async processTask(queue: Array<any>) {
    const self = this;
    do {
      const task = queue.shift();
      if (!task) {
        console.info('TaskQueue: No task in queue!');
        return;
      }
      await self.executeTask(task);
    } while (queue.length);
  }

  public enqueueTask(queue: Array<any>, queueLength: number, getTask: any) {
    while (queue.length < queueLength) {
      const task = getTask();
      if (!task) return;
      queue.push(task);
    }
  }

  public async run(concurrentTaskCount: number, queueLength: number, getTask: any): Promise<any> {
    const self = this;

    let queue = [];

    self.enqueueTask(queue, queueLength, getTask);

    while (queue.length > 0) {
      const concurrentTasks = [];
      for (let i = 0; i < concurrentTaskCount; i++) {
        concurrentTasks.push(self.processTask(queue));
      }
      await Promise.all(concurrentTasks);
      const waitTime = parseInt(process.env.TASK_QUEUE_ENQUEUE_WAIT_MS) || 1000;
      console.info(`Wait ${waitTime} ms before processing next wave`);
      await self.waitFor(waitTime);
      self.enqueueTask(queue, queueLength, getTask);
    }
  }
}
