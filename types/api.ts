export type apiBase = {
  nuxtApp;
  vueApp;
  $auth;
  $http;
  $toast;
  baseUrl: string;
  _ongoingRequests;
  page;
  auth;
  get: Function;
  post: Function;
  patch: Function;
  delete: Function;
};
