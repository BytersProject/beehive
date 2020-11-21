/* eslint-disable @typescript-eslint/naming-convention */
import { Message } from 'hiven/Collections/Message';
import { Args } from 'lexure';
import { Beehive } from '../Beehive';
import Hiven from '../Hiven';
import { Command } from './Command';

export class CommandContext {

	public readonly command: Command;

	public readonly message: Message;

	public readonly args: Args;

	public readonly hiven: Hiven;
	public readonly beehive: Beehive;

	public constructor(command: Command, message: Message, args: Args) {
		this.command = command;
		this.message = message;
		this.args = args;

		this.hiven = this.command.api.getEntity(Hiven);
		this.beehive = this.command.api.getEntity(Beehive);
	}

}
