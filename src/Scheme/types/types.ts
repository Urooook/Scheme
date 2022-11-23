import NumberScheme from "../NumberScheme/NumberScheme";
import StringScheme from "../StringScheme/StringScheme";
import IterableScheme from "../IterableScheme/IterableScheme";
import BooleanScheme from "../BooleanScheme/BooleanScheme";
import {ValuesObjectNumberElementType} from "../AbstracrScheme";

export type Optional = {
    optional:  boolean
}

export type SchemeContract = NumberScheme | StringScheme | IterableScheme | BooleanScheme;

export enum ValidatorTypes {
    number = 'number',
    string = 'string',
    iterable = 'iterable',
    boolean = 'boolean',
}

export type PartialScheme = Record<string, NumberScheme | StringScheme | BooleanScheme | IterableScheme> & {
    [Symbol.iterator](): Generator<ValuesObjectNumberElementType>
}