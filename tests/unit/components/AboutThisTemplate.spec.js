'use strict';

import { shallowMount } from '@vue/test-utils';
import AboutThisTemplate from '@/components/AboutThisTemplate.vue';

describe('AboutThisTemplate.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(AboutThisTemplate);
    expect(wrapper.text()).toMatch('Venom UI Template');
  });
});
