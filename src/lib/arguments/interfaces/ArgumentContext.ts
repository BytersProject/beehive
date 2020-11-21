import { Message } from 'hiven/Collections/Message';
import { Command } from '../../commands';

export interface ArgumentContext extends Record<PropertyKey, unknown> {
	message: Message;
	command: Command;
}
