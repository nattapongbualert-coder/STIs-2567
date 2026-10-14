(function(root){
'use strict';
const norm=v=>String(v||'').normalize('NFC').toLocaleLowerCase('th').trim();
const escapeHTML=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function search(data,query){const words=norm(query).split(/\s+/).filter(Boolean);return data.diseases.flatMap(d=>d.records.map(r=>({...r,diseaseId:d.id,diseaseName:d.name,diseaseEnglish:d.english}))).filter(r=>{const hay=norm([r.title,r.text,r.notes,r.scope,r.diseaseName,r.diseaseEnglish,r.category,r.stage].join(' '));return words.every(w=>hay.includes(w))});}
function matchesStage(r,stage){if(stage==='all'||!r.stage)return true;if(r.stage===stage)return true;if(r.stage==='primary-secondary'&&['primary','secondary'].includes(stage))return true;if(r.stage==='latent'&&['early-latent','late-latent','unknown'].includes(stage))return true;return false;}
function pageNumber(s,p){return p+s.offset;}
function pageLabel(sid,p){if(sid==='ddc')return `น. ${p} · PDF ${p+14}`;if(sid==='nih-adult')return `BB-${p} · PDF ${p}`;if(sid==='nih-pediatric')return `X-${p} · PDF ${p}`;return `PDF น. ${p}`;}
function filter(records,{category='all',stage='all',savedOnly=false,saved=[]}={}){return records.filter(r=>(category==='all'||r.category===category)&&matchesStage(r,stage)&&(!savedOnly||saved.includes(r.id)));}
function canCopy(r){return r.status==='active';}
const api={norm,escapeHTML,search,matchesStage,pageNumber,pageLabel,filter,canCopy};
if(typeof module!=='undefined'&&module.exports)module.exports=api;root.STICore=api;
})(typeof window!=='undefined'?window:globalThis);
