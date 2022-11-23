export type NumberSchemeObjectType = {
    type: 'number'
    optional: boolean
    min?: number
    max?: number
    notOneOf?: number[]
    positive?: boolean
    negative?: boolean
    moreThen?: number
    lessThen?: number
    isInteger?: boolean
    isFloat?: boolean
    checkIsUnique?: () => Promise<void | Response | any>
    [Symbol.iterator](): Generator
}