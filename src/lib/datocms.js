import { DATO_KEY } from '$env/static/private';
import { executeQuery } from '@datocms/cda-client';
export const performRequest = (
	/** @type {any} */ query,
	/** @type {import("@datocms/cda-client").ExecuteQueryOptions<unknown>} */ options
) => {
	return executeQuery(query, {
		...options,
		token: DATO_KEY
	});
};
