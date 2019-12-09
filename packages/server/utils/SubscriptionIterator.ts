export type SubscriptionTransform = (value: any) => any
export type SubscriptionListener = (value: JSON) => Promise<void>

interface Handlers {
  onStart?: (listener: SubscriptionListener) => void
  onCompleted?: (listener: SubscriptionListener) => void
  transform?: SubscriptionTransform
}

export default class SubscriptionIterator implements AsyncIterator<any> {
  [Symbol.asyncIterator]() {
    return this
  }
  done = false
  pushQueue = [] as any[]
  pullQueue = [] as any[]
  transform?: SubscriptionTransform
  onStart?: (listener: SubscriptionListener) => void
  onCompleted?: (listener: SubscriptionListener) => void
  pushValue: SubscriptionListener = async (input) => {
    const value = this.transform ? await this.transform(input) : input
    if (value !== undefined) {
      const resolver = this.pullQueue.shift()
      if (resolver) {
        resolver({value, done: false})
      } else {
        this.pushQueue.push(value)
      }
    }
  }

  constructor({onStart, onCompleted, transform}: Handlers) {
    this.transform = transform
    this.onStart = onStart
    this.onCompleted = onCompleted
    onStart?.(this.pushValue)
  }

  pullValue = () => {
    return new Promise<IteratorResult<any>>((resolve) => {
      if (this.done) resolve({done: true, value: undefined})
      const value = this.pushQueue.shift()
      if (value) {
        resolve({value, done: false})
      } else {
        this.pullQueue.push(resolve)
      }
    })
  }

  close = () => {
    this.done = true
    this.onCompleted?.(this.pushValue)
  }

  next() {
    return this.pullValue()
  }

  return() {
    this.close()
    return Promise.resolve({done: true, value: undefined})
  }

  throw(error) {
    this.close()
    return Promise.resolve({done: true, value: error})
  }
}
