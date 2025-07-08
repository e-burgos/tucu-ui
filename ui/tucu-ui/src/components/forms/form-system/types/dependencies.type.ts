import { FieldValues, UseFormReturn } from 'react-hook-form';
import { FieldPathInternal, ArrayKey } from './extend-react-hook-form.type';

export type DependencyAction<TFieldValues extends FieldValues> = (
  formValues: Partial<TFieldValues>,
  methods: UseFormReturn<TFieldValues>,
  options: { index: null | number; name: string | null }
) => void;

export type Dependency<TFieldValues extends FieldValues = FieldValues> = {
  dependencies: FieldPathInternal<TFieldValues, ArrayKey>[];
  callback: DependencyAction<TFieldValues>;
};

export type FormDependencies<TFieldValues extends FieldValues = FieldValues> =
  Dependency<TFieldValues>[];
