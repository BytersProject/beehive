import { Args } from 'lexure';
import { Command, CommandContext, CommandDefinition } from '../lib';

export class Test extends Command {

	public name = 'Test';

	public definition: CommandDefinition = {
		aliases: ['hello']
	};

	public async run(ctx: CommandContext, args: Args) {
		console.log(args);
		await ctx.message.room.send('hello');
	}

}
