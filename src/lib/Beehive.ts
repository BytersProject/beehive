import { FSComponentLoader, Plugin, PluginAPI } from '@ayanaware/bento';
import * as path from 'path';
import ArgumentManager from './arguments';
import { BeehiveVariable } from './BeehiveVariable';
import CommandManager from './commands';
import Hiven from './Hiven';
import { BeehiveHook } from './utils/Types';

export type BeehivePrefix = string | readonly string[] | null;
export type BeehiveLanguage = string | null;

export type BeehivePrefixHook = BeehiveHook<BeehivePrefix>;
export type BeehiveLanguageHook = BeehiveHook<BeehiveLanguage>;

export interface ClientOptions {
	type?: 'bot' | 'user';
	fetchPrefix?: BeehivePrefixHook;
	fetchLanguage?: BeehiveLanguageHook;
}

export class Beehive implements Plugin {

	public name = 'Beehive';
	public api!: PluginAPI;

	public clientOptions: ClientOptions;

	public fsLoader: FSComponentLoader = new FSComponentLoader();

	public fetchPrefix!: BeehivePrefixHook;
	public fetchLanguage!: BeehiveLanguageHook;

	public constructor(clientOptions?: ClientOptions) {
		this.clientOptions = clientOptions ?? {};

		this.fsLoader.name = 'BeehiveFSComponentLoader';
	}


	public setClientOptions(clientOptions: ClientOptions) {
		this.clientOptions = clientOptions;
	}

	public async onLoad() {
		await this.api.bento.addPlugin(this.fsLoader);

		this.fetchPrefix
			= this.clientOptions.fetchPrefix
				?? (() => this.api.getVariable({ 'name': BeehiveVariable.BEEHIVE_DEFAULT_PREFIX, 'default': null }));
		this.fetchLanguage
			= this.clientOptions.fetchLanguage
				?? (() => this.api.getVariable({ 'name': BeehiveVariable.BEEHIVE_DEFAULT_LANGUAGE, 'default': 'en-US' }));

		const hiven: Hiven = await (this.fsLoader as any).createInstance(path.resolve(__dirname, 'Hiven'));
		await this.api.bento.addComponent(hiven);

		const argumentManager: ArgumentManager = await (this.fsLoader as any).createInstance(path.resolve(__dirname, 'arguments'));
		await this.api.bento.addComponent(argumentManager);

		const commandManager: CommandManager = await (this.fsLoader as any).createInstance(path.resolve(__dirname, 'commands'));
		await this.api.bento.addComponent(commandManager);

		const loadBuiltinArguments = this.api.getVariable({ 'name': BeehiveVariable.BEEHIVE_BUILTIN_ARGUMENTS, 'default': true });
		if (loadBuiltinArguments) return this.api.loadComponents(this.fsLoader, __dirname, 'arguments', 'builtin');

	}

}
