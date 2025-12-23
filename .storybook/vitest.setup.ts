import { beforeAll } from 'vitest';
import { setProjectAnnotations } from '@storybook/react';
import * as projectAnnotations from './preview';

// This is required to initialize Storybook in the browser
const annotations = setProjectAnnotations([projectAnnotations]);

beforeAll(annotations.beforeAll);
