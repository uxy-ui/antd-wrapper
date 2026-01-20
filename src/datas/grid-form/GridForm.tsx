import { Form } from 'antd';
import type { GridFormDataType, GridFormProps } from '@/datas/grid-form/index';
import { useGridFormHook } from '@/datas/grid-form/index';

export const GridForm = <
  Key extends string,
  Value,
  T extends GridFormDataType<Key, Value>,
>(
  props: GridFormProps<Key, Value, T>,
) => {
  const { form, layout, initial } = useGridFormHook(props);
  return (
    <Form
      autoComplete="off"
      form={form}
      initialValues={initial}
      {...props.config}
    >
      {layout}
    </Form>
  );
};
