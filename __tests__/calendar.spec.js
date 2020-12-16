import { mount } from '@vue/test-utils';
import AlertReminder from '../src/components/alert/AlertReminder.vue';

describe('Alert', () => {
  it('has data', () => {
    expect(typeof AlertReminder.data).toBe('function');
  })
})
