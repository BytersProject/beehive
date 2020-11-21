import { Bento, FSComponentLoader } from '@ayanaware/bento';
import Beehive, { BeehiveVariable } from './lib';

export * from './lib';

export const main = () => 'this builds and pushes';

const bento = new Bento();

(async () => {
	const beehive = new Beehive({ type: 'user' });

	bento.setVariable(BeehiveVariable.BEEHIVE_TOKEN, '');
	bento.setVariable(BeehiveVariable.BEEHIVE_DEFAULT_PREFIX, '!');

	const fsloader = new FSComponentLoader();
	await fsloader.addDirectory(__dirname, 'commands');

	await bento.addPlugins([fsloader, beehive]);

	await bento.verify();
})().catch(e => {
	console.log(e);
	process.exit(1);
});
