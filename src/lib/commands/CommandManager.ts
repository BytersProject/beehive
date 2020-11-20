import { Component, ComponentAPI, PluginReference, Subscribe } from '@ayanaware/bento';
import { Message } from 'hiven/Collections/Message';
import { Beehive } from '../Beehive';
import Hiven, { HivenEvents } from '../Hiven';

export class CommandManager implements Component {

	public name = 'CommandManager';
	public api!: ComponentAPI;
	public parent: PluginReference = Beehive;

	@Subscribe(Hiven, HivenEvents.Message)
	protected handleMessage(msg: Message) {
		console.log(msg);
	}

}
