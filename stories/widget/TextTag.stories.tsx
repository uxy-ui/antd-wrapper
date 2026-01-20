import type { Meta, StoryObj } from '@storybook/react';
import { TextTag } from '../../src';

const textTagMeta = {
  title: 'Widget/TextTag',
  component: TextTag,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof TextTag>;

export default textTagMeta;
type Story = StoryObj<typeof textTagMeta>;

export const Custom: Story = {
  args: {
    items: ['张三', '123', '苹果', '沙滩', '帽子'].map((text) => ({
      text,
      config: {
        color: Math.random() > 0.5 ? 'green' : 'red',
      },
    })),
  },
};

export const Base: Story = {
  args: {
    items: ['张三', '123', '苹果', '沙滩', '帽子'].map((text) => ({ text })),
  },
};
