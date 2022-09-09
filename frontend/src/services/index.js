import { getAll } from "./podcasts/index";
export const podcasts = { getAll };

/**
 * @typedef {{
 *   title: string,
 *   guid: string,
 *   description: string,
 *   date: any,
 *   artwork: string|null,
 *   link: Element|null,
 *   duration: number,
 *   time: number,
 *   materialLink: null|string,
 *   state: string
 * }} Podcast
 */
