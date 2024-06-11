import { IdGenerator } from './index'

export default class SequenceIdGenerator implements IdGenerator<number> {
    private static BASE_TIMESTAMP = 0x176b986fc00
    private host = (Math.random() * 0x40000000) & 0xef80
    private sequence = 0

    generate(): number {
        const timestamp = BigInt(Date.now() - SequenceIdGenerator.BASE_TIMESTAMP) & BigInt(0x1fffffffff)
        const sequence = (this.sequence++ & 0x7f) + this.host

        return Number(timestamp << BigInt(16)) + sequence
    }
}
