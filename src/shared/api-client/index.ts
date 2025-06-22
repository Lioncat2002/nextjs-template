import { env } from "@/src/config";
import type { Options } from "ky";
import ky from "ky";

type RequestOptions = Options;

const apiClient = ky.create({
	prefixUrl: `${env.NEXT_PUBLIC_API_URL}/api/v1`,
	retry: {
		limit: 2,
	},
	timeout: false,
	hooks: {
		beforeRequest: [
			async (request) => {
				if (typeof window === "undefined") {
					// Server-side requests
				}

				if (typeof window !== "undefined") {
					// Client-side requests
				}
			},
		],
		afterResponse: [
			async (_request, _options, response) => {
				if (typeof window === "undefined") {
					// Server-side requests
				}

				if (typeof window !== "undefined") {
					// Client-side requests
				}
			},
		],
	},
});

export const api = {
	get<T>(url: string, options?: RequestOptions): Promise<T> {
		return apiClient
			.get(url, {
				...options,
			})
			.json<T>();
	},
	post<T>(url: string, options?: RequestOptions): Promise<T> {
		return apiClient
			.post(url, {
				...options,
			})
			.json<T>();
	},
	put<T>(url: string, options?: RequestOptions): Promise<T> {
		return apiClient
			.put(url, {
				...options,
			})
			.json<T>();
	},
	patch<T>(url: string, options?: RequestOptions): Promise<T> {
		return apiClient
			.patch(url, {
				...options,
			})
			.json<T>();
	},
	delete<T>(url: string, options?: RequestOptions): Promise<T> {
		return apiClient
			.delete(url, {
				...options,
			})
			.json<T>();
	},
};
