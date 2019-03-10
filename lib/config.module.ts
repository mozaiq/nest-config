import { DynamicModule, Module, Type } from '@nestjs/common';

import { configProviderFactory } from './config.factory';

@Module({})
export class ConfigModule {
  static forRoot(applicationName: string, applicationClass: Type<any>): DynamicModule {
    return {
      module: ConfigModule,
      providers: [configProviderFactory(applicationName, applicationClass)],
      exports: [applicationClass],
    };
  }
}
