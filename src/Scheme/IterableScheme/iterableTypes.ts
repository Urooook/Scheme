export type IterableSchemeObjectType = {
    type: 'iterable'
    optional: boolean
    min?: number
    max?: number
    lengthMoreThen?: number
    has?: number | string
    [Symbol.iterator](): Generator
}