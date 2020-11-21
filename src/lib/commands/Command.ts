import { Component, ComponentAPI, Entity, Inject } from '@ayanaware/bento';
import { Message } from 'hiven/Collections/Message';
import * as Lexure from 'lexure';
import { Args } from '../arguments/Args';
import { ArgumentManager } from '../arguments/ArgumentManager';
import { Awaited } from '../utils/Types';
import { CommandContext } from './CommandContext';
import { CommandManager } from './CommandManager';
import { CommandDefinition } from './interfaces/CommandDefinition';

export abstract class Command implements Component {

	public abstract name: string;

	public api!: ComponentAPI;
	public parent: Entity = CommandManager;
	public definition?: CommandDefinition;

	@Inject() public argumentManager!: ArgumentManager;

	private lexer = new Lexure.Lexer();

	public constructor() {
		this.lexer.setQuotes([
			['"', '"'], // Double quotes
			['“', '”'], // Fancy quotes (on iOS)
			['「', '」'] // Corner brackets (CJK)
		]);
	}

	public preParse(message: Message, parameters: string): Awaited<Args> {
		const parser = new Lexure.Parser(this.lexer.setInput(parameters).lex());
		const args = new Lexure.Args(parser.parse());
		return new Args(message, this, args);
	}

	public abstract run(ctx: CommandContext, args: Args): Awaited<any>;

}
