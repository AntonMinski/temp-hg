export type dataResponse = {
  data;
};

export type dataStatusResponse = {
  data;
  message: string;
  success: boolean;
};

export type statusResponse = {
  status: string;
  success: boolean;
};

export type userExistResponse = {
  success: boolean,
  message: string,
  response: boolean
}

export type loginResponse = {
  success: boolean;
  message: string;
  access_token?: string;
  data?: string;
};

export type logoutResponse = {
  success: boolean;
  message: string;
  logged_out: boolean;
};

export type registerResponse = {
  success: boolean;
  message: string;
  access_token?: string;
  data?;
};

export type errorResponse = {
  message: string;
  statusCode?: number;
  toString: Function;
};
