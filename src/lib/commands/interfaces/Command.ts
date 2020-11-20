import { Component, Entity } from '@ayanaware/bento';
import { CommandDefinition } from './CommandDefinition';

export interface Command extends Component {
	parent: Entity;
	definition: CommandDefinition;
}
