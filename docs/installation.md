# Plugin Module Installation

## Installing the Plugin Module Package

In a NestJS project, it is possible to use the [Plugin Module](https://www.npmjs.com/package/@brewww/nestjs-plugin-module) package by installing it. This method allows you to use custom plugins you have written to customize the project.

```
npm i @brewww/nestjs-plugin-module --save
```

```
yarn add @brewww/nestjs-plugin-module
```

### Usage

In the initial stage, the plugin module needs to be imported into the app.module. When importing, the following parameters should be passed;

| Parameter Name | Description                                                                                   | Required | Default      |
| -------------- | --------------------------------------------------------------------------------------------- | -------- | ------------ |
| imports        | The plugin should be imported for the service or module for which the plugin will be written. | NO       | -            |
| directories    | It is used to customize the directory where plugins should be searched for.                   | NO       | node_modules |

In the example below, it searches and detects plugins specific to the `example-app` type under `node_modules` and includes them in the system. Plugins can only be written for the services defined within `PluginExampleModule`.

```ts
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { PluginModule } from '@brewww/nestjs-plugin-module';
import { PluginExampleModule } from './plugin-example/plugin-example.module';

@Module({
  imports: [
    PluginModule.registerAsync({
      imports: [forwardRef(() => PluginExampleModule)],
    }),
  ],
  providers: [AppService],
  exports: [AppService],
  controllers: [AppController],
})
export class AppModule {}
```
