export type AuthCreds = {
  username: string;
  password: string;
};

export type userUpdateCreds = {
  username: string;
}

export type UserType = {
  _id?: string;
  username?: string;
  role?: string;
  friends? : any[]
  [string: string]: any;
};