import { defineRule } from 'vee-validate';
import * as rules from '@vee-validate/rules';
import { min } from '@vee-validate/rules';

export default defineNuxtPlugin(() => {
  Object.keys(rules)
    .filter((k) => k !== 'default')
    .forEach((rule) => {
      // eslint-disable-next-line import/namespace
      defineRule(rule, rules[rule]);
      //   console.log(rule);
    });
  defineRule('required', (value: string, []: [], ctx): string | boolean => {
    if (!value || value.length === 0) {
      return `${ctx.field || 'This field'} is required`;
    }
    return true;
  });
  defineRule("requiredDepends", (value: string, [otherField, otherValue]: [otherField: string, otherValue: string | number], ctx): string | boolean => {
    console.log(ctx);
    console.log(ctx.form[otherField], otherField, otherValue);

    if( ctx.form[otherField] === otherValue && !value) {
      return `${ctx.field || 'This field'} is required`;
    }
    return true
  })
  defineRule('email', (value: string): string | boolean => {
    if (!rules.email(value)) {
      return `Enter valid email address`;
    }
    return true;
  });
  defineRule('minMax', (value: string, [min, max]: [min: number, max: number], ctx): string | boolean => {
    const length = value.length;
    if (length && (length < min || length > max)) {
      return `${ctx.field} must be ${min} to ${max} characters long`;
    }
    return true;
  });
  defineRule("passwordMatch", (password: string, [passwordConfirmation]: [other: string], ctx): string | boolean => {
    if( password && ctx.form[passwordConfirmation] && password !== ctx.form[passwordConfirmation] ) {
      return `Password does not match`;
    }
    return true
  })

});

