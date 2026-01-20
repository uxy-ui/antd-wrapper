import type { Meta, StoryObj } from '@storybook/react';
import { Upload } from 'antd';
import { EnhanceTable, GridForm } from '../../src';

const enhanceTableMeta = {
  title: 'Data/EnhanceTable',
  component: EnhanceTable,
  decorators: [
    (Story, _context) => {
      return (
        <div
          style={{
            height: '550px',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    config: {
      control: {
        type: 'object',
      },
    },
  },
  args: {},
} satisfies Meta<typeof EnhanceTable>;

export default enhanceTableMeta;
type Story = StoryObj<typeof enhanceTableMeta>;

export const Base: Story = {
  args: {
    rowKey: 'key',
    columns: [
      {
        config: { title: '姓名', dataIndex: 'name' },
      },
      {
        config: { title: '年龄', dataIndex: 'age' },
      },
      {
        config: { title: '性别', dataIndex: 'sex' },
      },
      {
        config: { title: '手机号', dataIndex: 'phone' },
      },
      {
        config: { title: '邮箱', dataIndex: 'email' },
      },
      {
        config: { title: '地址', dataIndex: 'address' },
      },
      {
        config: {
          title: '创建时间',

          dataIndex: 'createdAt',
        },
        filterType: 'date',
      },
    ],
    data: Array.from({ length: 500 }).map((_, i) => ({
      key: i,
      name: `张三-${i + 1}`,
      age: 18,
      sex: '男',
      phone: '12345678901',
    })),
    expanding: {
      render: (record) => (
        <GridForm
          value={
            record as {
              name: string;
              age: number;
              sex: string;
              phone: string;
              email: string;
              address: string;
              createdAt: string;
            }
          }
          items={[
            {
              row: 1,
              col: 1,
              span: 8,
              type: 'input',
              props: {
                placeholder: '请输入姓名',
              },
              config: {
                name: 'name',
                label: '姓名',
                rules: [{ required: true, message: '请输入姓名' }],
              },
            },
            {
              row: 1,
              col: 2,
              span: 8,
              type: 'input',
              props: {
                placeholder: '请输入年龄',
                type: 'number',
              },
              config: {
                name: 'age',
                label: '年龄',
                rules: [{ required: true, message: '请输入年龄' }],
              },
            },
            {
              row: 1,
              col: 3,
              span: 8,
              type: 'radio',
              props: {
                placeholder: '请选择性别',
                options: [
                  {
                    label: '男',
                    value: '男',
                  },
                  {
                    label: '女',
                    value: '女',
                  },
                ],
              },
              config: {
                name: 'sex',
                label: '性别',
                rules: [{ required: true, message: '请选择性别' }],
              },
            },
            {
              row: 2,
              col: 1,
              span: 8,
              type: 'input',
              props: {
                placeholder: '请输入手机号',
                type: 'number',
              },
              config: {
                name: 'phone',
                label: '手机号',
                rules: [{ required: true, message: '请输入手机号' }],
              },
            },
            {
              row: 2,
              col: 2,
              span: 8,
              type: 'input',
              props: {
                placeholder: '请输入邮箱',
              },
              config: {
                name: 'email',
                label: '邮箱',
                rules: [{ required: true, message: '请输入邮箱' }],
              },
            },
            {
              row: 2,
              col: 3,
              span: 8,
              type: 'input',
              props: {
                placeholder: '请输入地址',
              },
              config: {
                name: 'address',
                label: '地址',
                rules: [{ required: true, message: '请输入地址' }],
              },
            },
            {
              row: 3,
              col: 1,
              span: 8,
              type: 'date-picker',
              props: {
                placeholder: '请选择创建时间',
              },
              config: {
                name: 'createdAt',
                label: '创建时间',
                rules: [{ required: true, message: '请选择创建时间' }],
              },
            },
          ]}
        />
      ),
    },
  },
};
export const Full: Story = {
  args: {
    rowKey: 'key',
    columns: [
      {
        config: { title: '姓名', dataIndex: 'name' },
      },
      {
        config: { title: '年龄', dataIndex: 'age' },
      },
      {
        config: { title: '性别', dataIndex: 'sex' },
      },
      {
        config: { title: '手机号', dataIndex: 'phone' },
      },
      {
        config: { title: '邮箱', dataIndex: 'email' },
      },
      {
        config: { title: '地址', dataIndex: 'address' },
      },
      {
        config: {
          title: '创建时间',

          dataIndex: 'createdAt',
        },
        filterType: 'date',
      },
    ],
    data: Array.from({ length: 500 }).map((_, i) => ({
      key: i,
      name: `张三-${i + 1}`,
      age: 18,
      sex: '男',
      phone: '12345678901',
    })),
    actions: [
      {
        key: 'upload',
        label: '上传',
        props: {
          type: 'primary',
          style: {
            justifySelf: 'flex-end',
          },
          children: (
            <Upload
              onChange={(file) => {
                console.log(file);
              }}
            >
              上传
            </Upload>
          ),
        },
      },
      {
        key: 'insert',
        label: '新增',
        props: {
          type: 'primary',
          style: {
            justifySelf: 'flex-end',
          },
        },
        onAction: (total, filtered, selected) => {
          alert(
            `新增: ${JSON.stringify({
              total: total,
              filtered: filtered,
              selected: selected,
            })}`,
          );
        },
        offset: 22,
      },
    ],
    expanding: {
      render: (record) => (
        <GridForm
          value={
            record as {
              name: string;
              age: number;
              sex: string;
              phone: string;
              email: string;
              address: string;
              createdAt: string;
            }
          }
          items={[
            {
              row: 1,
              col: 1,
              span: 8,
              type: 'input',
              props: {
                placeholder: '请输入姓名',
              },
              config: {
                name: 'name',
                label: '姓名',
                rules: [{ required: true, message: '请输入姓名' }],
              },
            },
            {
              row: 1,
              col: 2,
              span: 8,
              type: 'input',
              props: {
                placeholder: '请输入年龄',
                type: 'number',
              },
              config: {
                name: 'age',
                label: '年龄',
                rules: [{ required: true, message: '请输入年龄' }],
              },
            },
            {
              row: 1,
              col: 3,
              span: 8,
              type: 'radio',
              props: {
                placeholder: '请选择性别',
                options: [
                  {
                    label: '男',
                    value: '男',
                  },
                  {
                    label: '女',
                    value: '女',
                  },
                ],
              },
              config: {
                name: 'sex',
                label: '性别',
                rules: [{ required: true, message: '请选择性别' }],
              },
            },
            {
              row: 2,
              col: 1,
              span: 8,
              type: 'input',
              props: {
                placeholder: '请输入手机号',
                type: 'number',
              },
              config: {
                name: 'phone',
                label: '手机号',
                rules: [{ required: true, message: '请输入手机号' }],
              },
            },
            {
              row: 2,
              col: 2,
              span: 8,
              type: 'input',
              props: {
                placeholder: '请输入邮箱',
              },
              config: {
                name: 'email',
                label: '邮箱',
                rules: [{ required: true, message: '请输入邮箱' }],
              },
            },
            {
              row: 2,
              col: 3,
              span: 8,
              type: 'input',
              props: {
                placeholder: '请输入地址',
              },
              config: {
                name: 'address',
                label: '地址',
                rules: [{ required: true, message: '请输入地址' }],
              },
            },
            {
              row: 3,
              col: 1,
              span: 8,
              type: 'date-picker',
              props: {
                placeholder: '请选择创建时间',
              },
              config: {
                name: 'createdAt',
                label: '创建时间',
                rules: [{ required: true, message: '请选择创建时间' }],
              },
            },
          ]}
        />
      ),
    },
    selection: {
      show: true,
    },
    pagination: {
      // config: { pageSizeOptions: [5, 15, 25, 35, 450] },
    },
  },
};
