export type ConfigFieldNameType = {
  message: string;
  value?: number | number[];
};

export type ValidatorConfigType = {
  [key: string]: {
    [key: string]: any;
    isRequired?: ConfigFieldNameType;
    isEmail?: ConfigFieldNameType;
  };
};