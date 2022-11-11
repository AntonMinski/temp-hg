// eslint-disable-next-line @typescript-eslint/no-unused-vars
class NuxtError extends Error {
  statusMessage: string;
  statusCode: number;
  fatal: boolean;
  unhanded: boolean;
  __nuxt_error: boolean;
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
