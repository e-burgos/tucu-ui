// Internal utility types (no longer exported from react-hook-form v7+)
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;

export type BrowserNativeObject = Date | FileList | File;

export type IsEqual<T1, T2> = T1 extends T2
  ? (<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2
    ? true
    : false
  : false;

export type IsTuple<T extends ReadonlyArray<unknown>> =
  number extends T['length'] ? false : true;

export type TupleKeys<T extends ReadonlyArray<unknown>> = Exclude<
  keyof T,
  keyof unknown[]
>;

export type ValidateResult = string | boolean | undefined;

export type ArrayKey = '[number]';

type AnyIsEqual<T1, T2> = T1 extends T2
  ? IsEqual<T1, T2> extends true
    ? true
    : never
  : never;

type PathImpl<
  K extends string | number,
  V,
  TraversedTypes,
  ArrayK extends string | number
> = V extends Primitive | BrowserNativeObject
  ? `${K}`
  : true extends AnyIsEqual<TraversedTypes, V>
  ? `${K}`
  : `${K}` | `${K}.${FieldPathInternal<V, ArrayK, TraversedTypes | V>}`;

export type FieldPathInternal<
  T,
  ArrayK extends string | number,
  TraversedTypes = T
> = T extends ReadonlyArray<infer V>
  ? IsTuple<T> extends true
    ? {
        [K in TupleKeys<T>]-?: PathImpl<
          K & string,
          T[K],
          TraversedTypes,
          ArrayK
        >;
      }[TupleKeys<T>]
    : PathImpl<ArrayK, V, TraversedTypes, ArrayK>
  : {
      [K in keyof T]-?: PathImpl<K & string, T[K], TraversedTypes, ArrayK>;
    }[keyof T];

export type InternalValidate<TFieldValue, TFormValues> = (
  value: TFieldValue,
  formValues: TFormValues,
  options: {
    index: number | null;
    name: string | null;
  }
) => ValidateResult | Promise<ValidateResult>;

// Types are already exported above
