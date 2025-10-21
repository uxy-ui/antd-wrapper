import type { Meta, StoryObj } from "@storybook/react";
import { WorkBench } from "../../src";

const workBenchMeta = {
  title: "Layout/WorkBench",
  component: WorkBench,
  decorators: [
    (Story, _context) => {
      return (
        <div
          style={{
            height: "60vh",
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof WorkBench>;

export default workBenchMeta;
type Story = StoryObj<typeof workBenchMeta>;

export const Areas: Story = {
  args: {
    areas: {
      root: (
        <div style={{ width: "100%", height: "100%", backgroundColor: "red" }}>
          root
        </div>
      ),
      nav: (
        <div style={{ width: "100%", height: "100%", backgroundColor: "blue" }}>
          nav
        </div>
      ),
      home: (
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "green" }}
        >
          home
        </div>
      ),
      menu: (
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "yellow" }}
        >
          menu
        </div>
      ),
      path: (
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "orange" }}
        >
          path
        </div>
      ),
      main: (
        <div style={{ width: "100%", height: "100%", backgroundColor: "pink" }}>
          main
        </div>
      ),
      toggle: (
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "purple" }}
        >
          toggle
        </div>
      ),
      footer: (
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "brown" }}
        >
          footer
        </div>
      ),
    },
  },
};

export const Base: Story = {
  args: {},
};
