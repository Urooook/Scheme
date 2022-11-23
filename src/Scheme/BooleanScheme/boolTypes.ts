export type BooleanSchemeObjectType = {
    type: 'boolean'
    optional: boolean
    isTrue?: boolean
    isFalse?: boolean
    [Symbol.iterator](): Generator
}