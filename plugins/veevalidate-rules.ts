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
});
