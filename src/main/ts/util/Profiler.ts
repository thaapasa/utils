let lastTime: number = new Date().getTime()

function elapsedMs(): number {
  const now = new Date().getTime()
  const elapsed = now - lastTime
  lastTime = now
  return elapsed
}

function padLeft(str: any, width: number, padding: string = " "): string {
  let res = String(str)
  while (res.length < width) {
    res = padding + res
  }
  return res
}

const doLogging: boolean = true

export function profileLog(...args: any[]) {
  if (doLogging) {
    // tslint:disable-next-line no-console
    console.log.apply(null, [
      `[PROFILER +${padLeft(elapsedMs(), 4)} ms]`,
      ...args
    ])
  }
}
