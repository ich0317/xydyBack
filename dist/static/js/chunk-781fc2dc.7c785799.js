(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-781fc2dc"],{"0eb5":function(t,e,n){n("7b01")("asyncIterator")},"0ff6":function(t,e,n){e.f=n("8b37")},2550:function(t,e,n){},"2da8":function(t,e,n){},"31bc":function(t,e,n){var i=n("cfc7"),r=n("f7c1"),a=n("d217");t.exports=function(t){var e=i(t),n=r.f;if(n){var o,c=n(t),s=a.f,l=0;while(c.length>l)s.call(t,o=c[l++])&&e.push(o)}return e}},"3ae1":function(t,e,n){"use strict";var i=n("b813"),r=n.n(i);r.a},"4b4e":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"news"}},[n("el-row",[n("el-col",{attrs:{span:24}},[n("div",{staticClass:"pan-box"},[n("div",{staticClass:"pan-name"},[t._v("基础信息")])])])],1),t._v(" "),n("div",{staticClass:"content-box"},[n("el-form",{ref:"form",attrs:{"label-width":"110px"}},[n("el-form-item",{staticStyle:{width:"660px"},attrs:{label:"文章标题"}},[n("el-input",{model:{value:t.articleInfo.title,callback:function(e){t.$set(t.articleInfo,"title",e)},expression:"articleInfo.title"}})],1),t._v(" "),n("el-form-item",{staticStyle:{width:"660px"},attrs:{label:"文章简介"}},[n("el-input",{attrs:{type:"textarea"},model:{value:t.articleInfo.brief,callback:function(e){t.$set(t.articleInfo,"brief",e)},expression:"articleInfo.brief"}})],1),t._v(" "),n("el-form-item",{staticStyle:{width:"660px"},attrs:{label:"列表图片"}},[n("el-upload",{staticClass:"avatar-uploader",attrs:{action:"http://localhost:9528/api/upNewsPhoto","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.articleInfo.img_url?n("img",{staticClass:"avatar",attrs:{src:t.articleInfo.img_url}}):n("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),n("el-form-item",{staticStyle:{width:"1000px"},attrs:{label:"文章"}},[n("tinymce",{attrs:{height:300},model:{value:t.articleInfo.content,callback:function(e){t.$set(t.articleInfo,"content",e)},expression:"articleInfo.content"}})],1),t._v(" "),n("el-form-item",{staticStyle:{width:"660px"},attrs:{label:"发布日期"}},[n("el-date-picker",{attrs:{type:"date",placeholder:"选择日期"},model:{value:t.articleInfo.release_date,callback:function(e){t.$set(t.articleInfo,"release_date",e)},expression:"articleInfo.release_date"}})],1),t._v(" "),n("el-form-item",{staticStyle:{width:"660px"},attrs:{label:"发布状态"}},[n("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:t.articleInfo.status,callback:function(e){t.$set(t.articleInfo,"status",e)},expression:"articleInfo.status"}})],1),t._v(" "),n("el-form-item",[n("goBack"),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.addArticle}},[t._v("保存")])],1)],1)],1)],1)},r=[],a=n("e20c"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tinymce-container",class:{fullscreen:t.fullscreen},style:{width:t.containerWidth}},[n("textarea",{staticClass:"tinymce-textarea",attrs:{id:t.tinymceId}}),t._v(" "),n("div",{staticClass:"editor-custom-btn-container"},[n("editorImage",{staticClass:"editor-upload-btn",attrs:{color:"#1890ff"},on:{successCBK:t.imageSuccessCBK}})],1)])},c=[],s=(n("f763"),n("d4d5"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"upload-container"},[n("el-button",{style:{background:t.color,borderColor:t.color},attrs:{icon:"el-icon-upload",size:"mini",type:"primary"},on:{click:function(e){t.dialogVisible=!0}}},[t._v("\n    upload\n  ")]),t._v(" "),n("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[n("el-upload",{staticClass:"editor-slide-upload",attrs:{multiple:!0,"file-list":t.fileList,"show-file-list":!0,"on-remove":t.handleRemove,"on-success":t.handleSuccess,"before-upload":t.beforeUpload,action:"https://httpbin.org/post","list-type":"picture-card"}},[n("el-button",{attrs:{size:"small",type:"primary"}},[t._v("\n        Click upload\n      ")])],1),t._v(" "),n("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("\n      Cancel\n    ")]),t._v(" "),n("el-button",{attrs:{type:"primary"},on:{click:t.handleSubmit}},[t._v("\n      Confirm\n    ")])],1)],1)}),l=[],u=(n("fb37"),{name:"EditorSlideUpload",props:{color:{type:String,default:"#1890ff"}},data:function(){return{dialogVisible:!1,listObj:{},fileList:[]}},methods:{checkAllSuccess:function(){var t=this;return Object.keys(this.listObj).every(function(e){return t.listObj[e].hasSuccess})},handleSubmit:function(){var t=this,e=Object.keys(this.listObj).map(function(e){return t.listObj[e]});this.checkAllSuccess()?(this.$emit("successCBK",e),this.listObj={},this.fileList=[],this.dialogVisible=!1):this.$message("Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!")},handleSuccess:function(t,e){for(var n=e.uid,i=Object.keys(this.listObj),r=0,a=i.length;r<a;r++)if(this.listObj[i[r]].uid===n)return this.listObj[i[r]].url=t.files.file,void(this.listObj[i[r]].hasSuccess=!0)},handleRemove:function(t){for(var e=t.uid,n=Object.keys(this.listObj),i=0,r=n.length;i<r;i++)if(this.listObj[n[i]].uid===e)return void delete this.listObj[n[i]]},beforeUpload:function(t){var e=this,n=window.URL||window.webkitURL,i=t.uid;return this.listObj[i]={},new Promise(function(r,a){var o=new Image;o.src=n.createObjectURL(t),o.onload=function(){e.listObj[i]={hasSuccess:!1,uid:t.uid,width:this.width,height:this.height}},r(!0)})}}}),f=u,d=(n("991e"),n("17cc")),h=Object(d["a"])(f,s,l,!1,null,"6567f772",null),b=h.exports,p=["advlist anchor autolink autosave code codesample colorpicker colorpicker contextmenu directionality emoticons fullscreen hr image imagetools insertdatetime link lists media nonbreaking noneditable pagebreak paste preview print save searchreplace spellchecker tabfocus table template textcolor textpattern visualblocks visualchars wordcount"],m=p,g=["searchreplace bold italic underline strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample","hr bullist numlist link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen"],v=g,y=(n("0eb5"),n("a4c5"),[]);function w(){return window.tinymce}var _=function(t,e){var n=document.getElementById(t),i=e||function(){};if(!n){var r=document.createElement("script");r.src=t,r.id=t,document.body.appendChild(r),y.push(i);var a="onload"in r?o:c;a(r)}function o(e){e.onload=function(){this.onerror=this.onload=null;for(var t=0,n=y;t<n.length;t++){var i=n[t];i(null,e)}y=null},e.onerror=function(){this.onerror=this.onload=null,i(new Error("Failed to load "+t),e)}}function c(t){t.onreadystatechange=function(){if("complete"===this.readyState||"loaded"===this.readyState){this.onreadystatechange=null;var e=!0,n=!1,i=void 0;try{for(var r,a=y[Symbol.iterator]();!(e=(r=a.next()).done);e=!0){var o=r.value;o(null,t)}}catch(c){n=!0,i=c}finally{try{e||null==a.return||a.return()}finally{if(n)throw i}}y=null}}}n&&i&&(w()?i(null,n):y.push(i))},S=_,I="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js",O={name:"Tinymce",components:{editorImage:b},props:{id:{type:String,default:function(){return"vue-tinymce-"+ +new Date+(1e3*Math.random()).toFixed(0)}},value:{type:String,default:""},toolbar:{type:Array,required:!1,default:function(){return[]}},menubar:{type:String,default:"file edit insert view format table"},height:{type:[Number,String],required:!1,default:360},width:{type:[Number,String],required:!1,default:"auto"}},data:function(){return{hasChange:!1,hasInit:!1,tinymceId:this.id,fullscreen:!1,languageTypeList:{en:"en",zh:"zh_CN",es:"es_MX",ja:"ja"}}},computed:{containerWidth:function(){var t=this.width;return/^[\d]+(\.[\d]+)?$/.test(t)?"".concat(t,"px"):t}},watch:{value:function(t){var e=this;!this.hasChange&&this.hasInit&&this.$nextTick(function(){return window.tinymce.get(e.tinymceId).setContent(t||"")})}},mounted:function(){this.init()},activated:function(){window.tinymce&&this.initTinymce()},deactivated:function(){this.destroyTinymce()},destroyed:function(){this.destroyTinymce()},methods:{init:function(){var t=this;S(I,function(e){e?t.$message.error(e.message):t.initTinymce()})},initTinymce:function(){var t=this,e=this;window.tinymce.init({selector:"#".concat(this.tinymceId),language:this.languageTypeList["en"],height:this.height,body_class:"panel-body ",object_resizing:!1,toolbar:this.toolbar.length>0?this.toolbar:v,menubar:this.menubar,plugins:m,end_container_on_empty_block:!0,powerpaste_word_import:"clean",code_dialog_height:450,code_dialog_width:1e3,advlist_bullet_styles:"square",advlist_number_styles:"default",imagetools_cors_hosts:["www.tinymce.com","codepen.io"],default_link_target:"_blank",link_title:!1,nonbreaking_force_tab:!0,init_instance_callback:function(n){e.value&&n.setContent(e.value),e.hasInit=!0,n.on("NodeChange Change KeyUp SetContent",function(){t.hasChange=!0,t.$emit("input",n.getContent())})},setup:function(t){t.on("FullscreenStateChanged",function(t){e.fullscreen=t.state})}})},destroyTinymce:function(){var t=window.tinymce.get(this.tinymceId);this.fullscreen&&t.execCommand("mceFullScreen"),t&&t.destroy()},setContent:function(t){window.tinymce.get(this.tinymceId).setContent(t)},getContent:function(){window.tinymce.get(this.tinymceId).getContent()},imageSuccessCBK:function(t){var e=this;t.forEach(function(t){window.tinymce.get(e.tinymceId).insertContent('<img class="wscnph" src="'.concat(t.url,'" >'))})}}},k=O,j=(n("676b"),Object(d["a"])(k,o,c,!1,null,"060e5640",null)),C=j.exports,x=n("aa2a"),N=n("a3ba"),E=(n("ed08"),{filters:{},components:{Tinymce:C,goBack:N["a"]},data:function(){return{list:[],listLoading:!0,articleInfo:{title:"",brief:"",img_url:"",content:"",release_date:new Date,status:!0},articleId:null}},created:function(){this.articleId=this.$route.query._id},mounted:function(){this.articleId&&this.getArticle()},methods:{addArticle:function(){var t=this;Object(x["a"])(Object(a["a"])({},this.articleInfo,{_id:this.articleId})).then(function(e){t.$message({message:e.msg,type:"success"}),t.$router.go(-1)})},getArticle:function(){var t=this;Object(x["c"])({_id:this.articleId}).then(function(e){t.articleInfo=e.data})},handleAvatarSuccess:function(t,e){this.articleInfo.img_url=t.data.imgUrl},beforeAvatarUpload:function(t){var e="image/jpeg"===t.type||"image/gif",n=t.size/1024/1024<2;return e||this.$message.error("上传头像图片只能是 JPG 格式!"),n||this.$message.error("上传头像图片大小不能超过 2MB!"),e&&n}}}),A=E,$=(n("3ae1"),Object(d["a"])(A,i,r,!1,null,null,null));e["default"]=$.exports},"539d":function(t,e,n){var i=n("b2f5"),r=n("f01a"),a=n("b6f1"),o=n("c9ea"),c="["+o+"]",s="​",l=RegExp("^"+c+c+"*"),u=RegExp(c+c+"*$"),f=function(t,e,n){var r={},c=a(function(){return!!o[t]()||s[t]()!=s}),l=r[t]=c?e(d):o[t];n&&(r[n]=l),i(i.P+i.F*c,"String",r)},d=f.trim=function(t,e){return t=String(r(t)),1&e&&(t=t.replace(l,"")),2&e&&(t=t.replace(u,"")),t};t.exports=f},"676b":function(t,e,n){"use strict";var i=n("2550"),r=n.n(i);r.a},7793:function(t,e,n){var i=n("3a68"),r=n("a891").f,a={}.toString,o="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],c=function(t){try{return r(t)}catch(e){return o.slice()}};t.exports.f=function(t){return o&&"[object Window]"==a.call(t)?c(t):r(i(t))}},"7b01":function(t,e,n){var i=n("3754"),r=n("a4cc"),a=n("ca2b"),o=n("0ff6"),c=n("ddf7").f;t.exports=function(t){var e=r.Symbol||(r.Symbol=a?{}:i.Symbol||{});"_"==t.charAt(0)||t in e||c(e,t,{value:o.f(t)})}},"991e":function(t,e,n){"use strict";var i=n("2da8"),r=n.n(i);r.a},a3ba:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-button",{attrs:{size:"medium"},on:{click:t.goBack}},[t._v("返回")])},r=[],a={data:function(){return{}},methods:{goBack:function(){this.$router.go(-1)}}},o=a,c=n("17cc"),s=Object(c["a"])(o,i,r,!1,null,"6d81d39c",null);e["a"]=s.exports},a4c5:function(t,e,n){"use strict";var i=n("3754"),r=n("03b3"),a=n("dad2"),o=n("b2f5"),c=n("e5ef"),s=n("3cc6").KEY,l=n("b6f1"),u=n("adbd"),f=n("6594"),d=n("9d01"),h=n("8b37"),b=n("0ff6"),p=n("7b01"),m=n("31bc"),g=n("b5b8"),v=n("a013"),y=n("88dd"),w=n("db4b"),_=n("3a68"),S=n("5325"),I=n("7dea"),O=n("a7b8"),k=n("7793"),j=n("acb9"),C=n("f7c1"),x=n("ddf7"),N=n("cfc7"),E=j.f,A=x.f,$=k.f,T=i.Symbol,F=i.JSON,M=F&&F.stringify,P="prototype",D=h("_hidden"),L=h("toPrimitive"),U={}.propertyIsEnumerable,B=u("symbol-registry"),V=u("symbols"),Y=u("op-symbols"),R=Object[P],z="function"==typeof T&&!!C.f,J=i.QObject,q=!J||!J[P]||!J[P].findChild,K=a&&l(function(){return 7!=O(A({},"a",{get:function(){return A(this,"a",{value:7}).a}})).a})?function(t,e,n){var i=E(R,e);i&&delete R[e],A(t,e,n),i&&t!==R&&A(R,e,i)}:A,G=function(t){var e=V[t]=O(T[P]);return e._k=t,e},W=z&&"symbol"==typeof T.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof T},X=function(t,e,n){return t===R&&X(Y,e,n),v(t),e=S(e,!0),v(n),r(V,e)?(n.enumerable?(r(t,D)&&t[D][e]&&(t[D][e]=!1),n=O(n,{enumerable:I(0,!1)})):(r(t,D)||A(t,D,I(1,{})),t[D][e]=!0),K(t,e,n)):A(t,e,n)},H=function(t,e){v(t);var n,i=m(e=_(e)),r=0,a=i.length;while(a>r)X(t,n=i[r++],e[n]);return t},Q=function(t,e){return void 0===e?O(t):H(O(t),e)},Z=function(t){var e=U.call(this,t=S(t,!0));return!(this===R&&r(V,t)&&!r(Y,t))&&(!(e||!r(this,t)||!r(V,t)||r(this,D)&&this[D][t])||e)},tt=function(t,e){if(t=_(t),e=S(e,!0),t!==R||!r(V,e)||r(Y,e)){var n=E(t,e);return!n||!r(V,e)||r(t,D)&&t[D][e]||(n.enumerable=!0),n}},et=function(t){var e,n=$(_(t)),i=[],a=0;while(n.length>a)r(V,e=n[a++])||e==D||e==s||i.push(e);return i},nt=function(t){var e,n=t===R,i=$(n?Y:_(t)),a=[],o=0;while(i.length>o)!r(V,e=i[o++])||n&&!r(R,e)||a.push(V[e]);return a};z||(T=function(){if(this instanceof T)throw TypeError("Symbol is not a constructor!");var t=d(arguments.length>0?arguments[0]:void 0),e=function(n){this===R&&e.call(Y,n),r(this,D)&&r(this[D],t)&&(this[D][t]=!1),K(this,t,I(1,n))};return a&&q&&K(R,t,{configurable:!0,set:e}),G(t)},c(T[P],"toString",function(){return this._k}),j.f=tt,x.f=X,n("a891").f=k.f=et,n("d217").f=Z,C.f=nt,a&&!n("ca2b")&&c(R,"propertyIsEnumerable",Z,!0),b.f=function(t){return G(h(t))}),o(o.G+o.W+o.F*!z,{Symbol:T});for(var it="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),rt=0;it.length>rt;)h(it[rt++]);for(var at=N(h.store),ot=0;at.length>ot;)p(at[ot++]);o(o.S+o.F*!z,"Symbol",{for:function(t){return r(B,t+="")?B[t]:B[t]=T(t)},keyFor:function(t){if(!W(t))throw TypeError(t+" is not a symbol!");for(var e in B)if(B[e]===t)return e},useSetter:function(){q=!0},useSimple:function(){q=!1}}),o(o.S+o.F*!z,"Object",{create:Q,defineProperty:X,defineProperties:H,getOwnPropertyDescriptor:tt,getOwnPropertyNames:et,getOwnPropertySymbols:nt});var ct=l(function(){C.f(1)});o(o.S+o.F*ct,"Object",{getOwnPropertySymbols:function(t){return C.f(w(t))}}),F&&o(o.S+o.F*(!z||l(function(){var t=T();return"[null]"!=M([t])||"{}"!=M({a:t})||"{}"!=M(Object(t))})),"JSON",{stringify:function(t){var e,n,i=[t],r=1;while(arguments.length>r)i.push(arguments[r++]);if(n=e=i[1],(y(e)||void 0!==t)&&!W(t))return g(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!W(e))return e}),i[1]=e,M.apply(F,i)}}),T[P][L]||n("743d")(T[P],L,T[P].valueOf),f(T,"Symbol"),f(Math,"Math",!0),f(i.JSON,"JSON",!0)},a891:function(t,e,n){var i=n("fb6d"),r=n("b4e0").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)}},aa2a:function(t,e,n){"use strict";n.d(e,"a",function(){return r}),n.d(e,"d",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"b",function(){return c});var i=n("b775");function r(t){return Object(i["a"])({url:"/api/addNews",method:"post",data:t})}function a(t){return Object(i["a"])({url:"/api/getNewsList",method:"get",params:t})}function o(t){return Object(i["a"])({url:"/api/getNewsDetail",method:"get",params:t})}function c(t){return Object(i["a"])({url:"/api/delNews",method:"post",data:t})}},b5b8:function(t,e,n){var i=n("94ac");t.exports=Array.isArray||function(t){return"Array"==i(t)}},b813:function(t,e,n){},c9ea:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"},d4d5:function(t,e,n){"use strict";var i=n("3754"),r=n("03b3"),a=n("94ac"),o=n("44de"),c=n("5325"),s=n("b6f1"),l=n("a891").f,u=n("acb9").f,f=n("ddf7").f,d=n("539d").trim,h="Number",b=i[h],p=b,m=b.prototype,g=a(n("a7b8")(m))==h,v="trim"in String.prototype,y=function(t){var e=c(t,!1);if("string"==typeof e&&e.length>2){e=v?e.trim():d(e,3);var n,i,r,a=e.charCodeAt(0);if(43===a||45===a){if(n=e.charCodeAt(2),88===n||120===n)return NaN}else if(48===a){switch(e.charCodeAt(1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+e}for(var o,s=e.slice(2),l=0,u=s.length;l<u;l++)if(o=s.charCodeAt(l),o<48||o>r)return NaN;return parseInt(s,i)}}return+e};if(!b(" 0o1")||!b("0b1")||b("+0x1")){b=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof b&&(g?s(function(){m.valueOf.call(n)}):a(n)!=h)?o(new p(y(e)),n,b):y(e)};for(var w,_=n("dad2")?l(p):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;_.length>S;S++)r(p,w=_[S])&&!r(b,w)&&f(b,w,u(p,w));b.prototype=m,m.constructor=b,n("e5ef")(i,h,b)}},ed08:function(t,e,n){"use strict";n.d(e,"b",function(){return r}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return o});n("f763"),n("3b54"),n("df36"),n("7bc1"),n("34a3"),n("0857"),n("3d92");function i(t){return 1*t<10?"0"+t:t}var r=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"YMDhms",n=null;console.log(t),n="[object Date]"==Object.prototype.toString.call(t)?t:t/1e10<1?1e3*t:t;var r=new Date(n),a=r.getFullYear(),o=i(r.getMonth()+1),c=i(r.getDate()),s=i(r.getHours()),l=i(r.getMinutes()),u=i(r.getSeconds()),f=new Map([["Y",a],["M",o],["D",c],["h",s],["hm","".concat(s,":").concat(l)],["hms","".concat(s,":").concat(l,":").concat(u)],["YM","".concat(a,"-").concat(o)],["YMD","".concat(a,"-").concat(o,"-").concat(c)],["YMDhms","".concat(a,"-").concat(o,"-").concat(c," ").concat(s,":").concat(l,":").concat(u)],["YMDhm","".concat(a,"-").concat(o,"-").concat(c," ").concat(s,":").concat(l)]]);return f.get(e)},a=function(t){var e=t.replace(/-/g,"/");return new Date(e).getTime()},o=function(t,e,n){var i=n[e]?n[e]:n,r="";return t.forEach(function(n,a){n[e]==i&&(r=t.splice(a,1))}),r}},f9f2:function(t,e,n){var i=n("b2f5"),r=n("a4cc"),a=n("b6f1");t.exports=function(t,e){var n=(r.Object||{})[t]||Object[t],o={};o[t]=e(n),i(i.S+i.F*a(function(){n(1)}),"Object",o)}},fb37:function(t,e,n){var i=n("db4b"),r=n("cfc7");n("f9f2")("keys",function(){return function(t){return r(i(t))}})}}]);