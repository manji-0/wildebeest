import type { Env } from 'wildebeest/backend/src/types/env'
import type { JWK } from 'wildebeest/backend/src/webpush/jwk'

export const DEFAULT_THUMBNAIL =
	'https://imagedelivery.net/hPmdm7LZzFimkJSiRHiLSA/d485037d-53fe-46e5-6b31-f3ecb34fc500/avatar'

export function getVAPIDKeys(env: Env): JWK {
	const value: JWK = JSON.parse(env.VAPID_JWK)
	return value
}
