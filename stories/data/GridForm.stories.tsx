import type { Meta, StoryObj } from '@storybook/react';
import { GridForm } from '../../src';

const gridFormMeta = {
  title: 'Data/GridForm',
  component: GridForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    config: {
      control: {
        type: 'object',
      },
      layout: {
        options: ['vertical', 'horizontal'],
        control: {
          type: 'select',
        },
      },
    },
  },
  args: { config: { layout: 'horizontal' } },
} satisfies Meta<typeof GridForm>;

export default gridFormMeta;
type Story = StoryObj<typeof gridFormMeta>;

export const Inline: Story = {
  args: {
    value: {
      name: '张三',
      age: 18,
      sex: '男',
    },
    items: [
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
    ],
    actions: [
      {
        label: '添加',
        props: {
          type: 'primary',
        },
        validated: true,
        onAction: (data) => {
          alert(`添加信息: ${JSON.stringify(data, null, 2)}`);
        },
      },
      {
        label: '修改',
        props: {
          type: 'primary',
        },
        validated: true,
        onAction: (data) => {
          alert(`修改信息: ${JSON.stringify(data, null, 2)}`);
        },
      },
    ],
  },
};

export const Login: Story = {
  args: {
    value: {
      account: 'zhangsan',
      password: '1233424',
    },
    items: [
      {
        row: 1,
        col: 1,
        span: 24,
        type: 'input',
        props: {
          placeholder: '请输入账号',
        },
        config: {
          name: 'account',
          label: '账号',
          rules: [{ required: true, message: '请输入账号' }],
        },
      },
      {
        row: 2,
        col: 1,
        span: 24,
        type: 'input',
        props: {
          placeholder: '请输入密码',
          type: 'password',
        },
        config: {
          name: 'password',
          label: '密码',
          rules: [{ required: true, message: '请输入密码' }],
        },
      },
    ],
    actions: [
      {
        label: '登录',
        props: {
          type: 'primary',
        },
        validated: true,
        onAction: (data) => {
          alert(`登录信息: ${JSON.stringify(data, null, 2)}`);
        },
      },
      {
        label: '取消',
        props: {
          type: 'default',
          htmlType: 'reset',
        },
      },
    ],
  },
};

export const Mixed: Story = {
  args: {
    value: {
      username: 'zhangsan',
      email: 'zhangsan@example.com',
      age: 25,
      gender: 'male',
      hobbies: ['reading', 'sports'],
      description: '这是一个默认描述',
      subscribe: true,
      level: 3,
      birthday: '1998-01-01',
      salary: 8000,
      website: 'https://example.com',
      color: '#ff0000',
      upload: [],
    },
    items: [
      // 第一行 - 基础信息
      {
        row: 1,
        col: 1,
        span: 6,
        type: 'input',
        props: {
          placeholder: '请输入用户名',
        },
        config: {
          name: 'username',
          label: '用户名',
          rules: [{ required: true, message: '请输入用户名' }],
        },
      },
      {
        row: 1,
        col: 2,
        span: 6,
        type: 'input',
        props: {
          placeholder: '请输入邮箱',
          type: 'email',
        },
        config: {
          name: 'email',
          label: '邮箱',
          rules: [{ required: true, message: '请输入邮箱' }],
        },
      },
      {
        row: 1,
        col: 3,
        span: 6,
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
        col: 4,
        span: 6,
        type: 'select',
        props: {
          placeholder: '请选择等级',
          options: [
            { label: '初级', value: 1 },
            { label: '中级', value: 2 },
            { label: '高级', value: 3 },
          ],
        },
        config: {
          name: 'level',
          label: '等级',
          rules: [{ required: true, message: '请选择等级' }],
        },
      },

      // 第二行 - 单选和多选
      {
        row: 2,
        col: 1,
        span: 6,
        type: 'radio',
        props: {
          placeholder: '请选择性别',
          options: [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ],
        },
        config: {
          name: 'gender',
          label: '性别',
          rules: [{ required: true, message: '请选择性别' }],
        },
      },
      {
        row: 2,
        col: 2,
        span: 12,
        type: 'checkbox',
        props: {
          placeholder: '请选择爱好',
          options: [
            { label: '阅读', value: 'reading' },
            { label: '音乐', value: 'music' },
            { label: '运动', value: 'sports' },
            { label: '旅行', value: 'travel' },
          ],
        },
        config: {
          name: 'hobbies',
          label: '爱好',
          rules: [{ required: true, message: '请选择爱好' }],
        },
      },
      {
        row: 2,
        col: 3,
        span: 6,
        type: 'switch',
        props: {
          checkedChildren: '开启',
          unCheckedChildren: '关闭',
        },
        config: {
          name: 'subscribe',
          label: '订阅通知',
          valuePropName: 'checked',
        },
      },

      // 第三行 - 文本域和日期
      {
        row: 3,
        col: 1,
        span: 12,
        type: 'input',
        props: {
          type: 'textarea',
          placeholder: '请输入个人描述',
          rows: 4,
        },
        config: {
          name: 'description',
          label: '个人描述',
        },
      },
      {
        row: 3,
        col: 2,
        span: 6,
        type: 'date-picker',
        props: {
          placeholder: '请选择生日',
        },
        config: {
          name: 'birthday',
          label: '生日',
        },
      },
      {
        row: 3,
        col: 3,
        span: 6,
        type: 'color-picker',
        props: {
          placeholder: '请选择颜色',
        },
        config: {
          name: 'color',
          label: '喜欢的颜色',
        },
      },

      // 第四行 - 其他输入组件
      {
        row: 4,
        col: 1,
        span: 6,
        type: 'input',
        props: {
          placeholder: '请输入薪资',
          type: 'number',
          addonAfter: '元',
        },
        config: {
          name: 'salary',
          label: '期望薪资',
        },
      },
      {
        row: 4,
        col: 2,
        span: 6,
        type: 'input',
        props: {
          placeholder: '请输入网址',
        },
        config: {
          name: 'website',
          label: '个人网站',
        },
      },
      {
        row: 4,
        col: 3,
        span: 12,
        type: 'upload',
        props: {
          placeholder: '请上传文件',
          multiple: true,
          buttonText: '上传文件',
          buttonProps: {
            icon: '1',
          },
        },
        config: {
          name: 'upload',
          label: '附件上传',
        },
      },
    ],
    actions: [
      {
        label: '提交',
        props: {
          type: 'primary',
        },
        validated: true,
        onAction: (data) => {
          alert(`提交信息: ${JSON.stringify(data, null, 2)}`);
        },
      },
      {
        label: '重置',
        props: {
          type: 'default',
          htmlType: 'reset',
        },
      },
    ],
  },
};
