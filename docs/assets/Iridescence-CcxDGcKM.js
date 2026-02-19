import{r as u,g as T,j as M}from"./index-RvermAfE.js";import{G as x,R as z,P as F,a as L}from"./Mesh-zDh-3scL.js";const w={black:"#000000",white:"#ffffff",red:"#ff0000",green:"#00ff00",blue:"#0000ff",fuchsia:"#ff00ff",cyan:"#00ffff",yellow:"#ffff00",orange:"#ff8000"};function y(e){e.length===4&&(e=e[0]+e[1]+e[1]+e[2]+e[2]+e[3]+e[3]);const r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return r||console.warn(`Unable to convert hex string ${e} to rgb values`),[parseInt(r[1],16)/255,parseInt(r[2],16)/255,parseInt(r[3],16)/255]}function I(e){return e=parseInt(e),[(e>>16&255)/255,(e>>8&255)/255,(e&255)/255]}function A(e){return e===void 0?[0,0,0]:arguments.length===3?arguments:isNaN(e)?e[0]==="#"?y(e):w[e.toLowerCase()]?y(w[e.toLowerCase()]):(console.warn("Color format not recognised"),[0,0,0]):I(e)}class C extends Array{constructor(r){return Array.isArray(r)?super(...r):super(...A(...arguments))}get r(){return this[0]}get g(){return this[1]}get b(){return this[2]}set r(r){this[0]=r}set g(r){this[1]=r}set b(r){this[2]=r}set(r){return Array.isArray(r)?this.copy(r):this.copy(A(...arguments))}copy(r){return this[0]=r[0],this[1]=r[1],this[2]=r[2],this}}class N extends x{constructor(r,{attributes:i={}}={}){Object.assign(i,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),super(r,i)}}const U=`
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`,j=`
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - 0.5) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;

  for (float i = 0.0; i < 8.0; i++) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }

  d += uTime * 0.5 * uSpeed;

  vec3 col = vec3(
    cos(uv * vec2(d, a)) * 0.6 + 0.4,
    cos(a + d) * 0.5 + 0.5
  );

  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;

  gl_FragColor = vec4(col, 1.0);
}
`;function B({color:e=[1,1,1],speed:r=1,amplitude:i=.1,mouseReact:g=!0,className:b=""}){const p=u.useRef(null),c=u.useRef(null),a=u.useRef(null),l=u.useRef(null),v=u.useRef([.5,.5]);return u.useEffect(()=>{const t=p.current;if(!t)return;c.current||(c.current=new z({dpr:T()}));const m=c.current,n=m.gl;n.clearColor(1,1,1,1);const E=new N(n),f=new F(n,{vertex:U,fragment:j,uniforms:{uTime:{value:0},uColor:{value:new C(...e)},uResolution:{value:new C(1,1,1)},uMouse:{value:v.current},uAmplitude:{value:i},uSpeed:{value:r}}});a.current=f;const S=new L(n,{geometry:E,program:f}),d=()=>{const{offsetWidth:o,offsetHeight:s}=t;m.setSize(o,s),f.uniforms.uResolution.value.set(o,s,o/s)};d(),window.addEventListener("resize",d);const h=o=>{const s=t.getBoundingClientRect();v.current[0]=(o.clientX-s.left)/s.width,v.current[1]=1-(o.clientY-s.top)/s.height};g&&t.addEventListener("mousemove",h);const R=o=>{l.current=requestAnimationFrame(R),f.uniforms.uTime.value=o*.001,m.render({scene:S})};return l.current=requestAnimationFrame(R),t.contains(n.canvas)||t.appendChild(n.canvas),()=>{cancelAnimationFrame(l.current),window.removeEventListener("resize",d),g&&t.removeEventListener("mousemove",h),n.canvas.parentNode===t&&t.removeChild(n.canvas)}},[]),u.useEffect(()=>{a.current&&(a.current.uniforms.uColor.value.set(...e),a.current.uniforms.uAmplitude.value=i,a.current.uniforms.uSpeed.value=r)},[e,i,r]),M.jsx("div",{ref:p,className:`iridescence-container ${b}`})}export{B as default};
