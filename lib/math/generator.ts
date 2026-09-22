import { type Level, type Mode, type Operation, type Question, formatNumber as f } from './types.ts';
import { explain } from './explanations.ts';
import { stories } from './stories.ts';
export const shuffle = <T,>(values:T[],rng= Math.random):T[]=>{const result=[...values];for(let i=result.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[result[i],result[j]]=[result[j],result[i]]}return result};
export function choicesFor(answer:number,rng=Math.random):number[]{
 const step=answer>=1000?100:answer>=100?10:1;
 const pool=[answer-step,answer+step,answer-2*step,answer+2*step,answer+3*step,answer+1,answer-1].filter(v=>v>=0&&v!==answer);
 return shuffle([answer,...shuffle([...new Set(pool)],rng).slice(0,3)],rng);
}
export function generateSession(level:Level,mode:Mode='campuran',rng=Math.random):Question[]{
 const int=(min:number,max:number)=>min+Math.floor(rng()*(max-min+1));
 if(level==='hots')return shuffle(stories.map((s,i)=>({...s,id:`hots-${i}`,level,operation:'logika' as const,choices:choicesFor(s.answer,rng)})),rng).slice(0,10);
 const ops:Operation[]=level==='hafalan' ? (mode==='campuran'?[...Array(5).fill('×'),...Array(5).fill('÷')]:Array(10).fill(mode==='perkalian'?'×':'÷')) : ['+','+','−','−','×','×','÷','÷',...Array.from({length:2},()=>['+','−','×','÷'][int(0,3)] as Operation)];
 const used=new Set<string>();
 return shuffle(ops,rng).map(op=>{
  for(let attempt=0;attempt<500;attempt++){
   let a=0,b=0;
   if(op==='+'||op==='−'){
    const min=level==='mudah'?10:level==='sedang'?100:1000,max=min*10-1;
    if(op==='+'){a=int(min,max-min);b=int(min,max-a)}else{a=int(min,max);b=int(min,a)}
   }else if(level==='hafalan'||level==='mudah'){
    a=int(1,9);b=int(1,9);if(op==='÷')a*=b;
   }else if(op==='×'){a=level==='sedang'?int(1,9)*10:int(100,999);b=level==='sedang'?int(2,9):int(2,99)}
   else{b=level==='sedang'?int(2,9):int(2,99);const min=level==='sedang'?10:100,max=level==='sedang'?99:999;a=b*int(Math.ceil(min/b),Math.floor(max/b))}
   const id=`${level}-${a}${op}${b}`;if(used.has(id))continue;used.add(id);
   const answer=op==='+'?a+b:op==='−'?a-b:op==='×'?a*b:a/b;
   return {id,level,operation:op,prompt:`${f(a)} ${op} ${f(b)} = ?`,operands:[a,b],answer,choices:choicesFor(answer,rng),steps:explain(a,b,op),...((op==='×'||op==='÷')&&a<=81&&b<=9&&(op==='×'?a<=9:a/b<=9)?{groups:{count:op==='×'?a:a/b,size:b}}:{})};
  }
  throw new Error('Tidak dapat membuat soal unik. Coba mulai lagi.');
 });
}
export function studyRows(n:number,divide=false){return Array.from({length:9},(_,i)=>({a:divide?n*(i+1):n,b:divide?n:i+1,answer:divide?i+1:n*(i+1)}))}
