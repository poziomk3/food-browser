import { SeparatePipe } from './separate.pipe'

describe('SeparateOnCommaPipe', () => {
  it('create an instance', () => {
    const pipe = new SeparatePipe()
    expect(pipe).toBeTruthy()
  })
})
