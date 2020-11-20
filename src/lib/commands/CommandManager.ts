import { Component, ComponentAPI, Inject, PluginReference, Subscribe } from '@ayanaware/bento';
import { Message } from 'hiven/Collections/Message';
import { Beehive } from '../Beehive';
import Hiven, { HivenEvents } from '../Hiven';

export class CommandManager implements Component {

	public name = 'CommandManager';
	public api!: ComponentAPI;
	public parent: PluginReference = Beehive;

	@Inject() private beehive!: Beehive;

	@Subscribe(Hiven, HivenEvents.Message)
	protected async handleMessage(message: Message) {
		const prefixes = await this.beehive.fetchPrefix(message);
		const parsedPrefix = this.getPrefix(message.content, prefixes);

		console.log(parsedPrefix);
	}

	private getPrefix(content: string, prefixes: readonly string[] | string | null): string | null {
		if (prefixes === null) return null;
		if (typeof prefixes === 'string') return content.startsWith(prefixes) ? prefixes : null;
		return prefixes.find(prefix => content.startsWith(prefix)) ?? null;
	}

}
