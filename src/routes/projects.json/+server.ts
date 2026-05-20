import { json } from '@sveltejs/kit';
import projects from '$lib/projects';

export const prerender = true;

export function GET() {
	return json(projects);
}
