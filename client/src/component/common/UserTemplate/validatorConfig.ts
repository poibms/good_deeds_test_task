import { userUpdateCreds } from '../../../types/types';
import { ValidatorConfigType } from '../../../types/validator.types';

type ConfigType = {
  [Property in keyof userUpdateCreds]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  username: {
    isRequired: {
      message: 'Поле "Имя" обязательно для заполнения',
    },
  },
};

export default validatorConfig;
