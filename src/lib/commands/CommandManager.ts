/* eslint-disable @typescript-eslint/naming-convention */
import { Component, ComponentAPI, Inject, PluginReference, Subscribe } from '@ayanaware/bento';
import { Message } from 'hiven/Collections/Message';
import { Beehive } from '../Beehive';
import Hiven, { HivenEvents } from '../Hiven';
import { CommandContext } from './CommandContext';
import { Command } from './Command';

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
		const aliases = definition?.aliases ?? [];

		const clashes = aliases.filter(alias => this.aliases.has(alias));
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
		if (parsedPrefix === null) return null;

		const prefixLess = message.content.slice(parsedPrefix.length).trim();
		const spaceIndex = prefixLess.indexOf(' ');
		const name = spaceIndex === -1 ? prefixLess : prefixLess.slice(0, spaceIndex);
		// TODO(QuantumlyTangled): Handle no found name

		const command = this.findCommand(name);
		// TODO(QuantumlyTangled): Handle no found command
		if (command === null) return null;

		const parameters = spaceIndex === -1 ? '' : prefixLess.substr(spaceIndex + 1).trim();

		const args = await command.preParse(message, parameters);

		const ctx = new CommandContext(command, message, args);
		await command.run(ctx, args);
	}

	private getPrefix(content: string, prefixes: readonly string[] | string | null): string | null {
		if (prefixes === null) return null;
		if (typeof prefixes === 'string') return content.startsWith(prefixes) ? prefixes : null;
		return prefixes.find(prefix => content.startsWith(prefix)) ?? null;
	}

}
