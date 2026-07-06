/**
 * foldshim — shape adapters to feed legacy state into foldkit.
 * Source: https://sjgant80-hub.github.io/foldkit/foldshim.js
 */

export interface AdoptOptions {
  recipe?: keyof typeof RECIPES | string;
  clamp?: boolean;
  fill?: number;
}

export interface AdoptResult {
  S: number[];
  from: string;
  ok: boolean;
  notes?: string[];
}

export function adopt(input: unknown, opts?: AdoptOptions): AdoptResult;

export const RECIPES: {
  spine7:      (input: unknown) => number[];
  ringOf7:     (input: unknown) => number[];
  fromObject:  (input: Record<string, number>) => number[];
  fromString:  (input: string) => number[];
  fromArray:   (input: number[]) => number[];
  fromKappa:   (kappa: number) => number[];
};

export function detectShape(input: unknown): string;
export function normalize(S: number[]): number[];
