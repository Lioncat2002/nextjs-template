import { env } from "@/src/config";
import { importX509, jwtVerify } from "jose";

const FIREBASE_PROJECT_ID = env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const FIREBASE_CERT_URL =
	"https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com";

let publicKeys: Record<string, string> | null = null;
let lastFetched = 0;

const getFirebasePublicKeys = async (): Promise<Record<string, string>> => {
	const cacheTTL = 5 * 60 * 1000; // 5 min cache

	if (publicKeys && Date.now() - lastFetched < cacheTTL) {
		return publicKeys;
	}

	const res = await fetch(FIREBASE_CERT_URL);
	if (!res.ok) throw new Error("Failed to fetch Firebase public keys");
	publicKeys = await res.json();
	if (!publicKeys) throw new Error("Failed to parse Firebase public keys");
	lastFetched = Date.now();
	return publicKeys;
};

export const verifyFirebaseIdToken = async (
	idToken: string,
): Promise<boolean> => {
	try {
		const decodedHeader = JSON.parse(atob(idToken.split(".")[0]));
		const kid = decodedHeader.kid;
		if (!kid) throw new Error("No key ID (kid) in token header");

		const certs = await getFirebasePublicKeys();
		const x509 = certs[kid];
		if (!x509) throw new Error("Unknown key ID, token not signed by Firebase");

		const publicKey = await importX509(x509, "RS256");

		await jwtVerify(idToken, publicKey, {
			issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
			audience: FIREBASE_PROJECT_ID,
		});

		return true;
	} catch (err) {
		console.warn("Firebase ID token verification failed:", err);
		return false;
	}
};
