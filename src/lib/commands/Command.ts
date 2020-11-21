import { Component, ComponentAPI, Entity } from '@ayanaware/bento';
import { Awaited } from '../utils/Types';
import { CommandContext } from './CommandContext';
import { CommandManager } from './CommandManager';
import { CommandDefinition } from './interfaces/CommandDefinition';

export abstract class Command implements Component {

	public abstract name: string;

	public api!: ComponentAPI;
	public parent: Entity = CommandManager;
	public abstract definition: CommandDefinition;

	public abstract run(ctx: CommandContext): Awaited<any>;

}
