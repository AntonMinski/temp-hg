export type nuxtError = {
  statusCode: Number;
  fatal?: Boolean;
  unhanded?: Boolean;
  statusMessage: String;
  __nuxt_error: Boolean;
  toString: Function;
};
