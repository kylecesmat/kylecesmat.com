_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[7],{"/0+H":function(e,t,n){"use strict";t.__esModule=!0,t.isInAmpMode=i,t.useAmp=function(){return i(o.default.useContext(a.AmpStateContext))};var r,o=(r=n("q1tI"))&&r.__esModule?r:{default:r},a=n("lwAK");function i(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.ampFirst,n=void 0!==t&&t,r=e.hybrid,o=void 0!==r&&r,a=e.hasQuery;return n||o&&(void 0!==a&&a)}},"/rII":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n("cFSR")}])},"7W2i":function(e,t,n){var r=n("SksO");e.exports=function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&r(e,t)}},"8Kt/":function(e,t,n){"use strict";n("lSNA");t.__esModule=!0,t.defaultHead=l,t.default=void 0;var r,o=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==typeof e&&"function"!==typeof e)return{default:e};var t=u();if(t&&t.has(e))return t.get(e);var n={},r=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var a=r?Object.getOwnPropertyDescriptor(e,o):null;a&&(a.get||a.set)?Object.defineProperty(n,o,a):n[o]=e[o]}n.default=e,t&&t.set(e,n);return n}(n("q1tI")),a=(r=n("Xuae"))&&r.__esModule?r:{default:r},i=n("lwAK"),s=n("FYa8"),c=n("/0+H");function u(){if("function"!==typeof WeakMap)return null;var e=new WeakMap;return u=function(){return e},e}function l(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=[o.default.createElement("meta",{charSet:"utf-8"})];return e||t.push(o.default.createElement("meta",{name:"viewport",content:"width=device-width"})),t}function f(e,t){return"string"===typeof t||"number"===typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((function(e,t){return"string"===typeof t||"number"===typeof t?e:e.concat(t)}),[])):e.concat(t)}var p=["name","httpEquiv","charSet","itemProp"];function d(e,t){return e.reduce((function(e,t){var n=o.default.Children.toArray(t.props.children);return e.concat(n)}),[]).reduce(f,[]).reverse().concat(l(t.inAmpMode)).filter(function(){var e=new Set,t=new Set,n=new Set,r={};return function(o){var a=!0;if(o.key&&"number"!==typeof o.key&&o.key.indexOf("$")>0){var i=o.key.slice(o.key.indexOf("$")+1);e.has(i)?a=!1:e.add(i)}switch(o.type){case"title":case"base":t.has(o.type)?a=!1:t.add(o.type);break;case"meta":for(var s=0,c=p.length;s<c;s++){var u=p[s];if(o.props.hasOwnProperty(u))if("charSet"===u)n.has(u)?a=!1:n.add(u);else{var l=o.props[u],f=r[u]||new Set;f.has(l)?a=!1:(f.add(l),r[u]=f)}}}return a}}()).reverse().map((function(e,t){var n=e.key||t;return o.default.cloneElement(e,{key:n})}))}function m(e){var t=e.children,n=(0,o.useContext)(i.AmpStateContext),r=(0,o.useContext)(s.HeadManagerContext);return o.default.createElement(a.default,{reduceComponentsToState:d,headManager:r,inAmpMode:(0,c.isInAmpMode)(n)},t)}m.rewind=function(){};var h=m;t.default=h},Bnag:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}},EbDI:function(e,t){e.exports=function(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}},"Ep+G":function(e,t,n){e.exports={bgTopo:"page_bgTopo__1WqL7"}},FYa8:function(e,t,n){"use strict";var r;t.__esModule=!0,t.HeadManagerContext=void 0;var o=((r=n("q1tI"))&&r.__esModule?r:{default:r}).default.createContext({});t.HeadManagerContext=o},Ijbi:function(e,t,n){var r=n("WkPL");e.exports=function(e){if(Array.isArray(e))return r(e)}},Nsbk:function(e,t){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},n(t)}e.exports=n},"OG+v":function(e,t,n){e.exports={timeline:"timeline_timeline__3PhXE",timeline__dot:"timeline_timeline__dot__uoGle",timeline__dot__right:"timeline_timeline__dot__right__3__RL",timeline__dot__left:"timeline_timeline__dot__left__CF6iA"}},PJYZ:function(e,t){e.exports=function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}},RIqP:function(e,t,n){var r=n("Ijbi"),o=n("EbDI"),a=n("ZhPi"),i=n("Bnag");e.exports=function(e){return r(e)||o(e)||a(e)||i()}},Xuae:function(e,t,n){"use strict";var r=n("RIqP"),o=n("lwsE"),a=n("W8MJ"),i=n("PJYZ"),s=n("7W2i"),c=n("a1gu"),u=n("Nsbk");function l(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=u(e);if(t){var o=u(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return c(this,n)}}t.__esModule=!0,t.default=void 0;var f=n("q1tI"),p=!1,d=function(e){s(n,e);var t=l(n);function n(e){var a;return o(this,n),(a=t.call(this,e))._hasHeadManager=void 0,a.emitChange=function(){a._hasHeadManager&&a.props.headManager.updateHead(a.props.reduceComponentsToState(r(a.props.headManager.mountedInstances),a.props))},a._hasHeadManager=a.props.headManager&&a.props.headManager.mountedInstances,p&&a._hasHeadManager&&(a.props.headManager.mountedInstances.add(i(a)),a.emitChange()),a}return a(n,[{key:"componentDidMount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.add(this),this.emitChange()}},{key:"componentDidUpdate",value:function(){this.emitChange()}},{key:"componentWillUnmount",value:function(){this._hasHeadManager&&this.props.headManager.mountedInstances.delete(this),this.emitChange()}},{key:"render",value:function(){return null}}]),n}(f.Component);t.default=d},YFqc:function(e,t,n){e.exports=n("cTJO")},a1gu:function(e,t,n){var r=n("cDf5"),o=n("PJYZ");e.exports=function(e,t){return!t||"object"!==r(t)&&"function"!==typeof t?o(e):t}},cFSR:function(e,t,n){"use strict";n.r(t);var r=n("q1tI"),o=n.n(r),a=n("YFqc"),i=n.n(a),s=n("xXss");function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var u=n("OG+v"),l=n.n(u),f=n("iuhU"),p=o.a.createElement,d=function(e){var t=e.position,n=e.title,r=e.description,o=e.secondaryDescription;return p("li",{className:Object(f.a)("flex","flex-col","w-full","sm:w-1/2","text-center","my-5","py-5","relative","bg-gray-100","sm:bg-transparent","z-10","left"===t&&"ml-auto")},p("span",null,p("b",null,n)),p("span",{className:"mt-1"},r),p("span",{className:"text-sm italic text-gray-700 mt-1"},o),p("span",{className:Object(f.a)(l.a.timeline__dot,"hidden","sm:flex","left"===t&&l.a.timeline__dot__left,"right"===t&&l.a.timeline__dot__right)}))},m=function(e){var t=e.items;return p("ul",{className:l.a.timeline},t.map((function(e,t){return p(d,c({key:e.title,position:Number.isInteger(t/2)?"right":"left"},e))})))},h=n("8Kt/"),y=n.n(h),v=o.a.createElement,g=[{title:"Global eCommerce Re-Platforming",description:"NextJS / Graphql / Node",secondaryDescription:"Oct 2019 - Ongoing"},{title:"Realtime Trading Terminal",description:"Websocket / Redux / Typescript",secondaryDescription:"Sept 2018 - Oct 2019"},{title:"Corporate Software Licensing Tool",description:"Redux / Node / SQL / Lerna",secondaryDescription:"May 2018 - Sept 2018"},{title:"Speedtest.net Data Visualization",description:"SVG / Redux / Mapbox",secondaryDescription:"July 2018 - May 2017"},{title:"Medical Outcome Tracker",description:"Devops / SVG / Redux",secondaryDescription:"March 2017 - July 2018"},{title:"Geospatial Analysis for Agriculture",description:"Redux / Mapbox / Flow",secondaryDescription:"November 2016 - March 2017"},{title:"Speedtest Custom",description:"Websocket / Pattern Library / SQL",secondaryDescription:"June 2016 - November 2016"}],b=[{title:"Realtime Data With Hooks",description:"PHX ReactJS Meetup - Feb 2019",secondaryDescription:v("a",{href:"https://github.com/kylecesmat/phxreact-realtime-hooks"},"View on Github")},{title:"Introduction to Svelte",description:"PhoenixJS Meetup - Jan 2019",secondaryDescription:""},{title:"Questionable Decisions w/ React.Context",description:"PHX ReactJS Meetup - May 2018",secondaryDescription:v("a",{href:"https://github.com/kylecesmat/phxreact-context-may-2018"},"View on Github")},{title:"Progressive Webapps With ReactJS",description:"PHX ReactJS Meetup - Dec 2017",secondaryDescription:v("a",{href:"https://github.com/kylecesmat/phxreactjs-progressive-webapps"},"View on Github")}],_=function(){return v(s.a,null,v(y.a,null,v("title",null,"Kyle Cesmat - Home"),v("meta",{name:"viewport",content:"initial-scale=1.0, width=device-width"})),v("section",{className:"p-5"},v("div",{className:"py-20"},v("h1",{className:"text-4xl sm:text-5xl font-semibold"},"Kyle Cesmat"),v("div",{className:"text-2xl mb-2"},"Software Engineer"),v("div",{className:"text-lg font-normal italic text-gray-700"},"I lead teams and build experiences for the modern web."))),v("section",{className:"p-10 bg-white"},v("p",null,"I am a software person who works with teams large & small to solve technical problems on the web. At Formidable I focus primarily on front-end expierences, optimizing application performance, building sustainable components & patterns for teams, and trying not to break too many things along the way!"),v("p",null,"I balance my time with hiking, biking, reading, and traveling. I like all things food & bev, cooking, and baking bread. On the weekends I like road trips and camping in the woods with my girlfriend & my dog."),v(i.a,{href:"/currently"},v("a",null,"See what I'm up to currently \u2192"))),v("section",{className:"p-10"},v("h2",{className:"text-center text-2xl font-semibold mb-2"},"Recent Projects"),v("p",{className:"mb-10 text-center"},"This is a handful of the projects I have worked on for the last four years at"," ",v("a",{href:"https://formidable.com/",target:"_blank nofollow noreferrer"},"Formidable"),". Being that I am a consultant, and am often bound by an NDA, details of the projects are light."),v(m,{items:g})),v("section",{className:"p-10"},v("h2",{className:"text-center text-2xl font-semibold mb-2"},"Speaking"),v("p",{className:"mb-10 text-center"},"I enjoy sharing in the open, and have gotten the opportunity to share at a few local meetups."),v(m,{items:b})))};t.default=_},cTJO:function(e,t,n){"use strict";var r=n("J4zp"),o=n("284h");t.__esModule=!0,t.default=void 0;var a,i=o(n("q1tI")),s=n("g/15"),c=n("nOHt"),u=n("elyg");var l=new Map,f=window.IntersectionObserver,p={};var d=function(e,t){var n=a||(f?a=new f((function(e){e.forEach((function(e){if(l.has(e.target)){var t=l.get(e.target);(e.isIntersecting||e.intersectionRatio>0)&&(a.unobserve(e.target),l.delete(e.target),t())}}))}),{rootMargin:"200px"}):void 0);return n?(n.observe(e),l.set(e,t),function(){try{n.unobserve(e)}catch(t){console.error(t)}l.delete(e)}):function(){}};function m(e,t,n,r){e.prefetch(t,n,r).catch((function(e){0})),p[t+"%"+n]=!0}function h(e,t,n,r,o,a,i){var c=e.currentTarget,u=c.nodeName,l=c.target;"A"===u&&(l&&"_self"!==l||e.metaKey||e.ctrlKey||e.shiftKey||e.nativeEvent&&2===e.nativeEvent.which)||function(e){var t=(0,s.getLocationOrigin)();return new URL(e,t).origin===t}(n)&&(e.preventDefault(),null==i&&(i=r.indexOf("#")<0),t[o?"replace":"push"](n,r,{shallow:a}).then((function(e){e&&i&&(window.scrollTo(0,0),document.body.focus())})))}var y=function(e){var t=!1!==e.prefetch,n=i.default.useState(),o=r(n,2),a=o[0],s=o[1],l=(0,c.useRouter)(),y=l&&l.pathname||"/",v=i.default.useMemo((function(){var t=(0,u.resolveHref)(y,e.href);return{href:t,as:e.as?(0,u.resolveHref)(y,e.as):t}}),[y,e.href,e.as]),g=v.href,b=v.as;i.default.useEffect((function(){if(t&&f&&a&&a.tagName&&!p[g+"%"+b])return d(a,(function(){m(l,g,b)}))}),[t,a,g,b,l]);var _=e.children,w=e.replace,x=e.shallow,M=e.scroll;"string"===typeof _&&(_=i.default.createElement("a",null,_));var k=i.Children.only(_),S={ref:function(e){e&&s(e),k&&"object"===typeof k&&k.ref&&("function"===typeof k.ref?k.ref(e):"object"===typeof k.ref&&(k.ref.current=e))},onClick:function(e){k.props&&"function"===typeof k.props.onClick&&k.props.onClick(e),e.defaultPrevented||h(e,l,g,b,w,x,M)}};return t&&(S.onMouseEnter=function(e){k.props&&"function"===typeof k.props.onMouseEnter&&k.props.onMouseEnter(e),m(l,g,b,{priority:!0})}),!e.passHref&&("a"!==k.type||"href"in k.props)||(S.href=(0,u.addBasePath)(b)),i.default.cloneElement(k,S)};t.default=y},iuhU:function(e,t,n){"use strict";function r(e){var t,n,o="";if("string"===typeof e||"number"===typeof e)o+=e;else if("object"===typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}t.a=function(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o}},lSNA:function(e,t){e.exports=function(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}},lwAK:function(e,t,n){"use strict";var r;t.__esModule=!0,t.AmpStateContext=void 0;var o=((r=n("q1tI"))&&r.__esModule?r:{default:r}).default.createContext({});t.AmpStateContext=o},xXss:function(e,t,n){"use strict";var r=n("q1tI"),o=n.n(r),a=n("Ep+G"),i=n.n(a),s=o.a.createElement,c=function(e){var t=e.children;return s("section",null,s("div",{className:"max-w-4xl my-0 mx-auto relative z-10"},t),s("div",{className:i.a.bgTopo}))};t.a=c}},[["/rII",0,1,2]]]);