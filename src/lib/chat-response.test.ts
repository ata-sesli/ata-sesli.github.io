import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { CHAT_UNAVAILABLE_MESSAGE, readChatReply } from './chat-response';

describe('readChatReply', () => {
	test('returns a friendly message instead of exposing an upstream error', async () => {
		const response = Response.json(
			{
				error:
					'{"error":{"code":503,"message":"This model is currently experiencing high demand.","status":"UNAVAILABLE"}}'
			},
			{ status: 503 }
		);

		assert.equal(await readChatReply(response), CHAT_UNAVAILABLE_MESSAGE);
	});
});
