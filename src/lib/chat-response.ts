export const CHAT_UNAVAILABLE_MESSAGE =
	"Sorry, Ata's AI is temporarily unavailable. Please try again in a moment.";

export async function readChatReply(response: Response): Promise<string> {
	if (!response.ok) {
		return CHAT_UNAVAILABLE_MESSAGE;
	}

	const data: unknown = await response.json();

	if (
		typeof data === 'object' &&
		data !== null &&
		'reply' in data &&
		typeof data.reply === 'string' &&
		data.reply.trim()
	) {
		return data.reply;
	}

	return CHAT_UNAVAILABLE_MESSAGE;
}
