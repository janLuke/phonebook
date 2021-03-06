(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{30:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n(0),r=n.n(c),o=n(4),s=n.n(o),i=(n(30),n(13)),l=n.n(i),u=n(8),d=n(23),j=n(2),b=n(5),m=(n(32),n(9)),h=n.n(m),f="/api/contacts";var O=n(6),v=n(11),p='A phone number can only contain digits separated by a single space or "-". Optionally, it can start with "+".',x=function(e){return e[0].toUpperCase()+e.slice(1)},g=function(e){return e.trim().toLowerCase()},N=function(e){return e.trim().split(/\s+/).map(x).join(" ")},w=function(e,t,n){if(t.length<n)throw new Error("Too short! The ".concat(e," must be at least ").concat(n," characters long"))},y=function(e,t,n){if(t.length>n)throw new Error("Too long! The ".concat(e," must be at most ").concat(n," characters long"))},C=function(e,t){return e=g(e),t.find((function(t){return g(t.name)===e}))},F=function(e,t){if(C(e,t))throw new Error("This name already exists in the phonebook!")},_=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=n.exists_okay,c=void 0===a||a,r=n.isPartial,o=void 0!==r&&r;e=g(e);try{o||w("name",e,3),y("name",e,30),c||F(e,t)}catch(s){return s.message}},D=function(e){return e.replace(/\D/g,"").length},k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.isPartial,a=void 0!==n&&n,c="phone number";e=e.trim();try{if(y(c,e,20),a){if(!e.match(/^[+]?([0-9]+[- ]?)*$/))return p}else{if(D(e)<8)return"Too short! Must contain at least 8 digits!";if(!e.match(/^[+]?[0-9]+([ -][0-9]+)*$/))return p}}catch(r){return r.message}},S=function(e){var t=e.type,n=e.label,c=e.id,r=e.value,o=e.onChange,s=e.error,i=e.inputRef,l=Object(v.a)(e,["type","label","id","value","onChange","error","inputRef"]);return Object(a.jsxs)("div",{className:"FormField",children:[Object(a.jsxs)("label",{htmlFor:c,className:"FormField__label",children:[n,":"]}),Object(a.jsx)("input",Object(O.a)({ref:i,className:s?"in-error":void 0,id:c,type:t,value:r,onChange:o},l)),s&&Object(a.jsx)("div",{className:"FormField__error",children:s})]})};function I(e){var t=e.contacts,n=e.onAddNew,r=e.onUpdate,o=Object(c.useState)(""),s=Object(j.a)(o,2),i=s[0],l=s[1],u=Object(c.useState)(""),d=Object(j.a)(u,2),b=d[0],m=d[1],h=Object(c.useState)(""),f=Object(j.a)(h,2),v=f[0],p=f[1],x=Object(c.useState)(""),g=Object(j.a)(x,2),w=g[0],y=g[1],F=Object(c.useState)(null),D=Object(j.a)(F,2),I=D[0],L=D[1],E=Object(c.useState)(null),T=Object(j.a)(E,2),P=T[0],A=T[1];Object(c.useEffect)((function(){var e=C(i,t);A(e)}),[i,t]);var B=!i||!v||b||w;return Object(a.jsxs)("form",{className:"ContactForm",children:[Object(a.jsx)(S,{inputRef:L,label:"Name",id:"name-field",value:i,error:b,onChange:function(e){var n=e.target.value,a=_(n,t,{isPartial:!0});m(a),l(n)}}),Object(a.jsx)(S,{label:"Phone number",id:"phone-field",value:v,error:w,onChange:function(e){var t=e.target.value,n=k(t,{isPartial:!0});y(n),p(t)}}),Object(a.jsx)("button",{type:"submit",onClick:function(e){e.preventDefault();var a=_(i,t),c=k(v,t);a||c?(m(a),y(c)):(P&&v!==P.phoneNumber?r(Object(O.a)(Object(O.a)({},P),{},{phoneNumber:v})):n({name:N(i),phoneNumber:v.trim()}),l(""),p(""),I.focus())},disabled:B,className:P?"ContactForm__update-btn":void 0,children:P?"Update contact":"Add new contact"})]})}var L=n(24);function E(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.filter((function(e){return null!=e})).join(" ")}var T=function(e){var t=e.children,n=e.className,c=Object(v.a)(e,["children","className"]);return Object(a.jsx)("button",Object(O.a)(Object(O.a)({className:E("IconButton",n)},c),{},{children:t}))},P=Object(c.memo)((function(e){var t=e.contact,n=e.nameFilter,c=e.onDelete,r=function(e,t){var n;if(arguments.length>2&&void 0!==arguments[2]&&arguments[2]){var a=e.toLowerCase(),c=t.toLowerCase();n=a.indexOf(c)}else n=e.indexOf(t);if(n<0)return[e,"",""];var r=n+t.length;return[e.slice(0,n),e.slice(n,r),e.slice(n+t.length)]}(t.name,n,!0),o=Object(j.a)(r,3),s=o[0],i=o[1],l=o[2],u=i?Object(a.jsxs)("span",{children:[s,Object(a.jsx)("strong",{children:i}),l]}):t.name;return Object(a.jsxs)("li",{className:"ContactItem",children:[Object(a.jsxs)("div",{className:"ContactItem__info",children:[Object(a.jsx)("div",{className:"ContactItem__name",children:u}),Object(a.jsx)("div",{className:"ContactItem__phone",children:t.phoneNumber})]}),Object(a.jsx)("div",{className:"ContactItem__buttons",children:Object(a.jsx)(T,{className:"IconButton--red",onClick:function(){window.confirm("Do you really want to delete ".concat(t.name,"?"))&&c(t.id)},children:Object(a.jsx)(L.a,{})})})]},t.name)}));var A=Object(c.memo)((function(e){var t=e.contacts,n=e.nameFilter,c=e.onDelete,r=function(e,t){var n=t.toLowerCase();return e.filter((function(e){return e.name.toLowerCase().includes(n)}))}(t,n);return 0===r.length?Object(a.jsx)("p",{className:"ContactList--empty",children:n?"No matches":"The contact list is empty."}):Object(a.jsx)("ul",{className:"ContactList",children:r.map((function(e){return Object(a.jsx)(P,{contact:e,nameFilter:n,onDelete:c},e.name)}))})}));function B(e){var t=e.contacts,n=e.onDelete,r=Object(c.useState)(""),o=Object(j.a)(r,2),s=o[0],i=o[1];return Object(a.jsxs)("div",{className:"ContactListWithFilter",children:[Object(a.jsx)("div",{className:"ContactListWithFilter__header",children:Object(a.jsx)("input",{type:"text",value:s,placeholder:"Filter by name...",onChange:function(e){var t=e.target.value;i(t)}})}),Object(a.jsx)(A,{contacts:t,nameFilter:s,onDelete:n})]})}function U(e){return e.sort((function(e,t){return e.name.localeCompare(t.name)}))}function R(e){if(function(e){return e.response&&e.response.data}(e)){var t=e.response.data;if(t.message)return t.message;if(t.errors&&t.errors.length>0)return t.errors[0].message}return e.message}function J(){var e=Object(c.useState)("loading"),t=Object(j.a)(e,2),n=t[0],r=t[1],o=Object(c.useState)([]),s=Object(j.a)(o,2),i=s[0],m=s[1],O=Object(c.useState)(null),v=Object(j.a)(O,2),p=v[0],x=v[1],g=function(){h.a.get(f).then((function(e){return e.data})).then((function(e){m(U(e)),r("ready")})).catch((function(e){r("error"),x("Error while trying to fetch data from the server.\n"+"Details: ".concat(e.message))}))},N=function(){var e=Object(d.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(n=t,h.a.post(f,n).then((function(e){return e.data}))).then((function(e){var t=[].concat(Object(u.a)(i),[e]);m(U(t)),b.b.success("".concat(e.name," was saved"),{autoClose:3e3})})).catch((function(e){console.error(e);var n=R(e);b.b.error('Failed to add "'.concat(t.name,'". Details:  ').concat(n))}));case 1:case"end":return e.stop()}var n}),e)})));return function(t){return e.apply(this,arguments)}}();Object(c.useEffect)(g,[]);var w=null;if("ready"===n)w=Object(a.jsxs)(a.Fragment,{children:[Object(a.jsx)(M,{className:"add-item-panel",children:Object(a.jsx)(I,{contacts:i,onAddNew:N,onUpdate:function(e){var t;(t=e,h.a.put("".concat(f,"/").concat(t.id),t).then((function(e){return e.data}))).then((function(t){console.log(t);var n=i.findIndex((function(t){return t.id===e.id})),a=function(e,t,n){return[].concat(Object(u.a)(e.slice(0,t)),[n],Object(u.a)(e.slice(t+1)))}(i,n,t);m(U(a)),b.b.success('The number of "'.concat(t.name,'" was successfully updated.'))})).catch((function(t){console.error(t),b.b.error('Failed to update "'.concat(e.name,'". Details: ').concat(R(t)))}))}})}),Object(a.jsx)(M,{className:"contact-list-panel",children:Object(a.jsx)(B,{contacts:i,onDelete:function(e){var t=i.find((function(t){return t.id===e}));(function(e){return h.a.delete("".concat(f,"/").concat(e))})(e).then((function(n){m(i.filter((function(t){return t.id!==e}))),b.b.success('"'.concat(t.name,'" was successfully deleted.'))})).catch((function(e){var n;if(console.log(e),e.response&&404===e.response.status)g(),n='It seems "'.concat(t.name,'" had already been deleted.')+" You were using a stale tab, but now you're okay!";else{var a=R(e);n='Failed to delete "'.concat(t.name,'". Details: ').concat(a)}b.b.error(n)}))}})})]});else if("loading"===n)w=null;else{if("error"!==n)throw new Error("invalid state");w=Object(a.jsx)("p",{style:{color:"red"},children:p})}return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(b.a,{}),Object(a.jsx)("h1",{className:"header",children:"PhoneBook"}),Object(a.jsx)("div",{className:"content",children:w})]})}var M=function(e){var t=e.className,n=e.children,c="Panel"+(" "+t||!1);return Object(a.jsx)("div",{className:c,children:n})};s.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(J,{})}),document.getElementById("root"))}},[[52,1,2]]]);
//# sourceMappingURL=main.098c9303.chunk.js.map