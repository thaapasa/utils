import "jest"

import { PromiseQueue } from "./promiseQueue"
import { timeout } from "./Timeout"

describe("action queuer", () => {
  it("should run items in order", async () => {
    let running = false
    let itemsRun = 0

    function createTesterFor(turn: number, doThrow?: boolean) {
      return async () => {
        expect(`${turn}-${running}`).toBe(`${turn}-false`)
        expect(q.currentTask).toEqual(`${turn}`)
        expect(itemsRun).toBe(turn - 1)
        running = true
        await timeout(20)
        itemsRun++
        running = false
        if (doThrow) {
          throw new Error("Kaboom")
        }
        return turn
      }
    }

    const q = new PromiseQueue()
    expect(q.currentTask).toBeUndefined()

    expect(running).toBe(false)
    const p1 = q.queue(createTesterFor(1), "1")
    const p2 = q.queue(createTesterFor(2, true), "2")
    const p3 = q.queue(createTesterFor(3), "3")

    await expect(p3).resolves.toBe(3)
    expect(q.currentTask).toBeUndefined()
    expect(itemsRun).toBe(3)
    expect(running).toBe(false)

    await expect(p2).rejects.toBeDefined()
    await expect(p1).resolves.toBe(1)
  })
})
