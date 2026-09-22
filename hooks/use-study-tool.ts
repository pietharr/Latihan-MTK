"use client";
import {useEffect} from 'react';
import {flushSync} from 'react-dom';
import {studyRows} from '@/lib/math/generator';
interface ToolContext{registerTool(tool:{name:string;description:string;inputSchema:object;annotations:{readOnlyHint:boolean;untrustedContentHint:boolean};execute:(input:unknown)=>unknown},options:{signal:AbortSignal}):void|Promise<void>}
export function useStudyTool(open:(n:string,operation:string)=>void){
 useEffect(()=>{
  const context=(document as Document & {modelContext?:ToolContext}).modelContext;
  if(!context?.registerTool)return;
  const lifecycle=new AbortController();
  try{void Promise.resolve(context.registerTool({name:'open_study_card',description:'Buka Study Card perkalian atau pembagian untuk angka 1–9.',inputSchema:{type:'object',properties:{number:{type:'integer',minimum:1,maximum:9},operation:{type:'string',enum:['multiply','divide']}},required:['number','operation'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){const x=input as {number?:unknown;operation?:unknown};if(!x||!Number.isInteger(x.number)||Number(x.number)<1||Number(x.number)>9||!['multiply','divide'].includes(String(x.operation)))throw new Error('Pilih angka 1–9 dan operasi multiply atau divide.');flushSync(()=>open(String(x.number),String(x.operation)));return {open:true,number:x.number,operation:x.operation,rows:studyRows(Number(x.number),x.operation==='divide')}}},{signal:lifecycle.signal})).catch(()=>{})}catch{}return ()=>lifecycle.abort();
 },[open]);
}
