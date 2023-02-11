import type { Env } from 'wildebeest/backend/src/types/env'
import { cors } from 'wildebeest/backend/src/utils/cors'
import { DEFAULT_THUMBNAIL } from 'wildebeest/backend/src/config'
import { getVersion } from 'wildebeest/config/versions'

export const onRequest: PagesFunction<Env, any> = async ({ env, request }) => {
	const domain = new URL(request.url).hostname
	return handleRequest(domain, env)
}

export async function handleRequest(domain: string, env: Env) {
	const headers = {
		...cors(),
		'content-type': 'application/json; charset=utf-8',
	}

	const res: any = {}

	res.thumbnail = DEFAULT_THUMBNAIL

	// Registration is disabled because unsupported by Wildebeest. Users
	// should go through the login flow and authenticate with Access.
	// The documentation is incorrect and registrations is a boolean.
	res.registrations = false

	res.version = getVersion()
	res.rules = []
	res.uri = domain
	res.title = env.INSTANCE_TITLE
	res.email = env.ADMIN_EMAIL
	res.description = env.INSTANCE_DESCR
	res.languages = ["ja", "en"]
	res.approval_required = false
	res.invites_enabled = true
	res.configuration = {
		statuses: {
			max_characters: 3000,
			max_media_attachments: 1,
			characters_reserved_per_url: 23
		},
		res.media_attachments = {
			supported_mime_types: [
				"image/jpeg",
				"image/png",
				"image/gif",
				"image/webp"
			],
			image_size_limit: 20971520
		},
		polls: {
			max_options: 4,
			max_characters_per_option: 50,
			min_expiration: 300,
			max_expiration: 2629746
		}
	}
	res.short_description = res.description

	return new Response(JSON.stringify(res), { headers })
}
