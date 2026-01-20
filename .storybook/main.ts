import type { StorybookConfig } from 'storybook-react-rsbuild';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    {
      name: 'storybook-addon-rslib',
    },
  ],
  framework: {
    name: 'storybook-react-rsbuild',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    check: true,
  },
  rsbuildFinal: (config) => {
    return {
      ...config,
      output: {
        ...config.output,
        assetPrefix: './',
      },
    };
  },
};

export default config;
