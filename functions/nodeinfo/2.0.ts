import type { Env } from 'wildebeest/backend/src/types/env'
import { WILDEBEEST_VERSION } from 'wildebeest/config/versions'
import { cors } from 'wildebeest/backend/src/utils/cors'

const headers = {
	...cors(),
	'content-type': 'application/json',
	'cache-control': 'max-age=259200, public',
}

export const onRequest: PagesFunction<Env, any> = async () => {
	return handleRequest()
}

export async function handleRequest(): Promise<Response> {
	const res = {
		version: '2.1',
		software: {
			name: 'wildebeest',
			version: WILDEBEEST_VERSION,
			repository: 'https://github.com/manji-0/wildebeest',
		},
		protocols: ['activitypub'],
		usage: {
			users: {
				total: 1,
				activeMonth: 1,
				activeHalfyear: 1
			}
		},
		openRegistrations: false,
		metadata: {
			upstream: {
				name: 'mastodon',
				version: '3.5.1'
			}
		},
	}
	return new Response(JSON.stringify(res), { headers })
}
