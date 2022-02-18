import{d as u,o as m,f as _,c as e,t as p,r,b as x,m as s,k as g}from"./vendor.e6b44e87.js";import{b as v}from"./index.c01f7087.js";const w={class:"hello"},k=u({props:{helloWorldName:null},setup(a,{expose:n}){const i=a;function t(){alert("Hello from HelloWorld")}return n({doSomething:t}),(o,l)=>(m(),_("div",w,[e("h1",null,p(i.helloWorldName),1)]))}});const b={class:"col-container"},C={class:"col-xs-12"},B={class:"col-xs-12"},S={class:"col-xs-12"},N={class:"col-xs-12"},F=e("div",null," Beispiel, wie dynamische Templates verwendet werden k\xF6nnen ",-1),y=e("div",null," Damit k\xF6nnen auch andere Komponenten eingebunden werden. Solche die nicht global registriert sind, m\xFCssen allerdings wie gewohnt \xFCbergeben werden. ",-1),D=e("div",null,' Wichtig hierf\xFCr ist, dass in der vite.config.ts unter resolve => alias "vue" konfiguriert ist, da ansonsten der Template-Compiler nicht Teil des Bundles ist und die Funktionalit\xE4t im Produktiv-Bundle nicht verf\xFCgbar ist. ',-1),H=u({setup(a){const n=`
  <div class="is-template">   
    <h3>Template 1</h3>
    <div>
      <hello-world :hello-world-name="name"></hello-world>
    </div>
    <div>
      <input type="text" v-model="name">
    </div>
    <div>
      Simple: {{ name }}
    </div>
    <div>
      Nested: {{ nested.a.n1 }}
    </div>
    <div>
      Static: {{ staticValue }}
    </div>
    <div>
      <button @click="onButtonClick()">Input auf aktuelles Datum/Zeit \xE4ndern</button>
    </div>
  </div>`,i=`
  <div class="is-template">
    <h3>Template 2</h3>  
    <div>
      <hello-world :hello-world-name="name"></hello-world>
    </div>
    <div>
      <input type="text" v-model="name">
    </div>
    <div>
      Simple: {{ name }}
    </div>
    <div>
      Nested: {{ nested.a.n1 }}
    </div>
    <div>
      Static: {{ staticValue }}
    </div>
    <div>
      <button @click="onButtonClick()">Input auf aktuelles Datum/Zeit \xE4ndern</button>
    </div>
  </div>`,t=r("Name 1"),o=r({a:{n1:"N1"}});let l="ABC";function h(){t.value=new Date().toLocaleString(),o.value.a.n1=new Date().toLocaleString(),l="ABC"}const d={HelloWorld:k},c={name:t,nested:o,staticValue:l,onButtonClick:h};return(T,V)=>{const f=x("base-info");return m(),_("div",b,[e("div",C,[e("div",null,p(t.value),1)]),e("div",B,[s(v,{components:d,context:c,template:n})]),e("div",S,[s(v,{components:d,context:c,template:i})]),e("div",N,[s(f,null,{default:g(()=>[F,y,D]),_:1})])])}}});export{H as default};
