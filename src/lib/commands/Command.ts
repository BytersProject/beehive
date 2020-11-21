import { Component, ComponentAPI, Entity } from '@ayanaware/bento';
import { Args, Lexer, Parser } from 'lexure';
import { Awaited } from '../utils/Types';
import { CommandContext } from './CommandContext';
import { CommandManager } from './CommandManager';
import { CommandDefinition } from './interfaces/CommandDefinition';

export abstract class Command implements Component {

	public abstract name: string;

	public api!: ComponentAPI;
	public parent: Entity = CommandManager;
	public abstract definition: CommandDefinition;

	private lexer = new Lexer();

	public constructor() {
		this.lexer.setQuotes([
			['"', '"'], // Double quotes
			['“', '”'], // Fancy quotes (on iOS)
			['「', '」'] // Corner brackets (CJK)
		]);
	}

	public preParse(parameters: string): Awaited<Args> {
		const parser = new Parser(this.lexer.setInput(parameters).lex());
		const args = new Args(parser.parse());
		return args;
	}

	public abstract run(ctx: CommandContext, args: Args): Awaited<any>;

}
