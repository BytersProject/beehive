import { Command, CommandContext, CommandDefinition } from '../lib';
import { Args } from '../lib/arguments';

export class Test extends Command {

	public name = 'Test';

	public definition: CommandDefinition = {
		aliases: ['hello']
	};

	public async run(ctx: CommandContext, args: Args) {
		console.log(args);
		const res = await args.repeat('string');

		await ctx.message.room.send(res.join('\n'));
	}

}
