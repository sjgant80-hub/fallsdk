/**
 * foldkit — fold arithmetic, SPINE, KAPPA/OMEGA constants, OPS, Konomi band classifier.
 * Source: https://sjgant80-hub.github.io/foldkit/foldkit.js
 */

export const SPINE: readonly number[];
export const SPINE_GLYPHS: readonly string[];
export const SPINE_NAMES: readonly string[];
export const PHI: number;
export const KAPPA: number;
export const OMEGA: number;
export const BASELINE: readonly number[];

export function foldNumber(S: number[]): number;
export function unfoldState(F: number): number[] | null;
export function stateSum(S: number[]): number;
export function stateSignature(S: number[]): string;

export interface KappaBand {
  min: number;
  max: number;
  name: string;
  glyph: string;
  ring: number;
  warn?: boolean;
  orphan?: boolean;
}
export const KAPPA_BANDS: readonly KappaBand[];
export function depthBand(kappa: number): KappaBand;
export function isOrphanZone(kappa: number): boolean;

export type OpName = 'fire' | 'water' | 'void' | 'thunder' | 'echo' | 'flower';

export const OPS: {
  fire:    (S: number[], ringIdx: number) => number[];
  water:   (S: number[], ringIdx: number) => number[];
  void:    (S: number[], fromRing: number, toRing: number) => number[];
  thunder: (S: number[]) => number[];
  echo:    (S: number[]) => number[];
  flower:  (S: number[]) => number[];
};

export interface OpMeta {
  kanji: string;
  arrow: string;
  verb: string;
  probe: string;
}
export const OP_META: Record<OpName, OpMeta>;
export function applyOp(name: OpName, S: number[], ...args: number[]): number[];

export function kawasakiSum(angles: number[]): number;
export function kawasakiFlat(angles: number[], tol?: number): boolean;
export function maekawaValid(mountainCount: number, valleyCount: number): boolean;

export function signalSurvival(depth: number, kappa?: number): number;
export function unclogGain(depth: number, layersCleared?: number, kappa?: number): number;
export function attenuationProfile(kappa?: number): Array<{
  ring: number;
  glyph: string;
  name: string;
  survivalToGround: number;
  surviveAsPercent: number;
}>;

export function classifyKappaBand(text: string): KappaBand;
export function pickOpForBand(bandName: string): OpMeta & { name: OpName };
export function probeFromKappa(kappa: number, text?: string): {
  band: KappaBand;
  op: OpMeta & { name: OpName };
  probe: string;
};
