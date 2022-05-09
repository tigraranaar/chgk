(this["webpackJsonpquiz-app"]=this["webpackJsonpquiz-app"]||[]).push([[0],{1:function(e,t,a){e.exports={modal:"FormModal_modal__2sArr",upper:"FormModal_upper__3wdXD",message:"FormModal_message__2t4TD",top:"FormModal_top__2Z12_",lower:"FormModal_lower__3TKRb",cards:"FormModal_cards__1--OA",stacked:"FormModal_stacked__3YQq6",unstacked:"FormModal_unstacked__3ZXzV",inputGroup:"FormModal_inputGroup__3X57Q",joinCard:"FormModal_joinCard__3aqyp",successCard:"FormModal_successCard__2_cPN",room:"FormModal_room__2A58_",roomCard:"FormModal_roomCard__10QtD",errorSlider:"FormModal_errorSlider__1q0WH"}},110:function(e,t){},113:function(e,t,a){"use strict";a.r(t),a.d(t,"socket",(function(){return V}));var n=a(0),r=a.n(n),o=a(13),c=a.n(o),s=a(18),u=a(10),i=a(21),l=a(60),m=(a(77),a(5)),_=a(40),d=a.n(_),f=function(e){return r.a.createElement("div",{className:d.a.background},r.a.createElement("div",{className:d.a.layout},e.children))},p=a(4),b=a(19),E=function(){for(var e=arguments.length,t=new Array(e),a=0;a<e;a++)t[a]=arguments[a];return t.join(" ")},O=a(6),j=a(114),v=a(61),N=a(64),y=a(62),S=a.n(y),z=function(e){var t=e.showBackdrop,a=e.closed;return t?r.a.createElement("div",{className:S.a.Backdrop,onClick:a}):null},h=a(1),g=a.n(h),I=a(63),k=a.n(I),M=function(e){var t={opacity:e.error?"1":"0",transform:e.error?"translateY(-80%)":"translateY(0)"};return r.a.createElement(r.a.Fragment,null,r.a.createElement(z,{showBackdrop:e.showModal,closed:e.closed}),r.a.createElement(j.a,{in:e.showModal,classNames:Object(O.a)({},k.a),timeout:400,mountOnEnter:!0,unmountOnExit:!0,onExited:e.cleanup},r.a.createElement("div",{className:g.a.modal},r.a.createElement("div",{className:g.a.errorSlider,style:t},r.a.createElement(v.a,{icon:N.a})," ",e.error),r.a.createElement("div",{className:g.a.upper},e.title),r.a.createElement("div",{className:g.a.lower},r.a.createElement("div",{className:g.a.cards},e.children)))))},Q=function(e){return{type:"SET_PLAYER_NAME",playerName:e}},q=function(e){return{type:"SET_IS_HOST",isHost:e}},x=function(e){return{type:"SET_IS_PLAYER",isPlayer:e}},A=function(e,t){return{type:"START_QUIZ",roomID:e,duration:t}},P=Object(m.g)(Object(u.b)((function(e){return{opponentJoined:e.opponentJoined,isHost:e.isHost}}),(function(e){return{startQuiz:function(t,a){return e(A(t,a))},setOpponentJoined:function(){return e({type:"OPPONENT_JOINED"})},setIsHost:function(){return e(q())}}}))((function(e){var t=Object(n.useState)(1),a=Object(p.a)(t,2),o=a[0],c=a[1],s=Object(n.useState)(null),u=Object(p.a)(s,2),i=u[0],l=u[1],m=Object(n.useState)(!1),_=Object(p.a)(m,2),d=_[0],f=_[1],O=Object(n.useState)([]),j=Object(p.a)(O,2),v=j[0],N=j[1],y=Object(n.useRef)(null),S=e.setOpponentJoined,z=e.startQuiz,h=e.history,I=e.showModal,k=e.closed,Q=e.setIsHost;Object(n.useEffect)((function(){return V.on("player_joined",(function(){Q(),S(),f(!0)})),V.on("start_quiz_ack",(function(e){var t=e.roomID,a=e.duration;z(t,a),h.push("/quiz")})),V.on("send_data",(function(e){N(Object(b.a)(e))})),function(){V.off("start_quiz_ack"),V.off("player_joined")}}),[]),Object(n.useEffect)((function(){o&&V.emit("create_room",o,(function(e){"Success"===e.status?l(null):l(e.message)}))}),[o]);var q=function(){y.current.classList.add(g.a.unstacked),y.current.classList.remove(g.a.top);var e=y.current.nextElementSibling;e.classList.add(g.a.top),e.classList.remove(g.a.stacked),y.current=e};return r.a.createElement(M,{title:"\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u0438\u0433\u0440\u044b",showModal:I,closed:k,error:i,cleanup:function(){return l(null)}},r.a.createElement("div",{ref:y,className:g.a.top},r.a.createElement("div",{className:g.a.message},"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0438\u0433\u0440\u044b"),r.a.createElement("select",{onChange:function(e){c(e.target.value)}},v.map((function(e,t){return r.a.createElement("option",{key:t,value:e},e)}))),r.a.createElement("button",{onClick:function(e){c(o),q()},className:g.a.inputGroup},"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0438\u0433\u0440\u0443")),!d&&r.a.createElement("div",{className:E(g.a.stacked,g.a.roomCard)},r.a.createElement("div",{className:g.a.message},"\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u0435\u0441\u044c \u043d\u043e\u043c\u0435\u0440\u043e\u043c \u0438\u0433\u0440\u044b \u0441 \u0438\u0433\u0440\u043e\u043a\u0430\u043c\u0438"),r.a.createElement("div",{className:E(g.a.inputGroup,g.a.room)},o)),d&&r.a.createElement("div",{onClick:function(){var e={roomID:o};V.emit("start_quiz",e)}},r.a.createElement("div",{className:g.a.inputGroup},"\u041d\u0430\u0447\u0430\u0442\u044c \u0438\u0433\u0440\u0443")))}))),T=Object(m.g)(Object(u.b)(null,(function(e){return{startQuiz:function(t,a){return e(A(t,a))},setIsHost:function(){return e(q(!1))},setIsPlayer:function(){return e(x(!0))},setPlayerName:function(t){return e(Q(t))}}}))((function(e){var t=Object(n.useState)(1),a=Object(p.a)(t,2),o=a[0],c=a[1],s=Object(n.useState)(""),u=Object(p.a)(s,2),i=u[0],l=u[1],m=Object(n.useState)([]),_=Object(p.a)(m,2),d=_[0],f=_[1],E=Object(n.useState)(null),O=Object(p.a)(E,2),j=O[0],v=O[1],N=Object(n.useRef)(null),y=e.startQuiz,S=e.history,z=e.showModal,h=e.closed;Object(n.useEffect)((function(){return V.on("start_quiz_ack",(function(e){var t=e.roomID,a=e.duration;y(t,a),S.push("/quiz")})),V.on("send_data",(function(e){f(Object(b.a)(e))})),function(){V.off("start_quiz_ack")}}),[]);var I=function(){N.current.classList.add(g.a.unstacked),N.current.classList.remove(g.a.top);var e=N.current.nextElementSibling;e.classList.add(g.a.top),e.classList.remove(g.a.stacked),N.current=e};return r.a.createElement(M,{title:"\u041d\u0430\u0447\u0430\u043b\u043e \u0438\u0433\u0440\u044b",showModal:z,closed:h,error:j,cleanup:function(){return v(null)}},r.a.createElement("div",{ref:N,className:g.a.top},r.a.createElement("div",{className:g.a.message},"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0438\u0433\u0440\u044b"),r.a.createElement("div",{className:g.a.joinCard},r.a.createElement("select",{onChange:function(e){c(e.target.value)}},d.map((function(e,t){return r.a.createElement("option",{key:t,value:e},e)}))),r.a.createElement("input",{type:"text",onChange:function(e){var t=e.target.value;l(t)},placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u043a\u043e\u043c\u0430\u043d\u0434\u044b"}),r.a.createElement("button",{type:"button",onClick:function(t){t.preventDefault(),V.emit("join_room",o,i,(function(t){"Success"===t.status?(e.setIsHost(),e.setIsPlayer(),e.setPlayerName(i),v(null),I()):v(t.message)}))}},"\u041f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f"))),r.a.createElement("div",{className:g.a.stacked},r.a.createElement("div",{className:g.a.message},"\u041e\u0436\u0438\u0434\u0430\u0439\u0442\u0435 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f \u0434\u0440\u0443\u0433\u0438\u0445 \u043a\u043e\u043c\u0430\u043d\u0434")))}))),L=Object(m.g)(Object(u.b)(null,(function(e){return{startQuiz:function(t,a){return e(A(t,a))},setIsHost:function(){return e(q(!1))},setIsPlayer:function(){return e(x(!0))},setPlayerName:function(t){return e(Q(t))},setIsModerator:function(){return e({type:"SET_IS_MODERATOR",isModerator:!0})}}}))((function(e){var t=Object(n.useState)(1),a=Object(p.a)(t,2),o=a[0],c=a[1],s=Object(n.useState)(""),u=Object(p.a)(s,2),i=(u[0],u[1],Object(n.useState)([])),l=Object(p.a)(i,2),m=l[0],_=l[1],d=Object(n.useState)(null),f=Object(p.a)(d,2),E=f[0],O=f[1],j=Object(n.useState)("moderator"),v=Object(p.a)(j,2),N=v[0],y=(v[1],Object(n.useRef)(null)),S=e.startQuiz,z=e.history,h=e.showModal,I=e.closed;Object(n.useEffect)((function(){return V.on("start_quiz_ack",(function(e){var t=e.roomID,a=e.duration;S(t,a),z.push("/quiz")})),V.on("send_data",(function(e){_(Object(b.a)(e))})),function(){V.off("start_quiz_ack")}}),[]);var k=function(){y.current.classList.add(g.a.unstacked),y.current.classList.remove(g.a.top);var e=y.current.nextElementSibling;e.classList.add(g.a.top),e.classList.remove(g.a.stacked),y.current=e};return r.a.createElement(M,{title:"\u041d\u0430\u0447\u0430\u043b\u043e \u0438\u0433\u0440\u044b",showModal:h,closed:I,error:E,cleanup:function(){return O(null)}},r.a.createElement("div",{ref:y,className:g.a.top},r.a.createElement("div",{className:g.a.message},"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u043e\u043c\u0435\u0440 \u0438\u0433\u0440\u044b"),r.a.createElement("div",{className:g.a.joinCard},r.a.createElement("select",{onChange:function(e){c(e.target.value)}},m.map((function(e,t){return r.a.createElement("option",{key:t,value:e},e)}))),r.a.createElement("button",{type:"button",onClick:function(t){t.preventDefault(),V.emit("join_room",o,N,(function(t){"Success"===t.status?(e.setIsHost(),e.setIsPlayer(),e.setIsModerator(),O(null),k()):O(t.message)}))}},"\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440 \u0438\u0433\u0440\u044b"))),r.a.createElement("div",{className:g.a.stacked},r.a.createElement("div",{className:g.a.message},"\u041e\u0436\u0438\u0434\u0430\u0439\u0442\u0435 \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0435\u043d\u0438\u044f \u0434\u0440\u0443\u0433\u0438\u0445 \u043a\u043e\u043c\u0430\u043d\u0434")))}))),w=a(15),F=a.n(w),D=Object(u.b)(null,(function(e){return{resetQuiz:function(){return e({type:"RESET_QUIZ"})},setOpponentLeft:function(){return e({type:"OPPONENT_LEFT"})}}}))((function(e){var t=Object(n.useState)(!1),a=Object(p.a)(t,2),o=a[0],c=a[1],s=Object(n.useState)(!1),u=Object(p.a)(s,2),i=u[0],l=u[1],m=Object(n.useState)(!1),_=Object(p.a)(m,2),d=_[0],f=_[1],b=e.resetQuiz,E=e.setOpponentLeft,O=e.location.state&&"/quiz"===e.location.state.from;Object(n.useEffect)((function(){return O&&b(),V.on("opponent_left",(function(){E(),j()})),function(){V.off("opponent_left")}}),[b,E,O]);var j=function(){c(!1),l(!1),f(!1)},v=i||o?{filter:"blur(15px)"}:null;return r.a.createElement("div",{className:F.a.lobby},r.a.createElement(P,{showModal:i,closed:j}),r.a.createElement(T,{showModal:o,closed:j}),r.a.createElement(L,{showModal:d,closed:j}),r.a.createElement("h1",{className:F.a.title,closed:j},"\u0412\u043e\u0439\u0442\u0438 \u043a\u0430\u043a:"),r.a.createElement("div",{className:F.a.buttons,style:v},r.a.createElement("button",{className:F.a.button,onClick:function(){l(!0)}},"\u0410\u0434\u043c\u0438\u043d\u0438\u0441\u0442\u0440\u0430\u0442\u043e\u0440"),r.a.createElement("button",{className:F.a.button,onClick:function(){c(!0)}},"\u0418\u0433\u0440\u043e\u043a"),r.a.createElement("button",{className:F.a.button,onClick:function(){f(!0)}},"\u041c\u043e\u0434\u0435\u0440\u0430\u0442\u043e\u0440")))})),C=a(115),R=a(14),H=a.n(R),J=function(e){var t=e.question,a=e.questionNumber,o=(e.duration,e.isHost,e.isPlayer),c=e.isModerator,s=e.playerName,u=Object(n.useState)(""),i=Object(p.a)(u,2),l=i[0],m=i[1],_=Object(n.useState)(!1),d=Object(p.a)(_,2),f=d[0],b=d[1],E=Object(n.useState)({}),O=Object(p.a)(E,2),j=(O[0],O[1],V.id);return r.a.createElement("div",{className:H.a.question__container},r.a.createElement("div",{className:H.a.left},r.a.createElement("span",{className:H.a.number},a<10?"0"+a:a),r.a.createElement("div",{className:H.a.question},t)),r.a.createElement("div",{className:H.a.right},o&&!c?r.a.createElement(r.a.Fragment,null,r.a.createElement("textarea",{className:H.a.textarea,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043e\u0442\u0432\u0435\u0442",onChange:function(e){m(e.target.value)}}),r.a.createElement("button",{className:H.a.button,type:"button",onClick:function(e){var a={playerID:j,question:t,answer:l,playerName:s};console.log(s),V.emit("submit_answer",a),b(!0)},disabled:f},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c \u043e\u0442\u0432\u0435\u0442")):""))},B=a(9),G=a.n(B),Z=Object(u.b)((function(e){return{}}),(function(e){return{}}))((function(e){var t=Object(n.useState)({}),a=Object(p.a)(t,2),o=a[0],c=a[1];return Object(n.useEffect)((function(){V.on("answers__show",(function(e){c(e)}))}),[]),r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",{className:G.a.tables__title},"\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u043e\u0442\u0432\u0435\u0442\u043e\u0432"),r.a.createElement("div",{className:G.a.tables},o&&r.a.createElement("table",{border:"1"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"\u0412\u043e\u043f\u0440\u043e\u0441\u044b")),Object.entries(o).map((function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,e[0]),e[1].map((function(e){return r.a.createElement("td",null,e.playerName,r.a.createElement("br",null),r.a.createElement("br",null),e.answer)})))}))))),r.a.createElement("h2",{className:G.a.tables__title},"\u0422\u0430\u0431\u043b\u0438\u0446\u0430 \u0431\u0430\u043b\u043b\u043e\u0432"),r.a.createElement("div",{className:G.a.tables},o&&r.a.createElement("table",{border:"1"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("td",null,"questions")),Object.entries(o).map((function(e){return r.a.createElement("tr",null,r.a.createElement("td",null,e[0]),e[1].map((function(e){return r.a.createElement("td",null,e.playerName,r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("input",{type:"text",placeholder:"\u041e\u0447\u043a\u0438 \u0437\u0430 \u043e\u0442\u0432\u0435\u0442"}))})))}))))))})),Y=Object(u.b)((function(e){return{quizInProgress:e.quizInProgress,isHost:e.isHost,isPlayer:e.isPlayer,playerName:e.playerName,isModerator:e.isModerator,duration:e.duration}}),(function(e){return{setOpponentLeft:function(){return e({type:"OPPONENT_LEFT"})},endQuiz:function(){return e({type:"END_QUIZ"})}}}))((function(e){var t=Object(n.useState)(null),a=Object(p.a)(t,2),o=a[0],c=a[1],s=Object(n.useState)(!1),u=Object(p.a)(s,2),i=u[0],l=u[1],m=Object(n.useRef)(null),_=Object(n.useRef)(null),d=Object(n.useRef)(null),f=Object(n.useRef)(0),b=(V.id,G.a.appear),E=G.a.appearActive,O=G.a.enter,v=G.a.enterActive,N=G.a.exit,y=G.a.exitActive,S=e.setOpponentLeft,z=e.endQuiz,h=e.isHost,g=e.duration,I=e.isPlayer,k=e.isModerator,M=e.playerName;Object(n.useEffect)((function(){return I||Q(),_.current=setInterval((function(){V.emit("ping")}),15e3),V.on("next_question",(function(e){"Success"===e.status?(f.current++,c(e.question)):"Questions_Finished"===e.status?(c(null),z()):console.log("ERROR")})),V.on("opponent_left",(function(){S(),z()})),function(){V.off("opponent_left"),V.off("next_question"),clearTimeout(m.current),clearInterval(_.current)}}),[]);Object(n.useEffect)((function(){return V.on("question__show1",(function(e){l(!0)})),function(){clearTimeout(m.current),l(!1)}}),[o,h,g,I]);var Q=function(){V.emit("get_next_question")};return r.a.createElement("div",{className:G.a.quiz},r.a.createElement("div",{className:G.a.timer},r.a.createElement("div",{ref:d,className:G.a.timerInner})),k&&r.a.createElement(Z,{isModerator:k}),!k&&(i?r.a.createElement(C.a,null,r.a.createElement(j.a,{timeout:{enter:500,exit:250},key:f.current,appear:!0,classNames:{appear:b,appearActive:E,enter:O,enterActive:v,exit:N,exitActive:y},onEntered:function(){if(d.current){d.current.classList.remove(G.a.animateTimer),d.current.offsetWidth,d.current.classList.add(G.a.animateTimer);d.current.style.animationDuration=g-500+"ms"}}},r.a.createElement(J,{question:o,questionNumber:f.current,duration:g,isModerator:k,isHost:h,isPlayer:I,playerName:M}))):!I&&r.a.createElement("div",null,r.a.createElement("h3",null,o),r.a.createElement("button",{onClick:function(){m.current=setTimeout(Q,g),l(!0),V.emit("question__show",!0)}},"GO"))))})),U=function(){return r.a.createElement(f,null,r.a.createElement(m.d,null,r.a.createElement(m.b,{path:"/quiz",component:Y}),r.a.createElement(m.b,{path:"/",exact:!0,component:D}),r.a.createElement(m.a,{to:"/"})))},W=a(65),X={playerID:null,roomID:null,opponentJoined:!1,opponentLeft:null,isHost:!0,isPlayer:!1,isModerator:!1,quizInProgress:!1,duration:1e3,isQuestionDisplay:!1,playerName:""},K=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_PLAYER_NAME":return Object(O.a)(Object(O.a)({},e),{},{playerName:t.playerName});case"OPPONENT_JOINED":return Object(O.a)(Object(O.a)({},e),{},{opponentJoined:!0,isHost:!0});case"SET_ROOM_ID":return Object(O.a)(Object(O.a)({},e),{},{roomID:t.roomID});case"SET_IS_HOST":return Object(O.a)(Object(O.a)({},e),{},{isHost:t.isHost});case"SET_IS_PLAYER":return Object(O.a)(Object(O.a)({},e),{},{isPlayer:t.isPlayer});case"SET_IS_MODERATOR":return Object(O.a)(Object(O.a)({},e),{},{isModerator:t.isModerator});case"OPPONENT_LEFT":return Object(O.a)(Object(O.a)({},e),{},{opponentLeft:!0,quizInProgress:!1});case"START_QUIZ":return Object(O.a)(Object(O.a)({},e),{},{roomID:t.roomID,duration:t.duration,quizInProgress:!0});case"END_QUIZ":return Object(O.a)(Object(O.a)({},e),{},{quizInProgress:!1});case"RESET_QUIZ":return X;default:return e}},V=a.n(W).a.connect("https://tigraranaar-chgk.herokuapp.com",{transports:["websocket","polling"]}),$=Object(i.createStore)(K,Object(l.devToolsEnhancer)());c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(u.a,{store:$},r.a.createElement(s.a,null,r.a.createElement(U,null)))),document.getElementById("root"))},14:function(e,t,a){e.exports={question__container:"Question_question__container__2zBli",left:"Question_left__tL4jA",number:"Question_number__3a0bQ",question:"Question_question__12n_r",right:"Question_right__3tcMW",textarea:"Question_textarea__3RBlO",button:"Question_button__pIFeL"}},15:function(e,t,a){e.exports={lobby:"Lobby_lobby__1i8Vj",title:"Lobby_title__3Ox4W",buttons:"Lobby_buttons__3tHrj"}},40:function(e,t,a){e.exports={background:"Layout_background__1LvKJ",layout:"Layout_layout__3G0uH"}},62:function(e,t,a){e.exports={Backdrop:"Backdrop_Backdrop__1K5h5"}},63:function(e,t,a){e.exports={enter:"FormModalAnimation_enter__35OJX",enterActive:"FormModalAnimation_enterActive__30jFW",enterDone:"FormModalAnimation_enterDone__1S1S0",exit:"FormModalAnimation_exit__2iG7B",exitActive:"FormModalAnimation_exitActive__3A8GE"}},68:function(e,t,a){e.exports=a(113)},77:function(e,t,a){},9:function(e,t,a){e.exports={quiz:"Quiz_quiz__Y_z3x",timer:"Quiz_timer__s8uZZ",timerInner:"Quiz_timerInner__cJTfA",animateTimer:"Quiz_animateTimer__2lxYa","animate-timer":"Quiz_animate-timer__3Pokz",animateScore:"Quiz_animateScore__3hArX","animate-score":"Quiz_animate-score__3006R",score:"Quiz_score__1O2Ob",scoreContainer:"Quiz_scoreContainer__39U0B",myScore:"Quiz_myScore__zGFHn",opponentScore:"Quiz_opponentScore__Wwx-H",appear:"Quiz_appear__2XIkK",enter:"Quiz_enter__1v4KZ",appearActive:"Quiz_appearActive__1ymkW",enterActive:"Quiz_enterActive__Ju30e",exit:"Quiz_exit__1fOgb",exitActive:"Quiz_exitActive__1nSA3",tables:"Quiz_tables__PGnuM",tables__title:"Quiz_tables__title__3Q1nI"}}},[[68,1,2]]]);
//# sourceMappingURL=main.add50667.chunk.js.map