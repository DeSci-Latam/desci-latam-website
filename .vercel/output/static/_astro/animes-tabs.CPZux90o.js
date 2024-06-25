import{j as u}from"./jsx-runtime.SN7vRHW2.js";import{r as h}from"./index.CMQ3OGCn.js";import{c as oe,d as ie,u as Ge,a as P,P as He}from"./index.ws-AkMl3.js";import{c as Be}from"./index.Blrfq9q_.js";import{u as Ve,P as N}from"./index.BUSt7gCi.js";import{u as se,a as ce}from"./createLucideIcon.D-ywHMOr.js";import{c as V}from"./utils.CP77xEu2.js";import{I as Qe}from"./index.BD67RL0F.js";import"./index.s-Xjfene.js";function w(e){const t=Object.prototype.toString.call(e);return e instanceof Date||typeof e=="object"&&t==="[object Date]"?new e.constructor(+e):typeof e=="number"||t==="[object Number]"||typeof e=="string"||t==="[object String]"?new Date(e):new Date(NaN)}function D(e,t){return e instanceof Date?new e.constructor(t):new Date(t)}const ue=6048e5,Xe=864e5,K=6e4,z=525600,J=43200,Z=1440;let Ue={};function W(){return Ue}function I(e,t){const n=W(),r=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,a=w(e),o=a.getDay(),i=(o<r?7:0)+o-r;return a.setDate(a.getDate()-i),a.setHours(0,0,0,0),a}function R(e){return I(e,{weekStartsOn:1})}function de(e){const t=w(e),n=t.getFullYear(),r=D(e,0);r.setFullYear(n+1,0,4),r.setHours(0,0,0,0);const a=R(r),o=D(e,0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);const i=R(o);return t.getTime()>=a.getTime()?n+1:t.getTime()>=i.getTime()?n:n-1}function ee(e){const t=w(e);return t.setHours(0,0,0,0),t}function Y(e){const t=w(e),n=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return n.setUTCFullYear(t.getFullYear()),+e-+n}function $e(e,t){const n=ee(e),r=ee(t),a=+n-Y(n),o=+r-Y(r);return Math.round((a-o)/Xe)}function Ke(e){const t=de(e),n=D(e,0);return n.setFullYear(t,0,4),n.setHours(0,0,0,0),R(n)}function ze(e,t){const n=w(e),r=w(t),a=n.getTime()-r.getTime();return a<0?-1:a>0?1:a}function Je(e){return D(e,Date.now())}function Ze(e){return e instanceof Date||typeof e=="object"&&Object.prototype.toString.call(e)==="[object Date]"}function et(e){if(!Ze(e)&&typeof e!="number")return!1;const t=w(e);return!isNaN(Number(t))}function tt(e){return t=>{const r=(e?Math[e]:Math.trunc)(t);return r===0?0:r}}function nt(e){const t=w(e),n=D(e,0);return n.setFullYear(t.getFullYear(),0,1),n.setHours(0,0,0,0),n}const rt={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},at=(e,t,n)=>{let r;const a=rt[e];return typeof a=="string"?r=a:t===1?r=a.one:r=a.other.replace("{{count}}",t.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"in "+r:r+" ago":r};function q(e){return(t={})=>{const n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}const ot={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},it={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},st={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},ct={date:q({formats:ot,defaultWidth:"full"}),time:q({formats:it,defaultWidth:"full"}),dateTime:q({formats:st,defaultWidth:"full"})},ut={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},dt=(e,t,n,r)=>ut[e];function E(e){return(t,n)=>{const r=n?.context?String(n.context):"standalone";let a;if(r==="formatting"&&e.formattingValues){const i=e.defaultFormattingWidth||e.defaultWidth,l=n?.width?String(n.width):i;a=e.formattingValues[l]||e.formattingValues[i]}else{const i=e.defaultWidth,l=n?.width?String(n.width):e.defaultWidth;a=e.values[l]||e.values[i]}const o=e.argumentCallback?e.argumentCallback(t):t;return a[o]}}const lt={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},ft={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},mt={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},ht={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},gt={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},bt={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},wt=(e,t)=>{const n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},pt={ordinalNumber:wt,era:E({values:lt,defaultWidth:"wide"}),quarter:E({values:ft,defaultWidth:"wide",argumentCallback:e=>e-1}),month:E({values:mt,defaultWidth:"wide"}),day:E({values:ht,defaultWidth:"wide"}),dayPeriod:E({values:gt,defaultWidth:"wide",formattingValues:bt,defaultFormattingWidth:"wide"})};function C(e){return(t,n={})=>{const r=n.width,a=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],o=t.match(a);if(!o)return null;const i=o[0],l=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],m=Array.isArray(l)?vt(l,s=>s.test(i)):yt(l,s=>s.test(i));let d;d=e.valueCallback?e.valueCallback(m):m,d=n.valueCallback?n.valueCallback(d):d;const c=t.slice(i.length);return{value:d,rest:c}}}function yt(e,t){for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&t(e[n]))return n}function vt(e,t){for(let n=0;n<e.length;n++)if(t(e[n]))return n}function xt(e){return(t,n={})=>{const r=t.match(e.matchPattern);if(!r)return null;const a=r[0],o=t.match(e.parsePattern);if(!o)return null;let i=e.valueCallback?e.valueCallback(o[0]):o[0];i=n.valueCallback?n.valueCallback(i):i;const l=t.slice(a.length);return{value:i,rest:l}}}const Tt=/^(\d+)(th|st|nd|rd)?/i,Mt=/\d+/i,Pt={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},Ot={any:[/^b/i,/^(a|c)/i]},Dt={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},St={any:[/1/i,/2/i,/3/i,/4/i]},kt={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},Ft={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Nt={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Et={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},Ct={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},It={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Wt={ordinalNumber:xt({matchPattern:Tt,parsePattern:Mt,valueCallback:e=>parseInt(e,10)}),era:C({matchPatterns:Pt,defaultMatchWidth:"wide",parsePatterns:Ot,defaultParseWidth:"any"}),quarter:C({matchPatterns:Dt,defaultMatchWidth:"wide",parsePatterns:St,defaultParseWidth:"any",valueCallback:e=>e+1}),month:C({matchPatterns:kt,defaultMatchWidth:"wide",parsePatterns:Ft,defaultParseWidth:"any"}),day:C({matchPatterns:Nt,defaultMatchWidth:"wide",parsePatterns:Et,defaultParseWidth:"any"}),dayPeriod:C({matchPatterns:Ct,defaultMatchWidth:"any",parsePatterns:It,defaultParseWidth:"any"})},le={code:"en-US",formatDistance:at,formatLong:ct,formatRelative:dt,localize:pt,match:Wt,options:{weekStartsOn:0,firstWeekContainsDate:1}};function Rt(e){const t=w(e);return $e(t,nt(t))+1}function Yt(e){const t=w(e),n=+R(t)-+Ke(t);return Math.round(n/ue)+1}function fe(e,t){const n=w(e),r=n.getFullYear(),a=W(),o=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,i=D(e,0);i.setFullYear(r+1,0,o),i.setHours(0,0,0,0);const l=I(i,t),m=D(e,0);m.setFullYear(r,0,o),m.setHours(0,0,0,0);const d=I(m,t);return n.getTime()>=l.getTime()?r+1:n.getTime()>=d.getTime()?r:r-1}function jt(e,t){const n=W(),r=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,a=fe(e,t),o=D(e,0);return o.setFullYear(a,0,r),o.setHours(0,0,0,0),I(o,t)}function _t(e,t){const n=w(e),r=+I(n,t)-+jt(n,t);return Math.round(r/ue)+1}function f(e,t){const n=e<0?"-":"",r=Math.abs(e).toString().padStart(t,"0");return n+r}const O={y(e,t){const n=e.getFullYear(),r=n>0?n:1-n;return f(t==="yy"?r%100:r,t.length)},M(e,t){const n=e.getMonth();return t==="M"?String(n+1):f(n+1,2)},d(e,t){return f(e.getDate(),t.length)},a(e,t){const n=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];case"aaaa":default:return n==="am"?"a.m.":"p.m."}},h(e,t){return f(e.getHours()%12||12,t.length)},H(e,t){return f(e.getHours(),t.length)},m(e,t){return f(e.getMinutes(),t.length)},s(e,t){return f(e.getSeconds(),t.length)},S(e,t){const n=t.length,r=e.getMilliseconds(),a=Math.trunc(r*Math.pow(10,n-3));return f(a,t.length)}},F={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},te={G:function(e,t,n){const r=e.getFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if(t==="yo"){const r=e.getFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return O.y(e,t)},Y:function(e,t,n,r){const a=fe(e,r),o=a>0?a:1-a;if(t==="YY"){const i=o%100;return f(i,2)}return t==="Yo"?n.ordinalNumber(o,{unit:"year"}):f(o,t.length)},R:function(e,t){const n=de(e);return f(n,t.length)},u:function(e,t){const n=e.getFullYear();return f(n,t.length)},Q:function(e,t,n){const r=Math.ceil((e.getMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return f(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){const r=Math.ceil((e.getMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return f(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){const r=e.getMonth();switch(t){case"M":case"MM":return O.M(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){const r=e.getMonth();switch(t){case"L":return String(r+1);case"LL":return f(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(e,t,n,r){const a=_t(e,r);return t==="wo"?n.ordinalNumber(a,{unit:"week"}):f(a,t.length)},I:function(e,t,n){const r=Yt(e);return t==="Io"?n.ordinalNumber(r,{unit:"week"}):f(r,t.length)},d:function(e,t,n){return t==="do"?n.ordinalNumber(e.getDate(),{unit:"date"}):O.d(e,t)},D:function(e,t,n){const r=Rt(e);return t==="Do"?n.ordinalNumber(r,{unit:"dayOfYear"}):f(r,t.length)},E:function(e,t,n){const r=e.getDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){const a=e.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return f(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){const a=e.getDay(),o=(a-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return f(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,n){const r=e.getDay(),a=r===0?7:r;switch(t){case"i":return String(a);case"ii":return f(a,t.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){const a=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,n){const r=e.getHours();let a;switch(r===12?a=F.noon:r===0?a=F.midnight:a=r/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},B:function(e,t,n){const r=e.getHours();let a;switch(r>=17?a=F.evening:r>=12?a=F.afternoon:r>=4?a=F.morning:a=F.night,t){case"B":case"BB":case"BBB":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(a,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},h:function(e,t,n){if(t==="ho"){let r=e.getHours()%12;return r===0&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return O.h(e,t)},H:function(e,t,n){return t==="Ho"?n.ordinalNumber(e.getHours(),{unit:"hour"}):O.H(e,t)},K:function(e,t,n){const r=e.getHours()%12;return t==="Ko"?n.ordinalNumber(r,{unit:"hour"}):f(r,t.length)},k:function(e,t,n){let r=e.getHours();return r===0&&(r=24),t==="ko"?n.ordinalNumber(r,{unit:"hour"}):f(r,t.length)},m:function(e,t,n){return t==="mo"?n.ordinalNumber(e.getMinutes(),{unit:"minute"}):O.m(e,t)},s:function(e,t,n){return t==="so"?n.ordinalNumber(e.getSeconds(),{unit:"second"}):O.s(e,t)},S:function(e,t){return O.S(e,t)},X:function(e,t,n){const r=e.getTimezoneOffset();if(r===0)return"Z";switch(t){case"X":return re(r);case"XXXX":case"XX":return k(r);case"XXXXX":case"XXX":default:return k(r,":")}},x:function(e,t,n){const r=e.getTimezoneOffset();switch(t){case"x":return re(r);case"xxxx":case"xx":return k(r);case"xxxxx":case"xxx":default:return k(r,":")}},O:function(e,t,n){const r=e.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+ne(r,":");case"OOOO":default:return"GMT"+k(r,":")}},z:function(e,t,n){const r=e.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+ne(r,":");case"zzzz":default:return"GMT"+k(r,":")}},t:function(e,t,n){const r=Math.trunc(e.getTime()/1e3);return f(r,t.length)},T:function(e,t,n){const r=e.getTime();return f(r,t.length)}};function ne(e,t=""){const n=e>0?"-":"+",r=Math.abs(e),a=Math.trunc(r/60),o=r%60;return o===0?n+String(a):n+String(a)+t+f(o,2)}function re(e,t){return e%60===0?(e>0?"-":"+")+f(Math.abs(e)/60,2):k(e,t)}function k(e,t=""){const n=e>0?"-":"+",r=Math.abs(e),a=f(Math.trunc(r/60),2),o=f(r%60,2);return n+a+t+o}const ae=(e,t)=>{switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}},me=(e,t)=>{switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}},At=(e,t)=>{const n=e.match(/(P+)(p+)?/)||[],r=n[1],a=n[2];if(!a)return ae(e,t);let o;switch(r){case"P":o=t.dateTime({width:"short"});break;case"PP":o=t.dateTime({width:"medium"});break;case"PPP":o=t.dateTime({width:"long"});break;case"PPPP":default:o=t.dateTime({width:"full"});break}return o.replace("{{date}}",ae(r,t)).replace("{{time}}",me(a,t))},Lt={p:me,P:At},qt=/^D+$/,Gt=/^Y+$/,Ht=["D","DD","YY","YYYY"];function Bt(e){return qt.test(e)}function Vt(e){return Gt.test(e)}function Qt(e,t,n){const r=Xt(e,t,n);if(console.warn(r),Ht.includes(e))throw new RangeError(r)}function Xt(e,t,n){const r=e[0]==="Y"?"years":"days of the month";return`Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}const Ut=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,$t=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Kt=/^'([^]*?)'?$/,zt=/''/g,Jt=/[a-zA-Z]/;function Zt(e,t,n){const r=W(),a=r.locale??le,o=r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,i=r.weekStartsOn??r.locale?.options?.weekStartsOn??0,l=w(e);if(!et(l))throw new RangeError("Invalid time value");let m=t.match($t).map(c=>{const s=c[0];if(s==="p"||s==="P"){const p=Lt[s];return p(c,a.formatLong)}return c}).join("").match(Ut).map(c=>{if(c==="''")return{isToken:!1,value:"'"};const s=c[0];if(s==="'")return{isToken:!1,value:en(c)};if(te[s])return{isToken:!0,value:c};if(s.match(Jt))throw new RangeError("Format string contains an unescaped latin alphabet character `"+s+"`");return{isToken:!1,value:c}});a.localize.preprocessor&&(m=a.localize.preprocessor(l,m));const d={firstWeekContainsDate:o,weekStartsOn:i,locale:a};return m.map(c=>{if(!c.isToken)return c.value;const s=c.value;(Vt(s)||Bt(s))&&Qt(s,t,String(e));const p=te[s[0]];return p(l,s,a.localize,d)}).join("")}function en(e){const t=e.match(Kt);return t?t[1].replace(zt,"'"):e}function tn(e,t,n){const r=W(),a=n?.locale??r.locale??le,o=ze(e,t);if(isNaN(o))throw new RangeError("Invalid time value");const i=Object.assign({},n,{addSuffix:n?.addSuffix,comparison:o});let l,m;o>0?(l=w(t),m=w(e)):(l=w(e),m=w(t));const d=tt(n?.roundingMethod??"round"),c=m.getTime()-l.getTime(),s=c/K,p=Y(m)-Y(l),x=(c-p)/K,b=n?.unit;let g;if(b?g=b:s<1?g="second":s<60?g="minute":s<Z?g="hour":x<J?g="day":x<z?g="month":g="year",g==="second"){const y=d(c/1e3);return a.formatDistance("xSeconds",y,i)}else if(g==="minute"){const y=d(s);return a.formatDistance("xMinutes",y,i)}else if(g==="hour"){const y=d(s/60);return a.formatDistance("xHours",y,i)}else if(g==="day"){const y=d(x/Z);return a.formatDistance("xDays",y,i)}else if(g==="month"){const y=d(x/J);return y===12&&b!=="month"?a.formatDistance("xYears",1,i):a.formatDistance("xMonths",y,i)}else{const y=d(x/z);return a.formatDistance("xYears",y,i)}}function nn(e,t){return tn(e,Je(e),t)}function G(e){return w(e*1e3)}function rn(e){return+w(e)<Date.now()}var H="rovingFocusGroup.onEntryFocus",an={bubbles:!1,cancelable:!0},j="RovingFocusGroup",[B,he,on]=Be(j),[sn,ge]=oe(j,[on]),[cn,un]=sn(j),be=h.forwardRef((e,t)=>u.jsx(B.Provider,{scope:e.__scopeRovingFocusGroup,children:u.jsx(B.Slot,{scope:e.__scopeRovingFocusGroup,children:u.jsx(dn,{...e,ref:t})})}));be.displayName=j;var dn=h.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,orientation:r,loop:a=!1,dir:o,currentTabStopId:i,defaultCurrentTabStopId:l,onCurrentTabStopIdChange:m,onEntryFocus:d,preventScrollOnEntryFocus:c=!1,...s}=e,p=h.useRef(null),x=Ve(t,p),b=ie(o),[g=null,y]=se({prop:i,defaultProp:l,onChange:m}),[T,M]=h.useState(!1),_=Ge(d),Ye=he(n),A=h.useRef(!1),[je,U]=h.useState(0);return h.useEffect(()=>{const v=p.current;if(v)return v.addEventListener(H,_),()=>v.removeEventListener(H,_)},[_]),u.jsx(cn,{scope:n,orientation:r,dir:b,loop:a,currentTabStopId:g,onItemFocus:h.useCallback(v=>y(v),[y]),onItemShiftTab:h.useCallback(()=>M(!0),[]),onFocusableItemAdd:h.useCallback(()=>U(v=>v+1),[]),onFocusableItemRemove:h.useCallback(()=>U(v=>v-1),[]),children:u.jsx(N.div,{tabIndex:T||je===0?-1:0,"data-orientation":r,...s,ref:x,style:{outline:"none",...e.style},onMouseDown:P(e.onMouseDown,()=>{A.current=!0}),onFocus:P(e.onFocus,v=>{const _e=!A.current;if(v.target===v.currentTarget&&_e&&!T){const $=new CustomEvent(H,an);if(v.currentTarget.dispatchEvent($),!$.defaultPrevented){const L=Ye().filter(S=>S.focusable),Ae=L.find(S=>S.active),Le=L.find(S=>S.id===g),qe=[Ae,Le,...L].filter(Boolean).map(S=>S.ref.current);ye(qe,c)}}A.current=!1}),onBlur:P(e.onBlur,()=>M(!1))})})}),we="RovingFocusGroupItem",pe=h.forwardRef((e,t)=>{const{__scopeRovingFocusGroup:n,focusable:r=!0,active:a=!1,tabStopId:o,...i}=e,l=ce(),m=o||l,d=un(we,n),c=d.currentTabStopId===m,s=he(n),{onFocusableItemAdd:p,onFocusableItemRemove:x}=d;return h.useEffect(()=>{if(r)return p(),()=>x()},[r,p,x]),u.jsx(B.ItemSlot,{scope:n,id:m,focusable:r,active:a,children:u.jsx(N.span,{tabIndex:c?0:-1,"data-orientation":d.orientation,...i,ref:t,onMouseDown:P(e.onMouseDown,b=>{r?d.onItemFocus(m):b.preventDefault()}),onFocus:P(e.onFocus,()=>d.onItemFocus(m)),onKeyDown:P(e.onKeyDown,b=>{if(b.key==="Tab"&&b.shiftKey){d.onItemShiftTab();return}if(b.target!==b.currentTarget)return;const g=mn(b,d.orientation,d.dir);if(g!==void 0){if(b.metaKey||b.ctrlKey||b.altKey||b.shiftKey)return;b.preventDefault();let T=s().filter(M=>M.focusable).map(M=>M.ref.current);if(g==="last")T.reverse();else if(g==="prev"||g==="next"){g==="prev"&&T.reverse();const M=T.indexOf(b.currentTarget);T=d.loop?hn(T,M+1):T.slice(M+1)}setTimeout(()=>ye(T))}})})})});pe.displayName=we;var ln={ArrowLeft:"prev",ArrowUp:"prev",ArrowRight:"next",ArrowDown:"next",PageUp:"first",Home:"first",PageDown:"last",End:"last"};function fn(e,t){return t!=="rtl"?e:e==="ArrowLeft"?"ArrowRight":e==="ArrowRight"?"ArrowLeft":e}function mn(e,t,n){const r=fn(e.key,n);if(!(t==="vertical"&&["ArrowLeft","ArrowRight"].includes(r))&&!(t==="horizontal"&&["ArrowUp","ArrowDown"].includes(r)))return ln[r]}function ye(e,t=!1){const n=document.activeElement;for(const r of e)if(r===n||(r.focus({preventScroll:t}),document.activeElement!==n))return}function hn(e,t){return e.map((n,r)=>e[(t+r)%e.length])}var gn=be,bn=pe,Q="Tabs",[wn,In]=oe(Q,[ge]),ve=ge(),[pn,X]=wn(Q),xe=h.forwardRef((e,t)=>{const{__scopeTabs:n,value:r,onValueChange:a,defaultValue:o,orientation:i="horizontal",dir:l,activationMode:m="automatic",...d}=e,c=ie(l),[s,p]=se({prop:r,onChange:a,defaultProp:o});return u.jsx(pn,{scope:n,baseId:ce(),value:s,onValueChange:p,orientation:i,dir:c,activationMode:m,children:u.jsx(N.div,{dir:c,"data-orientation":i,...d,ref:t})})});xe.displayName=Q;var Te="TabsList",Me=h.forwardRef((e,t)=>{const{__scopeTabs:n,loop:r=!0,...a}=e,o=X(Te,n),i=ve(n);return u.jsx(gn,{asChild:!0,...i,orientation:o.orientation,dir:o.dir,loop:r,children:u.jsx(N.div,{role:"tablist","aria-orientation":o.orientation,...a,ref:t})})});Me.displayName=Te;var Pe="TabsTrigger",Oe=h.forwardRef((e,t)=>{const{__scopeTabs:n,value:r,disabled:a=!1,...o}=e,i=X(Pe,n),l=ve(n),m=ke(i.baseId,r),d=Fe(i.baseId,r),c=r===i.value;return u.jsx(bn,{asChild:!0,...l,focusable:!a,active:c,children:u.jsx(N.button,{type:"button",role:"tab","aria-selected":c,"aria-controls":d,"data-state":c?"active":"inactive","data-disabled":a?"":void 0,disabled:a,id:m,...o,ref:t,onMouseDown:P(e.onMouseDown,s=>{!a&&s.button===0&&s.ctrlKey===!1?i.onValueChange(r):s.preventDefault()}),onKeyDown:P(e.onKeyDown,s=>{[" ","Enter"].includes(s.key)&&i.onValueChange(r)}),onFocus:P(e.onFocus,()=>{const s=i.activationMode!=="manual";!c&&!a&&s&&i.onValueChange(r)})})})});Oe.displayName=Pe;var De="TabsContent",Se=h.forwardRef((e,t)=>{const{__scopeTabs:n,value:r,forceMount:a,children:o,...i}=e,l=X(De,n),m=ke(l.baseId,r),d=Fe(l.baseId,r),c=r===l.value,s=h.useRef(c);return h.useEffect(()=>{const p=requestAnimationFrame(()=>s.current=!1);return()=>cancelAnimationFrame(p)},[]),u.jsx(He,{present:a||c,children:({present:p})=>u.jsx(N.div,{"data-state":c?"active":"inactive","data-orientation":l.orientation,role:"tabpanel","aria-labelledby":m,hidden:!p,id:d,tabIndex:0,...i,ref:t,style:{...e.style,animationDuration:s.current?"0s":void 0},children:p&&o})})});Se.displayName=De;function ke(e,t){return`${e}-trigger-${t}`}function Fe(e,t){return`${e}-content-${t}`}var yn=xe,Ne=Me,Ee=Oe,Ce=Se;const vn=yn,Ie=h.forwardRef(({className:e,...t},n)=>u.jsx(Ne,{ref:n,className:V("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",e),...t}));Ie.displayName=Ne.displayName;const We=h.forwardRef(({className:e,...t},n)=>u.jsx(Ee,{ref:n,className:V("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",e),...t}));We.displayName=Ee.displayName;const Re=h.forwardRef(({className:e,...t},n)=>u.jsx(Ce,{ref:n,className:V("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",e),...t}));Re.displayName=Ce.displayName;const xn=[{value:"latestAiring",label:"In Last 24 Hours",icon:"tv"},{value:"futureAiring",label:"Coming Up Next!",icon:"clock"},{value:"trending",label:"Trending",icon:"flame"},{value:"upcomingSeason",label:"Upcoming Season",icon:"calendar"}];function Wn({animes:e}){return u.jsxs(vn,{defaultValue:"latestAiring",className:"w-full",children:[u.jsx("p",{className:"text-sm text-muted-foreground",children:u.jsx("i",{children:"Images aren't optimized."})}),u.jsx(Ie,{className:"!bg-muted/80 mt-2 mb-4",children:xn.map(t=>{const n=Qe[t.icon||"flame"];return u.jsx(We,{value:t.value,children:u.jsxs("div",{className:"flex gap-x-2 items-center",children:[u.jsx(n,{className:"size-5"}),u.jsx("span",{className:"hidden sm:inline-flex",children:t.label})]})},t.value)})}),Object.entries(e).map(([t,n])=>u.jsx(Re,{value:t,children:u.jsx("div",{className:"anime-grid",children:n.map((r,a)=>u.jsx(Tn,{data:r},t+"-"+a))})},t))]})}function Tn({data:e}){let t,n,r;return"media"in e?(t=e.media,n=e.airingAt,r=e.episode):t=e,u.jsxs("div",{className:"flex flex-col w-full",children:[u.jsx("div",{className:"w-full h-[280px] rounded-md overflow-hidden bg-muted-foreground/15",children:u.jsx("img",{width:260,height:300,loading:"eager",className:"size-full object-cover object-center",src:t.coverImage.extraLarge,alt:t.title.userPreferred})}),u.jsxs("div",{className:"flex w-full flex-col justify-center",children:[u.jsx("p",{className:"font-medium text-sm text-balance line-clamp-1 mt-1 text-foreground",children:t.title.userPreferred}),n&&r?u.jsxs("p",{className:"flex text-xs sm:text-[13px] font-medium text-muted-foreground line-clamp-1",children:[rn(G(n))?nn(G(n),{addSuffix:!0}):Zt(G(n),"p"),"  •  Ep. ",r]}):null]})]})}export{Wn as AnimesTabs};
