"use strict";(()=>{var Me=function(e){let t=[],n=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[n++]=i:i<2048?(t[n++]=i>>6|192,t[n++]=i&63|128):(i&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(i=65536+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=i>>18|240,t[n++]=i>>12&63|128,t[n++]=i>>6&63|128,t[n++]=i&63|128):(t[n++]=i>>12|224,t[n++]=i>>6&63|128,t[n++]=i&63|128)}return t},At=function(e){let t=[],n=0,r=0;for(;n<e.length;){let i=e[n++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let o=e[n++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=e[n++],s=e[n++],a=e[n++],c=((i&7)<<18|(o&63)<<12|(s&63)<<6|a&63)-65536;t[r++]=String.fromCharCode(55296+(c>>10)),t[r++]=String.fromCharCode(56320+(c&1023))}else{let o=e[n++],s=e[n++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|s&63)}}return t.join("")},Be={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let i=0;i<e.length;i+=3){let o=e[i],s=i+1<e.length,a=s?e[i+1]:0,c=i+2<e.length,f=c?e[i+2]:0,u=o>>2,C=(o&3)<<4|a>>4,x=(a&15)<<2|f>>6,N=f&63;c||(N=64,s||(x=64)),r.push(n[u],n[C],n[x],n[N])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(Me(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):At(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();let n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let i=0;i<e.length;){let o=n[e.charAt(i++)],a=i<e.length?n[e.charAt(i)]:0;++i;let f=i<e.length?n[e.charAt(i)]:64;++i;let C=i<e.length?n[e.charAt(i)]:64;if(++i,o==null||a==null||f==null||C==null)throw new q;let x=o<<2|a>>4;if(r.push(x),f!==64){let N=a<<4&240|f>>2;if(r.push(N),C!==64){let St=f<<6&192|C;r.push(St)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}},q=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},Dt=function(e){let t=Me(e);return Be.encodeByteArray(t,!0)},G=function(e){return Dt(e).replace(/\./g,"")},Tt=function(e){try{return Be.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};function Ct(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Ot=()=>Ct().__FIREBASE_DEFAULTS__,kt=()=>{if(typeof process>"u"||typeof process.env>"u")return;let e=process.env.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},xt=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let t=e&&Tt(e[1]);return t&&JSON.parse(t)},Nt=()=>{try{return Ot()||kt()||xt()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}};var J=()=>{var e;return(e=Nt())===null||e===void 0?void 0:e.config};var M=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}};function B(){try{return typeof indexedDB=="object"}catch{return!1}}function R(){return new Promise((e,t)=>{try{let n=!0,r="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(r);i.onsuccess=()=>{i.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},i.onupgradeneeded=()=>{n=!1},i.onerror=()=>{var o;t(((o=i.error)===null||o===void 0?void 0:o.message)||"")}}catch(n){t(n)}})}var Mt="FirebaseError",g=class e extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=Mt,Object.setPrototypeOf(this,e.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,m.prototype.create)}},m=class{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){let r=n[0]||{},i=`${this.service}/${t}`,o=this.errors[t],s=o?Bt(o,r):"Error",a=`${this.serviceName}: ${s} (${i}).`;return new g(i,a,r)}};function Bt(e,t){return e.replace(Rt,(n,r)=>{let i=t[r];return i!=null?String(i):`<${r}?>`})}var Rt=/\{\$([^}]+)}/g;function L(e,t){if(e===t)return!0;let n=Object.keys(e),r=Object.keys(t);for(let i of n){if(!r.includes(i))return!1;let o=e[i],s=t[i];if(Ne(o)&&Ne(s)){if(!L(o,s))return!1}else if(o!==s)return!1}for(let i of r)if(!n.includes(i))return!1;return!0}function Ne(e){return e!==null&&typeof e=="object"}var di=4*60*60*1e3;function Y(e){return e&&e._delegate?e._delegate:e}var d=class{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}};var E="[DEFAULT]";var Q=class{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){let n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){let r=new M;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{let i=this.getOrInitializeService({instanceIdentifier:n});i&&r.resolve(i)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;let r=this.normalizeInstanceIdentifier(t?.identifier),i=(n=t?.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(i)return null;throw o}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Pt(t))try{this.getOrInitializeService({instanceIdentifier:E})}catch{}for(let[n,r]of this.instancesDeferred.entries()){let i=this.normalizeInstanceIdentifier(n);try{let o=this.getOrInitializeService({instanceIdentifier:i});r.resolve(o)}catch{}}}}clearInstance(t=E){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){let t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=E){return this.instances.has(t)}getOptions(t=E){return this.instancesOptions.get(t)||{}}initialize(t={}){let{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let i=this.getOrInitializeService({instanceIdentifier:r,options:n});for(let[o,s]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(o);r===a&&s.resolve(i)}return i}onInit(t,n){var r;let i=this.normalizeInstanceIdentifier(n),o=(r=this.onInitCallbacks.get(i))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(i,o);let s=this.instances.get(i);return s&&t(s,i),()=>{o.delete(t)}}invokeOnInitCallbacks(t,n){let r=this.onInitCallbacks.get(n);if(r)for(let i of r)try{i(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Lt(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=E){return this.component?this.component.multipleInstances?t:E:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Lt(e){return e===E?void 0:e}function Pt(e){return e.instantiationMode==="EAGER"}var P=class{constructor(t){this.name=t,this.providers=new Map}addComponent(t){let n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);let n=new Q(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}};var jt=[],l;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(l||(l={}));var Ft={debug:l.DEBUG,verbose:l.VERBOSE,info:l.INFO,warn:l.WARN,error:l.ERROR,silent:l.SILENT},$t=l.INFO,Vt={[l.DEBUG]:"log",[l.VERBOSE]:"log",[l.INFO]:"info",[l.WARN]:"warn",[l.ERROR]:"error"},Ht=(e,t,...n)=>{if(t<e.logLevel)return;let r=new Date().toISOString(),i=Vt[t];if(i)console[i](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)},j=class{constructor(t){this.name=t,this._logLevel=$t,this._logHandler=Ht,this._userLogHandler=null,jt.push(this)}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in l))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Ft[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,l.DEBUG,...t),this._logHandler(this,l.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,l.VERBOSE,...t),this._logHandler(this,l.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,l.INFO,...t),this._logHandler(this,l.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,l.WARN,...t),this._logHandler(this,l.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,l.ERROR,...t),this._logHandler(this,l.ERROR,...t)}};var Ut=(e,t)=>t.some(n=>e instanceof n),Re,Le;function zt(){return Re||(Re=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Kt(){return Le||(Le=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var Pe=new WeakMap,Z=new WeakMap,je=new WeakMap,X=new WeakMap,te=new WeakMap;function Wt(e){let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("success",o),e.removeEventListener("error",s)},o=()=>{n(p(e.result)),i()},s=()=>{r(e.error),i()};e.addEventListener("success",o),e.addEventListener("error",s)});return t.then(n=>{n instanceof IDBCursor&&Pe.set(n,e)}).catch(()=>{}),te.set(t,e),t}function qt(e){if(Z.has(e))return;let t=new Promise((n,r)=>{let i=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",s),e.removeEventListener("abort",s)},o=()=>{n(),i()},s=()=>{r(e.error||new DOMException("AbortError","AbortError")),i()};e.addEventListener("complete",o),e.addEventListener("error",s),e.addEventListener("abort",s)});Z.set(e,t)}var ee={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return Z.get(e);if(t==="objectStoreNames")return e.objectStoreNames||je.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return p(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Fe(e){ee=e(ee)}function Gt(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){let r=e.call(F(this),t,...n);return je.set(r,t.sort?t.sort():[t]),p(r)}:Kt().includes(e)?function(...t){return e.apply(F(this),t),p(Pe.get(this))}:function(...t){return p(e.apply(F(this),t))}}function Jt(e){return typeof e=="function"?Gt(e):(e instanceof IDBTransaction&&qt(e),Ut(e,zt())?new Proxy(e,ee):e)}function p(e){if(e instanceof IDBRequest)return Wt(e);if(X.has(e))return X.get(e);let t=Jt(e);return t!==e&&(X.set(e,t),te.set(t,e)),t}var F=e=>te.get(e);function v(e,t,{blocked:n,upgrade:r,blocking:i,terminated:o}={}){let s=indexedDB.open(e,t),a=p(s);return r&&s.addEventListener("upgradeneeded",c=>{r(p(s.result),c.oldVersion,c.newVersion,p(s.transaction),c)}),n&&s.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{o&&c.addEventListener("close",()=>o()),i&&c.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),a}function $(e,{blocked:t}={}){let n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",r=>t(r.oldVersion,r)),p(n).then(()=>{})}var Yt=["get","getKey","getAll","getAllKeys","count"],Qt=["put","add","delete","clear"],ne=new Map;function $e(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(ne.get(t))return ne.get(t);let n=t.replace(/FromIndex$/,""),r=t!==n,i=Qt.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(i||Yt.includes(n)))return;let o=async function(s,...a){let c=this.transaction(s,i?"readwrite":"readonly"),f=c.store;return r&&(f=f.index(a.shift())),(await Promise.all([f[n](...a),i&&c.done]))[0]};return ne.set(t,o),o}Fe(e=>({...e,get:(t,n,r)=>$e(t,n)||e.get(t,n,r),has:(t,n)=>!!$e(t,n)||e.has(t,n)}));var ie=class{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Xt(n)){let r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}};function Xt(e){let t=e.getComponent();return t?.type==="VERSION"}var oe="@firebase/app",Ve="0.10.0";var I=new j("@firebase/app"),Zt="@firebase/app-compat",en="@firebase/analytics-compat",tn="@firebase/analytics",nn="@firebase/app-check-compat",rn="@firebase/app-check",on="@firebase/auth",sn="@firebase/auth-compat",an="@firebase/database",cn="@firebase/database-compat",un="@firebase/functions",fn="@firebase/functions-compat",ln="@firebase/installations",dn="@firebase/installations-compat",hn="@firebase/messaging",pn="@firebase/messaging-compat",gn="@firebase/performance",mn="@firebase/performance-compat",bn="@firebase/remote-config",wn="@firebase/remote-config-compat",yn="@firebase/storage",_n="@firebase/storage-compat",En="@firebase/firestore",vn="@firebase/firestore-compat",In="firebase";var se="[DEFAULT]",Sn={[oe]:"fire-core",[Zt]:"fire-core-compat",[tn]:"fire-analytics",[en]:"fire-analytics-compat",[rn]:"fire-app-check",[nn]:"fire-app-check-compat",[on]:"fire-auth",[sn]:"fire-auth-compat",[an]:"fire-rtdb",[cn]:"fire-rtdb-compat",[un]:"fire-fn",[fn]:"fire-fn-compat",[ln]:"fire-iid",[dn]:"fire-iid-compat",[hn]:"fire-fcm",[pn]:"fire-fcm-compat",[gn]:"fire-perf",[mn]:"fire-perf-compat",[bn]:"fire-rc",[wn]:"fire-rc-compat",[yn]:"fire-gcs",[_n]:"fire-gcs-compat",[En]:"fire-fst",[vn]:"fire-fst-compat","fire-js":"fire-js",[In]:"fire-js-all"};var V=new Map,An=new Map,ae=new Map;function He(e,t){try{e.container.addComponent(t)}catch(n){I.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function _(e){let t=e.name;if(ae.has(t))return I.debug(`There were multiple attempts to register component ${t}.`),!1;ae.set(t,e);for(let n of V.values())He(n,e);for(let n of An.values())He(n,e);return!0}function k(e,t){let n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}var Dn={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},w=new m("app","Firebase",Dn);var ce=class{constructor(t,n,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new d("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw w.create("app-deleted",{appName:this._name})}};function le(e,t={}){let n=e;typeof t!="object"&&(t={name:t});let r=Object.assign({name:se,automaticDataCollectionEnabled:!1},t),i=r.name;if(typeof i!="string"||!i)throw w.create("bad-app-name",{appName:String(i)});if(n||(n=J()),!n)throw w.create("no-options");let o=V.get(i);if(o){if(L(n,o.options)&&L(r,o.config))return o;throw w.create("duplicate-app",{appName:i})}let s=new P(i);for(let c of ae.values())s.addComponent(c);let a=new ce(n,r,s);return V.set(i,a),a}function de(e=se){let t=V.get(e);if(!t&&e===se&&J())return le();if(!t)throw w.create("no-app",{appName:e});return t}function y(e,t,n){var r;let i=(r=Sn[e])!==null&&r!==void 0?r:e;n&&(i+=`-${n}`);let o=i.match(/\s|\//),s=t.match(/\s|\//);if(o||s){let a=[`Unable to register library "${i}" with version "${t}":`];o&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),o&&s&&a.push("and"),s&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),I.warn(a.join(" "));return}_(new d(`${i}-version`,()=>({library:i,version:t}),"VERSION"))}var Tn="firebase-heartbeat-database",Cn=1,O="firebase-heartbeat-store",re=null;function We(){return re||(re=v(Tn,Cn,{upgrade:(e,t)=>{switch(t){case 0:try{e.createObjectStore(O)}catch(n){console.warn(n)}}}}).catch(e=>{throw w.create("idb-open",{originalErrorMessage:e.message})})),re}async function On(e){try{let n=(await We()).transaction(O),r=await n.objectStore(O).get(qe(e));return await n.done,r}catch(t){if(t instanceof g)I.warn(t.message);else{let n=w.create("idb-get",{originalErrorMessage:t?.message});I.warn(n.message)}}}async function Ue(e,t){try{let r=(await We()).transaction(O,"readwrite");await r.objectStore(O).put(t,qe(e)),await r.done}catch(n){if(n instanceof g)I.warn(n.message);else{let r=w.create("idb-set",{originalErrorMessage:n?.message});I.warn(r.message)}}}function qe(e){return`${e.name}!${e.options.appId}`}var kn=1024,xn=30*24*60*60*1e3,ue=class{constructor(t){this.container=t,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new fe(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;let i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=ze();if(!(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(s=>s.date===o)))return this._heartbeatsCache.heartbeats.push({date:o,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(s=>{let a=new Date(s.date).valueOf();return Date.now()-a<=xn}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var t;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=ze(),{heartbeatsToSend:r,unsentEntries:i}=Nn(this._heartbeatsCache.heartbeats),o=G(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}};function ze(){return new Date().toISOString().substring(0,10)}function Nn(e,t=kn){let n=[],r=e.slice();for(let i of e){let o=n.find(s=>s.agent===i.agent);if(o){if(o.dates.push(i.date),Ke(n)>t){o.dates.pop();break}}else if(n.push({agent:i.agent,dates:[i.date]}),Ke(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}var fe=class{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return B()?R().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){let n=await On(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){let i=await this.read();return Ue(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){let i=await this.read();return Ue(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...t.heartbeats]})}else return}};function Ke(e){return G(JSON.stringify({version:2,heartbeats:e})).length}function Mn(e){_(new d("platform-logger",t=>new ie(t),"PRIVATE")),_(new d("heartbeat",t=>new ue(t),"PRIVATE")),y(oe,Ve,e),y(oe,Ve,"esm2017"),y("fire-js","")}Mn("");var Ye="@firebase/installations",me="0.6.6";var Qe=1e4,Xe=`w:${me}`,Ze="FIS_v2",Bn="https://firebaseinstallations.googleapis.com/v1",Rn=60*60*1e3,Ln="installations",Pn="Installations";var jn={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},A=new m(Ln,Pn,jn);function et(e){return e instanceof g&&e.code.includes("request-failed")}function tt({projectId:e}){return`${Bn}/projects/${e}/installations`}function nt(e){return{token:e.token,requestStatus:2,expiresIn:$n(e.expiresIn),creationTime:Date.now()}}async function rt(e,t){let r=(await t.json()).error;return A.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function it({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Fn(e,{refreshToken:t}){let n=it(e);return n.append("Authorization",Vn(t)),n}async function ot(e){let t=await e();return t.status>=500&&t.status<600?e():t}function $n(e){return Number(e.replace("s","000"))}function Vn(e){return`${Ze} ${e}`}async function Hn({appConfig:e,heartbeatServiceProvider:t},{fid:n}){let r=tt(e),i=it(e),o=t.getImmediate({optional:!0});if(o){let f=await o.getHeartbeatsHeader();f&&i.append("x-firebase-client",f)}let s={fid:n,authVersion:Ze,appId:e.appId,sdkVersion:Xe},a={method:"POST",headers:i,body:JSON.stringify(s)},c=await ot(()=>fetch(r,a));if(c.ok){let f=await c.json();return{fid:f.fid||n,registrationStatus:2,refreshToken:f.refreshToken,authToken:nt(f.authToken)}}else throw await rt("Create Installation",c)}function st(e){return new Promise(t=>{setTimeout(t,e)})}function Un(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}var zn=/^[cdef][\w-]{21}$/,ge="";function Kn(){try{let e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;let n=Wn(e);return zn.test(n)?n:ge}catch{return ge}}function Wn(e){return Un(e).substr(0,22)}function U(e){return`${e.appName}!${e.appId}`}var at=new Map;function ct(e,t){let n=U(e);ut(n,t),qn(n,t)}function ut(e,t){let n=at.get(e);if(n)for(let r of n)r(t)}function qn(e,t){let n=Gn();n&&n.postMessage({key:e,fid:t}),Jn()}var S=null;function Gn(){return!S&&"BroadcastChannel"in self&&(S=new BroadcastChannel("[Firebase] FID Change"),S.onmessage=e=>{ut(e.data.key,e.data.fid)}),S}function Jn(){at.size===0&&S&&(S.close(),S=null)}var Yn="firebase-installations-database",Qn=1,D="firebase-installations-store",he=null;function be(){return he||(he=v(Yn,Qn,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(D)}}})),he}async function H(e,t){let n=U(e),i=(await be()).transaction(D,"readwrite"),o=i.objectStore(D),s=await o.get(n);return await o.put(t,n),await i.done,(!s||s.fid!==t.fid)&&ct(e,t.fid),t}async function ft(e){let t=U(e),r=(await be()).transaction(D,"readwrite");await r.objectStore(D).delete(t),await r.done}async function z(e,t){let n=U(e),i=(await be()).transaction(D,"readwrite"),o=i.objectStore(D),s=await o.get(n),a=t(s);return a===void 0?await o.delete(n):await o.put(a,n),await i.done,a&&(!s||s.fid!==a.fid)&&ct(e,a.fid),a}async function we(e){let t,n=await z(e.appConfig,r=>{let i=Xn(r),o=Zn(e,i);return t=o.registrationPromise,o.installationEntry});return n.fid===ge?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function Xn(e){let t=e||{fid:Kn(),registrationStatus:0};return lt(t)}function Zn(e,t){if(t.registrationStatus===0){if(!navigator.onLine){let i=Promise.reject(A.create("app-offline"));return{installationEntry:t,registrationPromise:i}}let n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=er(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:tr(e)}:{installationEntry:t}}async function er(e,t){try{let n=await Hn(e,t);return H(e.appConfig,n)}catch(n){throw et(n)&&n.customData.serverCode===409?await ft(e.appConfig):await H(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function tr(e){let t=await Ge(e.appConfig);for(;t.registrationStatus===1;)await st(100),t=await Ge(e.appConfig);if(t.registrationStatus===0){let{installationEntry:n,registrationPromise:r}=await we(e);return r||n}return t}function Ge(e){return z(e,t=>{if(!t)throw A.create("installation-not-found");return lt(t)})}function lt(e){return nr(e)?{fid:e.fid,registrationStatus:0}:e}function nr(e){return e.registrationStatus===1&&e.registrationTime+Qe<Date.now()}async function rr({appConfig:e,heartbeatServiceProvider:t},n){let r=ir(e,n),i=Fn(e,n),o=t.getImmediate({optional:!0});if(o){let f=await o.getHeartbeatsHeader();f&&i.append("x-firebase-client",f)}let s={installation:{sdkVersion:Xe,appId:e.appId}},a={method:"POST",headers:i,body:JSON.stringify(s)},c=await ot(()=>fetch(r,a));if(c.ok){let f=await c.json();return nt(f)}else throw await rt("Generate Auth Token",c)}function ir(e,{fid:t}){return`${tt(e)}/${t}/authTokens:generate`}async function ye(e,t=!1){let n,r=await z(e.appConfig,o=>{if(!dt(o))throw A.create("not-registered");let s=o.authToken;if(!t&&ar(s))return o;if(s.requestStatus===1)return n=or(e,t),o;{if(!navigator.onLine)throw A.create("app-offline");let a=ur(o);return n=sr(e,a),a}});return n?await n:r.authToken}async function or(e,t){let n=await Je(e.appConfig);for(;n.authToken.requestStatus===1;)await st(100),n=await Je(e.appConfig);let r=n.authToken;return r.requestStatus===0?ye(e,t):r}function Je(e){return z(e,t=>{if(!dt(t))throw A.create("not-registered");let n=t.authToken;return fr(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function sr(e,t){try{let n=await rr(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await H(e.appConfig,r),n}catch(n){if(et(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await ft(e.appConfig);else{let r=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await H(e.appConfig,r)}throw n}}function dt(e){return e!==void 0&&e.registrationStatus===2}function ar(e){return e.requestStatus===2&&!cr(e)}function cr(e){let t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Rn}function ur(e){let t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function fr(e){return e.requestStatus===1&&e.requestTime+Qe<Date.now()}async function lr(e){let t=e,{installationEntry:n,registrationPromise:r}=await we(t);return r?r.catch(console.error):ye(t).catch(console.error),n.fid}async function dr(e,t=!1){let n=e;return await hr(n),(await ye(n,t)).token}async function hr(e){let{registrationPromise:t}=await we(e);t&&await t}function pr(e){if(!e||!e.options)throw pe("App Configuration");if(!e.name)throw pe("App Name");let t=["projectId","apiKey","appId"];for(let n of t)if(!e.options[n])throw pe(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function pe(e){return A.create("missing-app-config-values",{valueName:e})}var ht="installations",gr="installations-internal",mr=e=>{let t=e.getProvider("app").getImmediate(),n=pr(t),r=k(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},br=e=>{let t=e.getProvider("app").getImmediate(),n=k(t,ht).getImmediate();return{getId:()=>lr(n),getToken:i=>dr(n,i)}};function wr(){_(new d(ht,mr,"PUBLIC")),_(new d(gr,br,"PRIVATE"))}wr();y(Ye,me);y(Ye,me,"esm2017");var mt="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",yr="https://fcmregistrations.googleapis.com/v1",bt="FCM_MSG",_r="google.c.a.c_id",Er=3,vr=1,K;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(K||(K={}));var W;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"})(W||(W={}));function b(e){let t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Ir(e){let t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),i=new Uint8Array(r.length);for(let o=0;o<r.length;++o)i[o]=r.charCodeAt(o);return i}var _e="fcm_token_details_db",Sr=5,pt="fcm_token_object_Store";async function Ar(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(o=>o.name).includes(_e))return null;let t=null;return(await v(_e,Sr,{upgrade:async(r,i,o,s)=>{var a;if(i<2||!r.objectStoreNames.contains(pt))return;let c=s.objectStore(pt),f=await c.index("fcmSenderId").get(e);if(await c.clear(),!!f){if(i===2){let u=f;if(!u.auth||!u.p256dh||!u.endpoint)return;t={token:u.fcmToken,createTime:(a=u.createTime)!==null&&a!==void 0?a:Date.now(),subscriptionOptions:{auth:u.auth,p256dh:u.p256dh,endpoint:u.endpoint,swScope:u.swScope,vapidKey:typeof u.vapidKey=="string"?u.vapidKey:b(u.vapidKey)}}}else if(i===3){let u=f;t={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:b(u.auth),p256dh:b(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:b(u.vapidKey)}}}else if(i===4){let u=f;t={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:b(u.auth),p256dh:b(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:b(u.vapidKey)}}}}}})).close(),await $(_e),await $("fcm_vapid_details_db"),await $("undefined"),Dr(t)?t:null}function Dr(e){if(!e||!e.subscriptionOptions)return!1;let{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}var Tr="firebase-messaging-database",Cr=1,T="firebase-messaging-store",Ee=null;function Ae(){return Ee||(Ee=v(Tr,Cr,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(T)}}})),Ee}async function De(e){let t=Ce(e),r=await(await Ae()).transaction(T).objectStore(T).get(t);if(r)return r;{let i=await Ar(e.appConfig.senderId);if(i)return await Te(e,i),i}}async function Te(e,t){let n=Ce(e),i=(await Ae()).transaction(T,"readwrite");return await i.objectStore(T).put(t,n),await i.done,t}async function Or(e){let t=Ce(e),r=(await Ae()).transaction(T,"readwrite");await r.objectStore(T).delete(t),await r.done}function Ce({appConfig:e}){return e.appId}var kr={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},h=new m("messaging","Messaging",kr);async function xr(e,t){let n=await ke(e),r=yt(t),i={method:"POST",headers:n,body:JSON.stringify(r)},o;try{o=await(await fetch(Oe(e.appConfig),i)).json()}catch(s){throw h.create("token-subscribe-failed",{errorInfo:s?.toString()})}if(o.error){let s=o.error.message;throw h.create("token-subscribe-failed",{errorInfo:s})}if(!o.token)throw h.create("token-subscribe-no-token");return o.token}async function Nr(e,t){let n=await ke(e),r=yt(t.subscriptionOptions),i={method:"PATCH",headers:n,body:JSON.stringify(r)},o;try{o=await(await fetch(`${Oe(e.appConfig)}/${t.token}`,i)).json()}catch(s){throw h.create("token-update-failed",{errorInfo:s?.toString()})}if(o.error){let s=o.error.message;throw h.create("token-update-failed",{errorInfo:s})}if(!o.token)throw h.create("token-update-no-token");return o.token}async function wt(e,t){let r={method:"DELETE",headers:await ke(e)};try{let o=await(await fetch(`${Oe(e.appConfig)}/${t}`,r)).json();if(o.error){let s=o.error.message;throw h.create("token-unsubscribe-failed",{errorInfo:s})}}catch(i){throw h.create("token-unsubscribe-failed",{errorInfo:i?.toString()})}}function Oe({projectId:e}){return`${yr}/projects/${e}/registrations`}async function ke({appConfig:e,installations:t}){let n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function yt({p256dh:e,auth:t,endpoint:n,vapidKey:r}){let i={web:{endpoint:n,auth:t,p256dh:e}};return r!==mt&&(i.web.applicationPubKey=r),i}var Mr=7*24*60*60*1e3;async function Br(e){let t=await Lr(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:b(t.getKey("auth")),p256dh:b(t.getKey("p256dh"))},r=await De(e.firebaseDependencies);if(r){if(Pr(r.subscriptionOptions,n))return Date.now()>=r.createTime+Mr?Rr(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await wt(e.firebaseDependencies,r.token)}catch(i){console.warn(i)}return gt(e.firebaseDependencies,n)}else return gt(e.firebaseDependencies,n)}async function Ie(e){let t=await De(e.firebaseDependencies);t&&(await wt(e.firebaseDependencies,t.token),await Or(e.firebaseDependencies));let n=await e.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function Rr(e,t){try{let n=await Nr(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await Te(e.firebaseDependencies,r),n}catch(n){throw await Ie(e),n}}async function gt(e,t){let r={token:await xr(e,t),createTime:Date.now(),subscriptionOptions:t};return await Te(e,r),r.token}async function Lr(e,t){let n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Ir(t)})}function Pr(e,t){let n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,i=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&i&&o}function jr(e){let t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return Fr(t,e),$r(t,e),Vr(t,e),t}function Fr(e,t){if(!t.notification)return;e.notification={};let n=t.notification.title;n&&(e.notification.title=n);let r=t.notification.body;r&&(e.notification.body=r);let i=t.notification.image;i&&(e.notification.image=i);let o=t.notification.icon;o&&(e.notification.icon=o)}function $r(e,t){t.data&&(e.data=t.data)}function Vr(e,t){var n,r,i,o,s;if(!t.fcmOptions&&!(!((n=t.notification)===null||n===void 0)&&n.click_action))return;e.fcmOptions={};let a=(i=(r=t.fcmOptions)===null||r===void 0?void 0:r.link)!==null&&i!==void 0?i:(o=t.notification)===null||o===void 0?void 0:o.click_action;a&&(e.fcmOptions.link=a);let c=(s=t.fcmOptions)===null||s===void 0?void 0:s.analytics_label;c&&(e.fcmOptions.analyticsLabel=c)}function Hr(e){return typeof e=="object"&&!!e&&_r in e}function Ur(e){return new Promise(t=>{setTimeout(t,e)})}_t("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o");_t("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");async function zr(e,t){let n=Kr(t,await e.firebaseDependencies.installations.getId());Wr(e,n,t.productId)}function Kr(e,t){var n,r;let i={};return e.from&&(i.project_number=e.from),e.fcmMessageId&&(i.message_id=e.fcmMessageId),i.instance_id=t,e.notification?i.message_type=K.DISPLAY_NOTIFICATION.toString():i.message_type=K.DATA_MESSAGE.toString(),i.sdk_platform=Er.toString(),i.package_name=self.origin.replace(/(^\w+:|^)\/\//,""),e.collapse_key&&(i.collapse_key=e.collapse_key),i.event=vr.toString(),!((n=e.fcmOptions)===null||n===void 0)&&n.analytics_label&&(i.analytics_label=(r=e.fcmOptions)===null||r===void 0?void 0:r.analytics_label),i}function Wr(e,t,n){let r={};r.event_time_ms=Math.floor(Date.now()).toString(),r.source_extension_json_proto3=JSON.stringify(t),n&&(r.compliance_data=qr(n)),e.logEvents.push(r)}function qr(e){return{privacy_context:{prequest:{origin_associated_product_id:e}}}}function _t(e,t){let n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));return n.join("")}async function Gr(e,t){var n,r;let{newSubscription:i}=e;if(!i){await Ie(t);return}let o=await De(t.firebaseDependencies);await Ie(t),t.vapidKey=(r=(n=o?.subscriptionOptions)===null||n===void 0?void 0:n.vapidKey)!==null&&r!==void 0?r:mt,await Br(t)}async function Jr(e,t){let n=Xr(e);if(!n)return;t.deliveryMetricsExportedToBigQueryEnabled&&await zr(t,n);let r=await Et();if(ei(r))return ti(r,n);if(n.notification&&await ni(Qr(n)),!!t&&t.onBackgroundMessageHandler){let i=jr(n);typeof t.onBackgroundMessageHandler=="function"?await t.onBackgroundMessageHandler(i):t.onBackgroundMessageHandler.next(i)}}async function Yr(e){var t,n;let r=(n=(t=e.notification)===null||t===void 0?void 0:t.data)===null||n===void 0?void 0:n[bt];if(r){if(e.action)return}else return;e.stopImmediatePropagation(),e.notification.close();let i=ri(r);if(!i)return;let o=new URL(i,self.location.href),s=new URL(self.location.origin);if(o.host!==s.host)return;let a=await Zr(o);if(a?a=await a.focus():(a=await self.clients.openWindow(i),await Ur(3e3)),!!a)return r.messageType=W.NOTIFICATION_CLICKED,r.isFirebaseMessaging=!0,a.postMessage(r)}function Qr(e){let t=Object.assign({},e.notification);return t.data={[bt]:e},t}function Xr({data:e}){if(!e)return null;try{return e.json()}catch{return null}}async function Zr(e){let t=await Et();for(let n of t){let r=new URL(n.url,self.location.href);if(e.host===r.host)return n}return null}function ei(e){return e.some(t=>t.visibilityState==="visible"&&!t.url.startsWith("chrome-extension://"))}function ti(e,t){t.isFirebaseMessaging=!0,t.messageType=W.PUSH_RECEIVED;for(let n of e)n.postMessage(t)}function Et(){return self.clients.matchAll({type:"window",includeUncontrolled:!0})}function ni(e){var t;let{actions:n}=e,{maxActions:r}=Notification;return n&&r&&n.length>r&&console.warn(`This browser only supports ${r} actions. The remaining actions will not be displayed.`),self.registration.showNotification((t=e.title)!==null&&t!==void 0?t:"",e)}function ri(e){var t,n,r;let i=(n=(t=e.fcmOptions)===null||t===void 0?void 0:t.link)!==null&&n!==void 0?n:(r=e.notification)===null||r===void 0?void 0:r.click_action;return i||(Hr(e.data)?self.location.origin:null)}function ii(e){if(!e||!e.options)throw ve("App Configuration Object");if(!e.name)throw ve("App Name");let t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(let r of t)if(!n[r])throw ve(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function ve(e){return h.create("missing-app-config-values",{valueName:e})}var Se=class{constructor(t,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;let i=ii(t);this.firebaseDependencies={app:t,appConfig:i,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}};var oi=e=>{let t=new Se(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return self.addEventListener("push",n=>{n.waitUntil(Jr(n,t))}),self.addEventListener("pushsubscriptionchange",n=>{n.waitUntil(Gr(n,t))}),self.addEventListener("notificationclick",n=>{n.waitUntil(Yr(n))}),t};function si(){_(new d("messaging-sw",oi,"PUBLIC"))}async function xe(){return B()&&await R()&&"PushManager"in self&&"Notification"in self&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}function ai(e,t){if(self.document!==void 0)throw h.create("only-available-in-sw");return e.onBackgroundMessageHandler=t,()=>{e.onBackgroundMessageHandler=null}}function vt(e=de()){return xe().then(t=>{if(!t)throw h.create("unsupported-browser")},t=>{throw h.create("indexed-db-unsupported")}),k(Y(e),"messaging-sw").getImmediate()}function It(e,t){return e=Y(e),ai(e,t)}si();var ci="firebase",ui="10.10.0";y(ci,ui,"app");var fi={apiKey:"AIzaSyDgHLq3Fbkq9LXl73lgMeqBhNv93x2ZlYc",authDomain:"keeth-playground.firebaseapp.com",projectId:"keeth-playground",storageBucket:"keeth-playground.appspot.com",messagingSenderId:"69915345896",appId:"1:69915345896:web:5f47c873ab725f9b9a9a5d"},li=le(fi);self.addEventListener("activate",e=>{e.waitUntil(self.clients.claim())});xe().then(()=>{let e=vt(li);It(e,t=>{console.log("[firebase-messaging-sw.js] Received background message ",t);let{title:n,body:r,image:i}=t.notification??{};n&&self.registration.showNotification(n,{body:r,icon:i})})}).catch(e=>{console.error(e)});})();
/*! Bundled license information:

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/util/dist/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/component/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/logger/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/app/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/installations/dist/esm/index.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.sw.esm2017.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2018 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
   * in compliance with the License. You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software distributed under the License
   * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
   * or implied. See the License for the specific language governing permissions and limitations under
   * the License.
   *)
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.sw.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@firebase/messaging/dist/esm/index.sw.esm2017.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

firebase/app/dist/esm/index.esm.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *   http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
