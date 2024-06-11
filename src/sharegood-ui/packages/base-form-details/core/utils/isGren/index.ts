import SequenceIdGenerator from './SequenceIdGenerator'

export interface IdGenerator<T> {
    generate(): T
}

const idGen: IdGenerator<number> = new SequenceIdGenerator()

export default idGen

export const createUUID = (): number => idGen.generate()
