import{d as A,r as i,c as T,a as l,e as r,w as p,f as c,b as _,u as w,F as b,o as C}from"./index-tyJrfShM.js";import{_ as E,S as d,I as V}from"./ItemView.vue_vue_type_script_setup_true_lang-9zgYIhP7.js";const I=A({__name:"PlantsView",setup(k){const o=i(!1),a=i(!1),s=i(!1);function f(n,e){let t=!0;const m=e&&e[0],N=e&&e[1],v=e&&e[2];return m&&(t=!n.trackerValues.isCollected),v?t=t&&n.locations.every(u=>u.state!==d.NEW_AUSTIN):N&&(t=t&&n.locations.some(u=>u.state===d.NEW_AUSTIN)),t}return(n,e)=>(C(),T(b,null,[l("label",null,[r(" No New Austin "),p(l("input",{type:"checkbox","onUpdate:modelValue":e[0]||(e[0]=t=>s.value=t)},null,512),[[c,s.value]])]),l("label",null,[r(" Only New Austin "),p(l("input",{type:"checkbox","onUpdate:modelValue":e[1]||(e[1]=t=>a.value=t)},null,512),[[c,a.value]])]),l("label",null,[r(" Not Completed "),p(l("input",{type:"checkbox","onUpdate:modelValue":e[2]||(e[2]=t=>o.value=t)},null,512),[[c,o.value]])]),_(E,{itemType:w(V).PLANT,guards:[o.value,a.value,s.value],filterCondition:f},null,8,["itemType","guards"])],64))}});export{I as default};