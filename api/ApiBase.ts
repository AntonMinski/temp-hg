import { useNuxtApp } from '#app';
import HomePageApi from './modules/homePageApi';
import AuthApi from '~/api/modules/authApi';
import ContributorApi from '~/api/modules/contributorApi';
import BlogApi from '~/api/modules/blogApi';
import BookApi from '~/api/modules/bookApi';
import ClipApi from '~/api/modules/clipApi';
import LibraryApi from '~/api/modules/libraryApi';
import PageApi from '~/api/modules/pageApi';
import ExploreApi from '~/api/modules/exploreApi';

class ApiBase {
  nuxtApp;
  vueApp;
  $auth;
  $http;
  $toast;
  baseUrl: string;
  _ongoingRequests;
  home;
  auth;
  contributor;
  blog;
  book;
  clip;
  library;
  page;
  explore;
  constructor() {
    // App
    this.nuxtApp = useNuxtApp();
    this.vueApp = this.nuxtApp.vueApp;
    this.$auth = this.nuxtApp.$auth;
    this.$http = this.nuxtApp.$http;
    this.$toast = this.vueApp.$toast;

    this.baseUrl = this.$http.getBaseURL();

    this._ongoingRequests = {};

    // Apis
    this.home = new HomePageApi(this);
    this.auth = new AuthApi(this);
    this.contributor = new ContributorApi(this);
    this.blog = new BlogApi(this);
    this.book = new BookApi(this);
    this.clip = new ClipApi(this);
    this.library = new LibraryApi(this);
    this.page = new PageApi(this);
    this.explore = new ExploreApi(this);
  }

  /** Get requests are syncronized based on their url and query string to prevent the same requests be fired at the same time */
  async get(url: string, params) {
    let _urlKey = url;
    const requestUrl = new URL(this.baseUrl + url);

    if (params) {
      if (params.page && params.itemsPerPage) {
        params.take = params.itemsPerPage;
        params.skip = params.itemsPerPage * (params.page - 1);
      }
      /** Clear up empty params */
      for (const prop of Object.keys(params)) {
        if (!params[prop]) {
          delete params[prop];
        }
      }
      requestUrl.search = new URLSearchParams(params).toString();
      _urlKey += requestUrl.search;
    }

    if (this._ongoingRequests[_urlKey]) {
      return new Promise(async (s, e) => {
        const result = await this._ongoingRequests[_urlKey];
        // deep copy the result for every other caller to prevent shared data mutations
        return s(JSON.parse(JSON.stringify(result)));
      });
    }

    const request = this.$http.get(requestUrl.toString());
    this._ongoingRequests[_urlKey] = this._handleRequest(request, null);

    return new Promise((s, e) => s(this._ongoingRequests[_urlKey])).finally(
      () => delete this._ongoingRequests[_urlKey]
    );
  }

  async post(url, payload, options = null) {
    options = {
      showSuccessToast: true,
      ...options,
    };

    const requestUrl = new URL(this.baseUrl + url);
    const request = this.$http.post(requestUrl.toString(), {
      body: payload,
    });

    return this._handleRequest(request, options);
  }

  async patch(url, payload, options = null) {
    options = {
      showSuccessToast: true,
      ...options,
    };

    const requestUrl = new URL(this.baseUrl + url);
    const request = this.$http.patch(requestUrl.toString(), {
      body: payload,
    });

    return this._handleRequest(request, options);
  }

  async delete(url) {
    const requestUrl = new URL(this.baseUrl + url);
    const request = this.$http.delete(requestUrl.toString());

    return this._handleRequest(request, { showSuccessToast: true });
  }

  async _handleRequest(request, options = null) {
    options = {
      showSuccessToast: false,
      showBadRequestToast: true,
      ...options,
    };
    const requestIncrementTimeout = null;

    try {
      const result = await request;
      if (result.ok) {
        if (result.status === 'warning') {
          this.$toast?.show(result.message, { type: 'info' });
        } else if (options.showSuccessToast && (result.status === 'success' || result.status === 200)) {
          this.$toast?.show(result.message || 'success', { type: 'success', duration: 5000 });
        }
      } else {
        showErrorToast(result, this.$toast);
      }
      return result;
    } catch (err) {
      const result = err.response;
      showErrorToast(result, this.$toast);
      return null;
    } finally {
      if (requestIncrementTimeout) {
        clearTimeout(requestIncrementTimeout);
      }
    }
  }
}

export default {
  install: function (vueApp) {
    Object.defineProperty(vueApp, '$api', { value: new ApiBase() });
  },
};

function showErrorToast(result, toaster) {
  if (result.status === 400 || result.status === 409) {
    if (options.showBadRequestToast) {
      toaster?.show(result.message || 'SomethingWentWrong', { type: 'error' });
    }
    return result;
  } else if (result.status === 401) {
    toaster?.show('SessionExpired', { type: 'error' });
    return null;
  } else if (result.status === 404) {
    toaster?.show('NotFound', { type: 'error' });
    return null;
  } else {
    toaster?.show(result.message || 'ServerErrorTryAgainLater', {
      type: 'error',
    });
  }
}
