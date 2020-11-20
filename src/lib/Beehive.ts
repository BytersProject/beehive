import { FSComponentLoader, Plugin, PluginAPI } from '@ayanaware/bento';
import * as path from 'path';
import Hiven from './Hiven';

export type ClientOptions = Record<string, unknown>;

export class Beehive implements Plugin {

	public name = 'Beehive';
	public api!: PluginAPI;

	public clientOptions: ClientOptions;

	public fsLoader: FSComponentLoader = new FSComponentLoader();

	public constructor(clientOptions?: ClientOptions) {
		this.clientOptions = clientOptions ?? {};

		this.fsLoader.name = 'BeehiveFSComponentLoader';
	}


	public setClientOptions(clientOptions: ClientOptions) {
		this.clientOptions = clientOptions;
	}

	public async onLoad() {
		const hiven: Hiven = await (this.fsLoader as any).createInstance(path.resolve(__dirname, 'hiven'));
		await this.api.bento.addComponent(hiven);
	}

}
