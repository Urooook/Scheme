export type StringSchemeObjectType = {
    type: 'string'
    optional: boolean
    min?: number
    max?: number
    matches?: RegExp
    isUpperCase?: boolean
    isLowerCase?: boolean
    withSurrogatePairs?: boolean
    email?: boolean
    url?: boolean
    isTrimmed?: boolean
    date?: boolean
    checkIsUnique?: () => Promise<void | Response | any>
    [Symbol.iterator](): Generator
}