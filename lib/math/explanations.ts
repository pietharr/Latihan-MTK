import { formatNumber as f, type Operation } from './types.ts';
const parts = (n: number) => String(n).split('').map((d,i,a)=>Number(d)*10**(a.length-i-1)).filter(Boolean);
export function explain(a: number, b: number, op: Operation): string[] {
 if(op === '+') {
  let subtotal=a;
  return [`Mulai dari ${f(a)}. Kita tambahkan ${f(b)}.`, `Pecah ${f(b)} menjadi ${parts(b).map(f).join(' + ')}.`, ...parts(b).map(p=>{const old=subtotal;subtotal+=p;return `${f(old)} + ${f(p)} = ${f(subtotal)}.`}), `Jadi, ${f(a)} + ${f(b)} = ${f(a+b)}.`];
 }
 if(op === '−') {
  let subtotal=a;
  return [`Ada ${f(a)}. Kita ambil ${f(b)}.`, `Pecah ${f(b)} menjadi ${parts(b).map(f).join(' + ')}.`, ...parts(b).map(p=>{const old=subtotal;subtotal-=p;return `${f(old)} − ${f(p)} = ${f(subtotal)}.`}), `Jadi, sisanya ${f(a-b)}.`];
 }
 if(op === '×') {
  if(a<=9 && b<=9) return [`${a} × ${b} artinya ${a} kelompok, masing-masing berisi ${b}.`,`${Array(a).fill(b).join(' + ')} = ${a*b}.`,`Jadi, ${a} × ${b} = ${a*b}.`];
  const chunks=parts(a);
  return [`${f(a)} × ${f(b)}: pecah ${f(a)} menurut nilai tempatnya.`,`${f(a)} = ${chunks.map(f).join(' + ')}.`,...chunks.map(p=>`${f(p)} × ${f(b)} = ${f(p*b)}.`),`Gabungkan hasilnya: ${chunks.map(p=>f(p*b)).join(' + ')} = ${f(a*b)}.`];
 }
 const q=a/b;
 if(a<=81 && b<=9 && q<=9) return [`Bagi ${a} benda menjadi kelompok berisi ${b}.`, `Kurangi ${b} berulang: ${Array.from({length:q+1},(_,i)=>a-i*b).join(' → ')}.`, `Ada ${q} kali pengurangan sampai 0. Jadi, ${a} ÷ ${b} = ${q}.`, `Cek lagi: ${q} × ${b} = ${a}.`];
 const chunks=parts(q);
 return [`Cari berapa kelompok berisi ${f(b)} yang bisa dibuat dari ${f(a)}.`,`Pecah ${f(a)} menjadi bagian yang habis dibagi ${f(b)}: ${chunks.map(p=>f(p*b)).join(' + ')}.`,...chunks.map(p=>`${f(p*b)} ÷ ${f(b)} = ${f(p)}.`),`Gabungkan: ${chunks.map(f).join(' + ')} = ${f(q)}. Cek: ${f(q)} × ${f(b)} = ${f(a)}.`];
}
