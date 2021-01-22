import { action, observable, runInAction } from "mobx"
import { noop } from "shared"

type PromiseFun<T> = () => Promise<T>

export class PromiseQueue<T> {
  @observable
  private current?: Promise<any>
  @observable
  private queuedPromises: PromiseFun<any>[] = []

  currentTask?: T

  @action.bound
  async queue<X>(source: PromiseFun<X>, taskIdentifier: T): Promise<X> {
    this.queuedPromises.push(source)

    // Wait for queued items to process

    // eslint-disable-next-line no-constant-condition
    while (true) {
      while (this.current) {
        // Wait for the current item to be processed (discard the result)
        await this.current.catch(noop)
      }
      // Every waiter is signaled at this point; the one whose item is at the top of the queue will execute it
      if (this.queuedPromises[0] === source) {
        // My turn! Remove item from queue and run it
        // This is the critical part, this will cause the waiters to proceed forward
        // (next waiter will receive a correct item from the queue)
        this.queuedPromises.shift()
        return this.execute(source, taskIdentifier)
      }
    }
  }

  /**
   * This is async so that errors thrown from source() function are also caught and
   * passed on to caller.
   */
  @action.bound
  private async execute<X>(
    source: PromiseFun<X>,
    taskIdentifier: T
  ): Promise<X> {
    try {
      // Track promise while running it
      this.currentTask = taskIdentifier
      this.current = source()
      const res = await this.current
      return res
    } finally {
      runInAction(() => {
        this.current = undefined
        this.currentTask = undefined
      })
    }
  }
}
