import test from 'node:test';
import assert from 'node:assert/strict';
import {generateSession,studyRows,choicesFor} from '../lib/math/generator.ts';
import {stories} from '../lib/math/stories.ts';
import {createSession,sessionReducer,ActiveTimer} from '../lib/math/session.ts';
import type {Level,Mode} from '../lib/math/types.ts';
function random(seed:number){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
for(const level of ['hafalan','mudah','sedang','sulit','hots'] as Level[])for(const mode of (level==='hafalan'?['perkalian','pembagian','campuran']:['campuran']) as Mode[]){
 test(`${level}/${mode}: 200 sessions respect arithmetic and constraints`,()=>{
  for(let seed=1;seed<=200;seed++){
   const qs=generateSession(level,mode,random(seed));assert.equal(qs.length,10);assert.equal(new Set(qs.map(q=>q.id)).size,10);
   for(const q of qs){assert.equal(q.choices.length,4);assert.equal(new Set(q.choices).size,4);assert.equal(q.choices.filter(v=>v===q.answer).length,1);assert.ok(q.choices.every(v=>Number.isInteger(v)&&v>=0));assert.ok(q.steps.length>=3);
    if(!q.operands)continue;const [a,b]=q.operands;const op=q.operation;
    assert.equal(q.answer,op==='+'?a+b:op==='−'?a-b:op==='×'?a*b:a/b);
    if(op==='÷')assert.equal(a%b,0);
    if(op==='+'||op==='−'){const min=level==='mudah'?10:level==='sedang'?100:1000,max=min*10-1;assert.ok(a>=min&&a<=max&&b>=min&&b<=max);assert.ok(q.answer>=0&&q.answer<=max)}
    else if(level==='hafalan'||level==='mudah'){assert.ok(b>=1&&b<=9);assert.ok(op==='×'?a>=1&&a<=9:q.answer>=1&&q.answer<=9)}
    else if(level==='sedang'){assert.ok(b>=2&&b<=9);assert.ok(a>=10&&a<=99);if(op==='×')assert.equal(a%10,0)}
    else{assert.ok(a>=100&&a<=999);assert.ok(b>=2&&b<=99)}
    // Every displayed arithmetic equation in explanations must be true.
    for(const step of q.steps){const equations=step.matchAll(/([\d.]+(?:\s*[+×−÷]\s*[\d.]+)+)\s*=\s*([\d.]+)/g);for(const match of equations){const left=match[1].replaceAll('.','').split(/\s*([+×−÷])\s*/);let total=Number(left[0]);for(let i=1;i<left.length;i+=2){const n=Number(left[i+1]);total=left[i]==='+'?total+n:left[i]==='−'?total-n:left[i]==='×'?total*n:total/n}assert.equal(total,Number(match[2].replaceAll('.','')),step)}}
   }
   if(level==='hafalan'){assert.equal(qs.filter(q=>q.operation==='×').length,mode==='campuran'?5:mode==='perkalian'?10:0)}else if(level!=='hots'){for(const op of ['+','−','×','÷'])assert.ok(qs.filter(q=>q.operation===op).length>=2)}
  }
 });
}
test('all 162 study rows are correct',()=>{for(let n=1;n<=9;n++)for(const divide of [false,true]){const rows=studyRows(n,divide);assert.equal(rows.length,9);rows.forEach((r,i)=>{assert.equal(r.answer,divide?r.a/r.b:r.a*r.b);assert.equal(divide?r.b:r.a,n);assert.equal(divide?r.answer:r.b,i+1)})}});
test('20 curated stories match independently calculated answers and cover five topics',()=>{assert.equal(stories.length,20);assert.equal(new Set(stories.map(s=>s.prompt)).size,20);assert.deepEqual(stories.map(s=>s.answer),[12+3,25-5,16*2,28+7,45-18,42/6,56/8,39+24,3*8-5,4*6+7,36/6-2,18-7+9,32/4,45/5,28-6*4,24/6-2,3*7-18,15*2,12+(12+8),(16-10)/2]);for(const category of new Set(stories.map(s=>s.category)))assert.equal(stories.filter(s=>s.category===category).length,4);assert.ok(stories.every(s=>s.steps.length===3&&s.steps[0].startsWith('Yang kita tahu:')&&s.steps[1].startsWith('Caranya:')&&s.steps[2].startsWith('Jadi,')))});
test('zero and large answers have four valid unique choices',()=>{for(const n of [0,1,2,9,10,99,100,999,1000,98901]){const choices=choicesFor(n,random(20));assert.equal(new Set(choices).size,4);assert.ok(choices.every(v=>v>=0));assert.ok(choices.includes(n))}});
test('session locks answers, prevents double scoring, and finishes after ten reviews',()=>{const questions=generateSession('mudah','campuran',random(12));let state=createSession(questions);assert.equal(sessionReducer(state,{type:'check',elapsed:20}),state);assert.equal(sessionReducer(state,{type:'next'}),state);assert.equal(sessionReducer(state,{type:'select',answer:-1}),state);for(let i=0;i<10;i++){const q=questions[i];const answer=i%2===0?q.answer:q.choices.find(c=>c!==q.answer)!;state=sessionReducer(state,{type:'select',answer});state=sessionReducer(state,{type:'check',elapsed:1000});assert.equal(sessionReducer(state,{type:'check',elapsed:5000}),state);assert.equal(sessionReducer(state,{type:'select',answer:q.answer}),state);state=sessionReducer(state,{type:'next'})}assert.equal(state.phase,'finished');assert.equal(state.score,5);assert.equal(state.elapsed.length,10);assert.equal(sessionReducer(state,{type:'next'}),state)});
test('timer ignores review, hidden intervals and repeated pause/resume',()=>{const t=new ActiveTimer();t.resume(100);t.resume(200);t.pause(1100);assert.equal(t.read(6000),1000);t.pause(8000);t.resume(9000);assert.equal(t.read(9500),1500);t.pause(10000);assert.equal(t.read(20000),2000);t.reset();assert.equal(t.read(30000),0)});
