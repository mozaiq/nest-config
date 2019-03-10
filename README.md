## Description

Nest configuration module based on [rc](https://www.npmjs.com/package/rc)

## Installation

```bash
$ npm i --save @mozaiq/nest-config
```

## Usage

Create application config class decorated with [class-transformer](https://www.npmjs.com/package/class-transformer) and [class-validator](https://www.npmjs.com/package/class-validator) decorators

```typescript
export class ApplicationConfig {
  @IsDefined()
  @IsString()
  readonly prop: string;
}
```

Import the config module

```typescript
import { ConfigModule } from '@mozaiq/nest-config';
import { ApplicationConfig } from './app.config.ts';

@Module({
  imports: [
    ConfigModule.forRoot('APPLICATION_NAME', ApplicationConfig)
  ],
  providers: [...],
})
export class AuthModule {}
```

Save properties in `.APPLICATION_NAMErc`

```
prop = VALUE
```

Inject the config in services or controllers

```typescript
@Injectable()
export class MyService {
  constructor(private appConfig: ApplicationConfig) {}
}
```

## License

[MIT licensed](LICENSE).
