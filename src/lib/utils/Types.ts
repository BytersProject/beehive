import { Message } from 'hiven/Collections/Message';

/**
 * @private
 */
export type Awaited<T> = PromiseLike<T> | T;

/**
 * @private
 */
export interface BeehiveHook<R> {
	(message: Message): Awaited<R>;
}
