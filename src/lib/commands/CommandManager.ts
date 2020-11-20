/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ComponentAPI, Inject, PluginReference, Subscribe } from '@ayanaware/bento';
import { Message } from 'hiven/Collections/Message';
import { Beehive } from '../Beehive';
import Hiven, { HivenEvents } from '../Hiven';
import { Command } from './interfaces';

export class CommandManager implements Component {

	public name = 'CommandManager';
	public api!: ComponentAPI;
	public parent: PluginReference = Beehive;

	@Inject() private beehive!: Beehive;

	private readonly commands: Map<string, Command> = new Map();
	private readonly aliases: Map<string, string> = new Map();

	public async onChildLoad(entity: Command) {
		try {
			await this.addCommand(entity);
		} catch (e) {
			console.warn(e);
		}
	}

	public findCommand(commandAlias: string): Command|null {
		const alias = this.aliases.get(commandAlias);
		if (!alias) return null;

		const command = this.commands.get(alias);
		if (!command) throw new Error('Command with that alias could not be found.');

		return command;
	}

	protected addCommand(command: Command) {
		if (this.commands.has(command.name)) throw new Error('Command already exists with this name.');

		const { definition } = command;
		const aliases = definition.aliases ?? [];

		const clashes = definition.aliases!.filter(alias => this.aliases.has(alias));
		if (clashes.length > 0) throw new Error('The alias already exists in a command.');

		aliases.push(command.name);
		for (let alias of aliases) {
			alias = alias.toLowerCase();
			this.aliases.set(alias, command.name);
		}

		this.commands.set(command.name, command);
	}

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
