/**
 * PDF Catalog
 *
 * This file defines all PDF documents used across the site.
 * To add a new PDF:
 * 1. Place the PDF file in the appropriate /public/pdfs/ folder
 * 2. Add an entry to the corresponding array below
 */

export interface PdfEntry {
	/** Unique identifier for the entry */
	id: string;
	/** Display title */
	title: string;
	/** Optional short description */
	description?: string;
	/** Path to the PDF file (relative to public/, e.g. /pdfs/gdds/my-doc.pdf) */
	file: string;
	/** Optional date string for display */
	date?: string;
}

/** Resume configuration. Only one resume PDF is supported. */
export const resume = {
	file: '/pdfs/Rajveer_Shukla_Resume.pdf',
};

/** Personal Game Design Documents archive */
export const gdds: PdfEntry[] = [
	{
		id: 'dictator-quest',
		title: 'Dictator Quest',
		description: 'A game design document exploring themes of power and political strategy.',
		file: '/pdfs/gdds/G.D.D. Dictator Quest.pdf',
	},
	{
		id: 'dominion-control',
		title: 'Dominion Control',
		description: 'A strategic control-based game design document.',
		file: '/pdfs/gdds/G.D.D. Dominion Control.pdf',
	},
	{
		id: 'dusha',
		title: 'Dusha',
		description: 'A narrative-driven game design document with emotional depth.',
		file: '/pdfs/gdds/G.D.D. Dusha.pdf',
	},
	{
		id: 'power-shard',
		title: 'Power Shard',
		description: 'A fantasy game design document centered around magical artifacts.',
		file: '/pdfs/gdds/G.D.D. of Power Shard.pdf',
	},
];

/** Game Deconstruction documents archive */
export const deconstructions: PdfEntry[] = [
	{
		id: 'temple-run',
		title: 'Temple Run',
		description: 'A deep deconstruction and analysis of the endless runner classic.',
		file: '/pdfs/deconstructions/Game Deconstruction of Temple Run.pdf',
	},
];
