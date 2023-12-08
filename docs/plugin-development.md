# Plugin Development

Since the `Plugin Module` is written with NestJS technology, the plugin should also be developed using NestJS.

## Plugin Requirements

While creating the plugin we need to provide the necessary parameters. Example plugin settings that we must provide in plugin's `package.json` as follows:

```json
{
	...
	"pluginModule": {
		"name": "hello-world-overrider",
		"type": "example-app",
		"displayName": "Hello World Overrider"
	},
	...
}
```

| Variable Name | Description                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| name          | This key is the plugin name. It can be used as.                                                          |
| type          | This key contains the value "plugin" and specifies that the package is an nestjs-plugin-module plugin.   |
| displayName   | This key is the human readable name of the plugin.                                                       |


The project you write a plugin for needs to be added to the plugin as a package. Plugin development is based on dependency injection feature of NestJS.

```json
{
	...
	"peerDependencies": {
		"example-service": "^1.0.0"
	}
	...
}
```

## Creating Plugins

The manipulation of the `getHello` and `getHelloWord` methods within the `PluginExampleService` defined in `PluginExampleModule` is exemplified.

```ts
import { Module } from "@nestjs/common";
import { PluginExampleService } from "./plugin-example.service";

@Module({
  providers: [{ provide: "PluginExampleService", useClass: PluginExampleService }],
  exports: ["PluginExampleService"],
})
export class PluginExampleModule {}
```

```ts
import { Injectable } from "@nestjs/common";

@Injectable({})
export class PluginExampleService {
  private textsToAppend: string[];
  constructor() {
    this.textsToAppend = [];
  }
  getHello(): string {
    return this.getHelloWorld() + this.textsToAppend.join(" ");
  }

  getHelloWorld(): string {
    return "Hello World!";
  }

  appendText(text: string): void {
    this.textsToAppend.push(text);
  }
}
```

### Method Override Example

You can override a function and manipulate its intended operation, assigning its return value as desired.

```ts
import { Inject, Injectable } from "@nestjs/common";

import { BasePlugin } from "nestjs-pugin-module";
import { PluginExampleService } from "example-service";
import { pluginModule } from "../package.json";

@Injectable()
export class HelloWorldOverriderPlugin extends BasePlugin {
  @Inject("PluginExampleService")
  private pluginExampleService: PluginExampleService;
  constructor() {
    super(pluginModule);
  }

  private getHelloWorld(): string {
    return "Hello World overriden!";
  }

  async load(): Promise<void> {
    this.pluginExampleService.getHelloWorld = this.getHelloWorld;
    return Promise.resolve();
  }
}
```

### Method Appender Example

It is possible to manipulate any operation within the method. In the example below, data transfer to the variable textsToAppend is facilitated using the appendText method. The transferred data is then added to the return value within the getHello method.

```ts
import { Inject, Injectable } from "@nestjs/common";

import { BasePlugin } from "nestjs-pugin-module";
import { PluginExampleService } from "example-service";
import { pluginModule } from "../package.json";

@Injectable()
export class HelloWorldOverriderPlugin extends BasePlugin {
  @Inject("PluginExampleService")
  private pluginExampleService: PluginExampleService;
  constructor() {
    super(pluginModule);
  }

  async load(): Promise<void> {
    this.pluginTestService.appendText("Text Example");
    return Promise.resolve();
  }
}
```

You can explore the [Authentication Service](https://github.com/BrewInteractive/authentication-service-nestjs) for comprehensive examples. The [Token Service](https://github.com/BrewInteractive/authentication-service-nestjs/blob/main/src/token/token.service.ts) has been customized by writing a plugin. By examining the [Hasura Plugin](https://github.com/BrewInteractive/authentication-service-nestjs-hasura-plugin), you can see how the Token Service is manipulated.