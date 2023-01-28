import { ValidatorConfigType } from '../../../types/validator.types';
import { AuthCreds } from './../../../types/types';

type ConfigType = {
  [Property in keyof AuthCreds]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  username: {
    isRequired: {
      message: 'Электронная почта обязательна для заполнения',
    },
  },
  password: {
    isRequired: {
      message: 'Поле "Пароль" обязательно для заполнения',
    },
    isMin: {
      message: 'Длинна поля "Пароль" должно быть 7 или более символов ',
    },
    isMax: {
      message: 'Длинна поля "Пароль" должно быть менее 32 символов ',
    },
  },
};

export default validatorConfig;
