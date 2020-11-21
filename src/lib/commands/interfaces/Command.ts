import { Component, ComponentAPI, Entity } from '@ayanaware/bento';
import { Awaited } from '../../utils/Types';
import { CommandContext } from '../CommandContext';
import { CommandDefinition } from './CommandDefinition';

export interface Command extends Component {
	api: ComponentAPI;
	parent: Entity;
	definition: CommandDefinition;

	run(ctx: CommandContext): Awaited<any>;
}
