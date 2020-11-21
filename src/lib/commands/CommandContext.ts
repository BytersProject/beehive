/* eslint-disable @typescript-eslint/naming-convention */
import { Message } from 'hiven/Collections/Message';
import { Beehive } from '../Beehive';
import Hiven from '../Hiven';
import { Command } from './interfaces';

export class CommandContext {

	public readonly command: Command;

	public readonly message: Message;

	public readonly hiven: Hiven;
	public readonly beehive: Beehive;

	public constructor(command: Command, message: Message) {
		this.command = command;
		this.message = message;

		this.hiven = this.command.api.getEntity(Hiven);
		this.beehive = this.command.api.getEntity(Beehive);
	}

}
