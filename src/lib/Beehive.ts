import { FSComponentLoader, Plugin, PluginAPI } from '@ayanaware/bento';
import { Message } from 'hiven/Collections/Message';
import * as path from 'path';
import { BeehiveVariable } from './BeehiveVariable';
import CommandManager from './commands';
import Hiven from './Hiven';
import { Awaited } from './utils/Types';

export type BeehivePrefix = string | readonly string[] | null;

export interface BeehivePrefixHook {
	(message: Message): Awaited<BeehivePrefix>;
}

export interface ClientOptions {
	type?: 'bot';
	fetchPrefix?: BeehivePrefixHook;
}

export class Beehive implements Plugin {

	public name = 'Beehive';
	public api!: PluginAPI;

	public clientOptions: ClientOptions;

	public fsLoader: FSComponentLoader = new FSComponentLoader();

	public fetchPrefix!: BeehivePrefixHook;

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
				?? (() => this.api.getVariable({ 'name': BeehiveVariable.DEFAULT_PREFIX, 'default': null }));

		const hiven: Hiven = await (this.fsLoader as any).createInstance(path.resolve(__dirname, 'Hiven'));
		await this.api.bento.addComponent(hiven);

		const commandManager: CommandManager = await (this.fsLoader as any).createInstance(path.resolve(__dirname, 'commands'));
		await this.api.bento.addComponent(commandManager);
	}

}
