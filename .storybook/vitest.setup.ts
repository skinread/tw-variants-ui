import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react';
import * as projectAnnotations from './preview';

// This is required to initialize Storybook in the browser
const annotations = setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);

beforeAll(annotations.beforeAll);
