import type { Meta, StoryObj } from "@storybook/react";
import { HashRouteContextProvider, useRouteContext } from "../../src";

const routeMeta = {
  title: "Context/HashRoute",
  component: HashRouteContextProvider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof HashRouteContextProvider>;

export default routeMeta;
type Story = StoryObj<typeof routeMeta>;
const TestComponent = () => {
  const { route, setRoute } = useRouteContext()!;

  return (
    <div>
      <h3>当前路由: {route}</h3>
      <button onClick={() => setRoute("/about")}>切换到关于页面</button>
      <button onClick={() => setRoute("/")}>切换到首页</button>
    </div>
  );
};
export const Base: Story = {
  args: {
    children: <TestComponent />,
  },
};
