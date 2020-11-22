/*
	This file has been adopted from sapphire-project/framework (https://github.com/sapphire-project/framework/blob/ff86b0484f79d605295bd96ce0b1c28a147a10ed/src/lib/utils/RootDir.ts)
	Copyright © 2018-2020 The Sapphire Project and its contributors
*/

import { readFileSync } from 'fs';
import { dirname, join } from 'path';

function getProcessMainModule(): string | undefined {
	// eslint-disable-next-line no-undef
	return (Reflect.get(process, 'mainModule') as NodeJS.Module | undefined)?.path;
}

function getRequireMain(): string | undefined {
	return require.main?.path;
}

function getPackageMain(): string | undefined {
	const cwd = process.cwd();

	try {
		const file = readFileSync(join(cwd, 'package.json'), 'utf8');
		return dirname(join(cwd, JSON.parse(file).main));
	} catch {
		return undefined;
	}
}

function getProcessCwd(): string {
	return process.cwd();
}

let path: string | null = null;
export function getRootDirectory(): string {
	if (path === null) path = getProcessMainModule() ?? getRequireMain() ?? getPackageMain() ?? getProcessCwd();
	return path;
}
