export type ProjectLink = {
	label: 'GitHub' | 'Website' | 'Demo' | 'Docs' | 'Release';
	url: string;
};

export type Project = {
	name: string;
	kicker: string;
	description: string;
	tags: string;
	links: ProjectLink[];
};

const projects: Project[] = [
	{
		name: 'RChat',
		kicker: 'P2P Communication',
		description: 'Local-first encrypted peer-to-peer communication without central chat servers.',
		tags: 'P2P, Privacy, Rust',
		links: [
			{ label: 'GitHub', url: 'https://github.com/ata-sesli/rchat' },
			{ label: 'Website', url: 'https://ata-sesli.github.io/rchat/' }
		]
	},
	{
		name: 'RVault',
		kicker: 'Secure Local Storage',
		description: 'Local-first password manager focused on security, portability, and ownership.',
		tags: 'Security, Local-First, Cryptography',
		links: [
			{ label: 'GitHub', url: 'https://github.com/ata-sesli/rvault' },
			{ label: 'Website', url: 'https://ata-sesli.github.io/rvault/' }
		]
	},
	{
		name: 'Kiro',
		kicker: 'Language & Tooling',
		description: 'A scripting language ecosystem with Rust-powered execution and editor tooling.',
		tags: 'Language Design, Compiler, Tooling',
		links: [
			{ label: 'GitHub', url: 'https://github.com/ata-sesli/kiro-lang' },
			{ label: 'Website', url: 'https://ata-sesli.github.io/kiro-lang/' }
		]
	},
	{
		name: 'TOPS',
		kicker: 'Terminal Orchestration',
		description: 'Terminal-native orchestration for evidence-grounded AI workflows.',
		tags: 'Agents, Automation, CLI',
		links: [
			{ label: 'GitHub', url: 'https://github.com/ata-sesli/tops' },
			{ label: 'Website', url: 'https://ata-sesli.github.io/tops/' }
		]
	},
	{
		name: 'Black Dome',
		kicker: 'Linux Security',
		description: 'Linux security control plane for verifying intended server behavior.',
		tags: 'Security, Observability, Infrastructure',
		links: [{ label: 'GitHub', url: 'https://github.com/ata-sesli/black-dome' }]
	},
	{
		name: 'Newsprint',
		kicker: 'Local-First Reading',
		description:
			'Local-first macOS news reader for controlled technical reading without algorithmic feeds.',
		tags: 'macOS, Local-First, Reading',
		links: [{ label: 'GitHub', url: 'https://github.com/ata-sesli/newsprint' }]
	},
	{
		name: 'Octa',
		kicker: 'AArch64 Kernel',
		description: 'Experimental AArch64 kernel for learning computer systems from first principles.',
		tags: 'Kernel, AArch64, Zig',
		links: [{ label: 'GitHub', url: 'https://github.com/ata-sesli/octa' }]
	},
	{
		name: 'MiniObserver',
		kicker: 'Wi-Fi Sensing',
		description: 'Camera-free room awareness system using ESP32-S3 Wi-Fi CSI.',
		tags: 'Embedded, Signal Processing, Privacy',
		links: [{ label: 'GitHub', url: 'https://github.com/ata-sesli/mini-observer' }]
	}
];

export default projects;
