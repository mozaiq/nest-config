import { Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import rc from 'rc';

export const configProviderFactory = (applicationName: string, applicationClass: Type<any>) => ({
  provide: applicationClass,
  useFactory: async () => {
    const plainConfig = rc(applicationName);
    const parsedConfig = plainToClass(applicationClass, plainConfig);
    const errors = await validate(parsedConfig);
    if (errors.length > 0) {
      const message = errors.map(item => ({
        property: item.property,
        children: item.children.map(child => ({
          property: child.property,
          value: child.value,
          constraints: child.constraints,
        })),
      }));

      throw new Error('Invalid configuration: \n' + JSON.stringify(message, null, 4));
    }
    return parsedConfig;
  },
});
