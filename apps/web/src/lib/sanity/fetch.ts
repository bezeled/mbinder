import { client } from "./client";

/**
 * Fetch data from Sanity. Returns null when Sanity is not configured
 * (e.g. before a memorybinder project has been provisioned).
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  if (!client) return null;
  return client.fetch<T>(query, params);
}
