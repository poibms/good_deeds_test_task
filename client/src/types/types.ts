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

export type DeedsType = {
  _id: string;
  title?: string;
  description?: string;
  ownerId?: string;
  [string: string]: any;
};

export type DeedCreds = {
  title?: string;
  description?: string;
}

export type UpdateDeedCreds = {
  _id: string;
  title?: string;
  description?: string;
}