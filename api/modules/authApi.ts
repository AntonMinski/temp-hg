import type {
  loginResponse,
  registerResponse,
  logoutResponse,
  errorResponse,
  userExistResponse,
} from '~/types/response';
import type { userData, organizationData } from '~/types/registrationData';

export default class AuthApi {
  private base;

  constructor(base) {
    this.base = base;
  }

  async login(email: String, password: String) {
    try {
      const response: loginResponse = await this.base.$auth.loginWith('local', { body: { email, password } });
      const user = {
        slug: response.slug,
        email: email,
      };
      this.base.$auth.setUser(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async register(data: userData | organizationData): Promise<registerResponse | errorResponse> {
    return this.base.post('/register', data);
  }

  async logout(): Promise<logoutResponse | errorResponse> {
    return this.base.post('/logout');
  }

  async getDashboard<T>(slug: String): Promise<T> {
    return this.base.get(`/dashboard/${slug}`);
  }

  async getProfile<T>(slug: String): Promise<T> {
    return this.base.get(`/profile/${slug}`);
  }

  async editProfile<T>(slug: String, profileData): Promise<T> {
    return this.base.patch(`/profile/${slug}`, { body: profileData });
  }

  async checkUserExist(email: String): Promise<userExistResponse> {
    return this.base.get('check-user-exist', { email });
  }
}
