// Repositories listed here are included and pinned first in this exact order.
// Other public repositories need a description and the `portfolio` topic;
// they follow the featured projects ordered by their latest GitHub update.
export const featuredRepoOrder = [
	'zova',
	'rchat',
	'rvault',
	'kiro-lang',
	'tops',
	'black-dome',
	'newsprint',
	'octa',
	'mini-observer'
];

export const hiddenRepos = [
	'ata-sesli.github.io',
	'ata-sesli',
	'zova-docs',
	'rchat-android',
	'godot',
	'AssetLib',
	'CatchTheKenny',
	'SurvivorBird',
	'archer'
];

export const projectOverrides: Record<
	string,
	Partial<{
		name: string;
		kicker: string;
		description: string;
		tags: string;
		website: string;
	}>
> = {
	zova: {
		description: 'SQLite-backed local storage for records, objects, vectors, and graphs.',
		tags: 'SQLite, Storage, Vectors, Zig'
	},
	rchat: {
		name: 'RChat',
		kicker: 'P2P Chat',
		description:
			'Serverless-discovery P2P chat with direct messaging, file transfer, and live calls.',
		tags: 'P2P, Discovery, Rust'
	},
	rvault: {
		name: 'RVault',
		kicker: 'TUI Password Manager',
		description:
			'Terminal password manager with encrypted storage, clipboard flow, and scriptable commands.',
		tags: 'TUI, Passwords, Rust'
	},
	'kiro-lang': {
		name: 'Kiro',
		kicker: 'Scripting Language',
		description:
			'Modern scripting language that blends Go-style concurrency with Python-level readability, powered by Rust.',
		tags: 'Scripting, Concurrency, Rust'
	},
	tops: {
		name: 'TOPS',
		kicker: 'AI-Native Terminal',
		description:
			'AI-native terminal operations system in a TUI, with grounded answers and policy-controlled execution.',
		tags: 'AI, TUI, CLI'
	},
	'black-dome': {
		name: 'Black Dome',
		kicker: 'Linux Security Plane',
		description:
			'Security plane for Linux servers with deterministic rules, behavioral checks, and scenario simulation.',
		tags: 'Linux, Security, TUI'
	},
	newsprint: {
		name: 'Newsprint',
		kicker: 'RSS Newspaper',
		description: 'Newspaper-style RSS reader for chosen feeds without recommendation algorithms.',
		tags: 'RSS, macOS, Swift'
	},
	octa: {
		name: 'Octa',
		kicker: 'AArch64 Kernel',
		description: 'Experimental AArch64 kernel in Zig.',
		tags: 'AArch64, Kernel, Zig'
	},
	'mini-observer': {
		name: 'MiniObserver',
		kicker: 'Wi-Fi Person Counter',
		description: 'Motion detection and person counting via Wi-Fi signals.',
		tags: 'ESP32, Wi-Fi CSI, Sensing'
	}
};
