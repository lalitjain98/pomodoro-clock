(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,n){e.exports=n(26)},19:function(e,t,n){},20:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),r=n(9),l=n.n(r),o=(n(19),n(3)),c=n(4),s=n(7),m=n(5),u=n(6),d=n(1),b=n(2),g=(n(20),n(21),n(12)),f=function(e){return i.a.createElement("div",{style:Object(b.a)({},e.styles,{width:"-webkit-fill-available",display:"flex"})},e.children)},E=function(e){return i.a.createElement("div",{style:Object(b.a)({},e.styles,{display:"flex",flexDirection:"column"})},e.children)},h=function(e){var t=e.idPrefix;return i.a.createElement("div",{style:{color:"#222"}},i.a.createElement(E,{styles:{alignItems:"center",justifyContent:"center",textAlign:"center"}},i.a.createElement(f,{styles:{alignItems:"center",justifyContent:"center",textAlign:"center"}},i.a.createElement("div",{style:{textAlign:"center",fontSize:"2em",padding:"0.5em"},id:t+"-label"},e.title)),i.a.createElement(f,{styles:{textAlign:"center",justifyContent:"center",alignItems:"center"}},i.a.createElement("button",{style:{color:"#444",padding:"0.5em",background:"none",border:"none"},className:"btn btn-link",disabled:e.disabled,id:t+"-decrement",onClick:function(){return e.onClick(-1)}},i.a.createElement("span",{className:"fa fa-2x fa-arrow-down fa-bold"})),i.a.createElement("div",{style:{fontFamily:"Digital-7 Mono",color:"black",padding:"0.5em",fontSize:"2em"},id:t+"-length"},e.count),i.a.createElement("button",{style:{color:"#444",padding:"0.5em",background:"none",border:"none"},className:"btn btn-link",disabled:e.disabled,id:t+"-increment",onClick:function(){return e.onClick(1)}},i.a.createElement("span",{className:"fa fa-2x fa-arrow-up fa-bold"})))))},y="Session";function k(e){return(e=Math.trunc(e))%10===e?"0"+e:e}var p=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(s.a)(this,Object(m.a)(t).call(this,e))).BEEP=null,n.clock=null,n.SESSION_TIME_DEFAULT=1500,n.BREAK_TIME_DEFAULT=300,n.state={session:n.SESSION_TIME_DEFAULT,break_:n.BREAK_TIME_DEFAULT,time:n.SESSION_TIME_DEFAULT,timerLabel:y,running:!1},n.toggleRun=n.toggleRun.bind(Object(d.a)(Object(d.a)(n))),n.startTimer=n.startTimer.bind(Object(d.a)(Object(d.a)(n))),n.pauseTimer=n.pauseTimer.bind(Object(d.a)(Object(d.a)(n))),n.resetTimer=n.resetTimer.bind(Object(d.a)(Object(d.a)(n))),n.playTimer=n.playTimer.bind(Object(d.a)(Object(d.a)(n))),n.handler=n.handler.bind(Object(d.a)(Object(d.a)(n))),n}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.BEEP=document.getElementById("beep")}},{key:"handleClick",value:function(e,t){var n=this;this.setState(function(a){var i=a.timerLabel,r=a.running,l=a.session,o=a.break_,c=Object.assign({},a);return console.log("Initial State",c),r?c:-1===t&&60===a[e]||1===t&&3600===a[e]?c:(console.log("Timer:",n.clock),console.log("timerLabel:",i),console.log("Key:",e),t*=60,i===y?"session"===e?(c.session=l+t,c.time=c.session):c.break_=o+t:"session"===e?c.session=l+t:(c.break_=o+t,c.time=c.break_),console.log("Final State",c),c)})}},{key:"toggleRun",value:function(){this.state.running?this.pauseTimer():this.playTimer()}},{key:"resetTimer",value:function(){var e=this;console.log(document.getElementById("time-left").innerText,document.getElementById("session-length")),this.BEEP.pause(),this.BEEP.currentTime=0,this.setState(function(t){return clearInterval(e.clock),Object(b.a)({},t,{timerLabel:y,time:e.SESSION_TIME_DEFAULT,running:!1,session:e.SESSION_TIME_DEFAULT,break_:e.BREAK_TIME_DEFAULT})})}},{key:"handler",value:function(){var e=this;0!==this.state.time?this.setState(function(e){return Object(b.a)({},e,{time:e.time-1})}):this.setState(function(t){return clearInterval(e.clock),e.startTimer(),Object(b.a)({},t,{time:t.timerLabel===y?t.break_:t.session,running:!1,timerLabel:t.timerLabel===y?"Break":y})},function(){})}},{key:"startTimer",value:function(){var e=this;console.log(document.getElementById("time-left").innerText,document.getElementById("session-length")),this.setState(function(t){return e.clock=setInterval(e.handler,1e3),Object(b.a)({},t,{running:!0,time:t.timerLabel===y?t.session:t.break_})},function(){})}},{key:"pauseTimer",value:function(){var e=this;console.log(document.getElementById("time-left").innerText,document.getElementById("session-length")),this.setState(function(t){return clearInterval(e.clock),Object(b.a)({},t,{running:!1})},function(){})}},{key:"playTimer",value:function(){var e=this;console.log(document.getElementById("time-left").innerText,document.getElementById("session-length")),this.setState(function(t){return e.clock=setInterval(e.handler,1e3),Object(b.a)({},t,{running:!0})},function(){})}},{key:"render",value:function(){var e=this;0===this.state.time&&this.BEEP.play();var t=i.a.createElement(a.Fragment,null,i.a.createElement(h,{disabled:!1,idPrefix:"break",title:"Break Length",onClick:function(t){return e.handleClick("break_",t)},count:this.state.break_/60}),i.a.createElement(h,{disabled:!1,idPrefix:"session",title:"Session Length",onClick:function(t){return e.handleClick("session",t)},count:this.state.session/60}));return i.a.createElement("div",null,i.a.createElement(f,{styles:{alignItems:"center",justifyContent:"center",textAlign:"center"}},i.a.createElement(g.a,{query:"(max-width: 768px)"},function(e){return e?i.a.createElement(E,null,t):i.a.createElement(f,null,t)})),i.a.createElement(f,null,i.a.createElement(E,{styles:{width:"-webkit-fill-available"}},i.a.createElement("div",{style:{margin:"1em",padding:"0.5em",alignSelf:"center",fontSize:"3em",color:"white",background:this.state.time<60?"linear-gradient(to bottom right, #ffdddd, #ffcccc)":"linear-gradient(to bottom right, #009999, #008888)",border:"10px double "+(this.state.time<60?"red":"white"),borderRadius:"10px",boxShadow:"0 0 10px 0 white"}},i.a.createElement(f,{styles:{textAlign:"center",alignItems:"center",justifyContent:"center"}},i.a.createElement("div",{style:{fontFamily:"Roboto Mono, Consolas",color:this.state.time<60?"red":"inherit",textAlign:"center",alignSelf:"center"},id:"timer-label"},this.state.timerLabel)),i.a.createElement(f,{styles:{textAlign:"center",alignItems:"center",justifyContent:"center"}},i.a.createElement("div",{style:{fontFamily:"Digital-7 Mono",color:this.state.time<60?"red":"inherit"},id:"time-left"},"".concat(k(this.state.time/60),":").concat(k(this.state.time%60))))),i.a.createElement(f,{styles:{justifyContent:"center"}},i.a.createElement("button",{style:{color:"#444",margin:"0.5em 1em",padding:"0.5em",background:"none",border:"none"},className:"btn btn-link",id:"start_stop",onClick:function(){return e.toggleRun()}},this.state.running?i.a.createElement("span",{className:"fa fa-2x fa-pause"}):i.a.createElement("span",{className:"fa fa-2x fa-play"})),i.a.createElement("button",{style:{margin:"0.5em 1em",color:"#444",padding:"0.5em",background:"none",border:"none"},className:"btn btn-link",id:"reset",onClick:function(){return e.resetTimer()}},i.a.createElement("span",{className:"fa fa-2x fa-refresh"}))))),i.a.createElement("audio",{src:"https://goo.gl/65cBl1",id:"beep"}))}}]),t}(a.Component),v=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"main-container"},i.a.createElement("div",{className:"container"},i.a.createElement("div",{style:{color:"#222",fontSize:"3em",padding:"0.5em 0",margin:0,textAlign:"center",alignSelf:"center"}},"Pomodoro Clock"),i.a.createElement(p,null)),i.a.createElement("footer",{style:{textAlign:"center",padding:"1.25em 1em",borderTop:"1px solid black"}},"Link to github repo: ",i.a.createElement("a",{style:{textDecoration:"none",color:"blue"},href:"https://github.com/lalitjain98/pomodoro-clock",rel:"noopener noreferrer",target:"_blank"},"github.com/lalitjain98/pomodoro-clock")))}}]),t}(a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[13,1,2]]]);
//# sourceMappingURL=main.46ee0c58.chunk.js.map