// Input.stories.tsx
import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Input from '@/components/shared/Input';

export default {
  title: 'Components/Input',
  component: Input,
  argTypes: {
    onChange: { action: 'changed' },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'username',
  type: 'text',
  placeholder: 'Enter your username',
  value: '',
};

export const WithError = Template.bind({});
WithError.args = {
  name: 'email',
  type: 'email',
  placeholder: 'Enter your email',
  value: '',
  error: ['Invalid email address'],
};
