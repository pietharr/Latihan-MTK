import type { Question } from './types.ts';
export interface Session { questions:Question[]; index:number; selected:number|null; phase:'answering'|'review'|'finished'; score:number; elapsed:number[] }
export type Action = {type:'select';answer:number}|{type:'check';elapsed:number}|{type:'next'};
export const createSession=(questions:Question[]):Session=>({questions,index:0,selected:null,phase:'answering',score:0,elapsed:[]});
export function sessionReducer(state:Session,action:Action):Session {
 if(action.type==='select')return state.phase==='answering'&&state.questions[state.index].choices.includes(action.answer)?{...state,selected:action.answer}:state;
 if(action.type==='check')return state.phase==='answering'&&state.selected!==null?{...state,phase:'review',score:state.score+(state.selected===state.questions[state.index].answer?1:0),elapsed:[...state.elapsed,Math.max(0,action.elapsed)]}:state;
 if(state.phase!=='review')return state;
 return state.index===state.questions.length-1?{...state,phase:'finished'}:{...state,index:state.index+1,selected:null,phase:'answering'};
}
// Only accumulate active, visible answering time. Review and hidden tabs pause it.
export class ActiveTimer {
 private started:number|null=null; private total=0;
 reset(){this.started=null;this.total=0}
 resume(now:number){if(this.started===null)this.started=now}
 pause(now:number){if(this.started!==null){this.total+=Math.max(0,now-this.started);this.started=null}}
 read(now:number){return this.total+(this.started===null?0:Math.max(0,now-this.started))}
}
