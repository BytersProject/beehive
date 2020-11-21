/* eslint-disable @typescript-eslint/naming-convention */
export class UserError extends Error {

	public readonly identifier: string;

	public constructor(type: string, message: string) {
		super(message);
		this.name = 'UserError';
		this.identifier = type;
	}

}
