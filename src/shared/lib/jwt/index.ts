import { type JWTPayload, SignJWT, jwtVerify } from "jose";

const alg = "HS256";

function getSecret(secret: string) {
	return new TextEncoder().encode(secret);
}

/**
 * Create a signed JWT with arbitrary payload
 */
export async function createToken(
	payload: JWTPayload,
	secret: string,
	ttlSeconds: number = 3600 * 60, // default: 60h
): Promise<string> {
	const now = Math.floor(Date.now() / 1000);

	return await new SignJWT(payload)
		.setProtectedHeader({ alg, typ: "JWT" })
		.setIssuedAt(now)
		.setExpirationTime(now + ttlSeconds)
		.sign(getSecret(secret));
}

/**
 * Verify JWT and return payload (throws if invalid/expired)
 * @throws {JWTExpired} if the token is expired (`exp` in the past).
 * @throws {JWTNotBefore} if the token is not yet valid (`nbf` in the future).
 * @throws {JWTClaimValidationFailed} if a claim validation (e.g. `aud`, `iss`) fails.
 * @throws {JWSSignatureVerificationFailed} if the signature is invalid (wrong secret or tampered token).
 * @throws {JWTInvalid | JWSInvalid} if the token is malformed or not a valid JWT.
 */
export async function verifyToken<T = JWTPayload>(
	token: string,
	secret: string,
): Promise<T> {
	const { payload } = await jwtVerify(token, getSecret(secret), {
		algorithms: [alg],
	});
	return payload as T;
}
