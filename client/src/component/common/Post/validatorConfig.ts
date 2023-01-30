import { DeedCreds } from '../../../types/types';
import { ValidatorConfigType } from '../../../types/validator.types';

type ConfigType = {
  [Property in keyof DeedCreds]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  title: {},
  description: {},
};

export default validatorConfig;
