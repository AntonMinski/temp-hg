export type userData = {
  user_type: 1;
  email: string;
  password: string;
  password_confirmation: string;
  iagree: string;
  first_name?: string;
  last_name?: string;
};

export type organizationData = {
  user_type: 0;
  email: string;
  password: string;
  password_confirmation: string;
  iagree: string;
  organization_name: string;
  representative_fnm?: string;
  representative_lnm?: string;
};
