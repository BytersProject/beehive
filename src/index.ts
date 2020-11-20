import { Bento } from '@ayanaware/bento';
import Beehive, { BeehiveVariable } from './lib';

export * from './lib';

export const main = () => 'this builds and pushes';

const bento = new Bento();

(async () => {
	const beehive = new Beehive({ type: 'user' });

	bento.variables.setVariable(BeehiveVariable.BEEHIVE_TOKEN, 'no u');

	await bento.addPlugins([beehive]);

	await bento.verify();
})().catch(e => {
	console.log(e);
	process.exit(1);
});

