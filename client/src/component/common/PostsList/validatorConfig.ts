import { DeedCreds } from '../../../types/types';
import { ValidatorConfigType } from '../../../types/validator.types';

type ConfigType = {
  [Property in keyof DeedCreds]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  title: {
    isRequired: {
      message: 'Поле "Имя" обязательно для заполнения',
    },
  },
  description: {
    isRequired: {
      message: 'Поле "Имя" обязательно для заполнения',
    },
  },
};

export default validatorConfig;
