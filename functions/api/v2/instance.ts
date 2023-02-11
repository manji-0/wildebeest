import type { Env } from 'wildebeest/backend/src/types/env'
import { cors } from 'wildebeest/backend/src/utils/cors'
import { DEFAULT_THUMBNAIL } from 'wildebeest/backend/src/config'
import type { InstanceConfigV2 } from 'wildebeest/backend/src/types/configs'
import { getVersion } from 'wildebeest/config/versions'

export const onRequest: PagesFunction<Env, any> = async ({ env, request }) => {
	const domain = new URL(request.url).hostname
	return handleRequest(domain, env.DATABASE, env)
}

export async function handleRequest(domain: string, db: D1Database, env: Env) {
	const headers = {
		...cors(),
		'content-type': 'application/json; charset=utf-8',
	}

	const res: InstanceConfigV2 = {
		domain,
		title: env.INSTANCE_TITLE,
		version: getVersion(),
		source_url: 'https://github.com/manji-0/wildebeest',
		description: env.INSTANCE_DESCR,
		thumbnail: {
			url: DEFAULT_THUMBNAIL,
		},
		languages: ['ja', 'en'],
		configuration: {
			statuses: {
				max_characters: 3000,
				max_media_attachments: 4,
				characters_reserved_per_url: 23
			},
			media_attachments: {
				supported_mime_types: [
					"image/jpeg",
					"image/png",
					"image/gif",
					"image/webp"
				],
				image_size_limit: 20971520,
				image_matrix_limit: 33554432,
				video_size_limit: 0,
				video_frame_rate_limit: 0,
				video_matrix_limit: 0
			},
			polls: {
				max_options: 4,
				max_characters_per_option: 50,
				min_expiration: 300,
				max_expiration: 2629746
			}
		}
		registrations: {
			// Registration is disabled because unsupported by Wildebeest. Users
			// should go through the login flow and authenticate with Access.
			enabled: false,
		},
		contact: {
			email: env.ADMIN_EMAIL,
		},
		rules: [],
	}

	return new Response(JSON.stringify(res), { headers })
}
