export type Level = 'hafalan' | 'mudah' | 'sedang' | 'sulit' | 'hots';
export type Mode = 'perkalian' | 'pembagian' | 'campuran';
export type Operation = '+' | '−' | '×' | '÷' | 'logika';
export interface Question {
 id: string; level: Level; operation: Operation; prompt: string;
 choices: number[]; answer: number; steps: string[];
 operands?: [number, number]; groups?: {count: number; size: number};
}
export const formatNumber = (n: number) => n.toLocaleString('id-ID');
