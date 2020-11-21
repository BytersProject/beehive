import { Component, ComponentAPI, Inject, PluginReference } from '@ayanaware/bento';
import { Client } from 'hiven';
import { Beehive } from '../';
import { BeehiveVariable } from '../BeehiveVariable';
import { HivenEvents } from './Events';

export class Hiven implements Component {

	public name = 'Hiven';
	public api!: ComponentAPI;
	public parent: PluginReference = Beehive;

	public client!: Client;

	@Inject() private beehive!: Beehive;

	public async onLoad() {
		await this.connect();
	}

	public async connect() {
		const token = this.api.getVariable<string>({ 'name': BeehiveVariable.BEEHIVE_TOKEN, 'default': null });

		this.client = new Client(this.beehive.clientOptions as any);
		this.api.forwardEvents(this.client, Object.values(HivenEvents));

		return this.client.connect(token);
	}

}
