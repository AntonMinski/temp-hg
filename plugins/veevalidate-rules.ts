import { defineRule } from 'vee-validate';
import * as rules from '@vee-validate/rules';

export default defineNuxtPlugin(() => {
  Object.keys(rules)
    .filter((k) => k !== 'default')
    .forEach((rule) => {
      // eslint-disable-next-line import/namespace
      defineRule(rule, rules[rule]);
      //   console.log(rule);
    });
  defineRule('required', (value, [name]) => {
    if (!value || value.length === 0) {
      return `${name || 'This field'} is required`;
    }
    return true;
  });
  defineRule('email', (value) => {
    if (!rules.email(value)) {
      return `Enter valid email address`;
    }
    return true;
  });
  defineRule('minMax', (value, [min, max, name]) => {
    const length = value.length
    if (length && (length < min || length > max)) {
      return `${name} must be ${min} to ${max} characters long`;
    }
    return true;
  });
});
