// Button.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Button, { IButton } from '@/components/shared/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: StoryFn = (args: IButton) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: '기본 버튼',
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: '비활성화된 버튼',
  disabled: true,
};

export const WithDescription = Template.bind({});
WithDescription.args = {
  description: '설명 텍스트',
};
