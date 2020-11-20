import { Component, Subscribe } from '@ayanaware/bento';
import { Message } from 'hiven/Collections/Message';
import Hiven, { HivenEvents } from '../Hiven';

export class CommandManager implements Component {

	public name = 'CommandManager';

	@Subscribe(Hiven, HivenEvents.Message)
	protected handleMessage(msg: Message) {
		console.log(msg);
	}

}
