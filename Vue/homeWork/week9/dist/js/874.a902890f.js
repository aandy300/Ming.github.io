"use strict";(self["webpackChunkweek9"]=self["webpackChunkweek9"]||[]).push([[874],{7874:function(t,e,o){o.r(e),o.d(e,{default:function(){return F}});var s=o(3396),r=o(7139),c=o(9242);const n={class:"container"},i={class:"row align-items-center"},l={class:"col-12 col-sm-11 col-md-6"},a={id:"carouselExampleControls",class:"carousel slide","data-ride":"carousel"},d={class:"carousel-inner"},u={class:"figure d-flex flex-column justify-content-center align-items-center mt-5"},p=["src"],b={class:"col-md-6"},m={"aria-label":"breadcrumb"},h={class:"breadcrumb bg-white px-0 mb-0 py-3"},g=(0,s.Uk)("首頁"),_=(0,s.Uk)("產品列表"),y=(0,s.Uk)("商品細項"),v={class:"fw-bold h1 mb-1"},w={class:"mb-0 text-muted text-end"},f={class:"h4 fw-bold text-end"},x={class:"row align-items-center"},k={class:"col-6"},q={class:"input-group my-3 bg-light rounded"},C={class:"input-group-prepend"},T=["disabled"],$=(0,s._)("i",{class:"bi bi-dash-lg"},null,-1),U=[$],M={class:"input-group-append"},H=(0,s._)("i",{class:"bi bi-plus-lg"},null,-1),L=[H],z={class:"col-6"},P={class:"row my-5"},W={class:"col-md-6"},E=["innerHTML"],N={class:"col-md-6"},Z=["innerHTML"];function j(t,e,o,$,H,j){const D=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",n,[(0,s._)("div",i,[(0,s._)("div",l,[(0,s._)("div",a,[(0,s._)("div",d,[(0,s._)("figure",u,[(0,s._)("img",{style:{height:"550px"},src:H.product.imageUrl,alt:"",class:"figure-img img-fluid rounded"},null,8,p)])])])]),(0,s._)("div",b,[(0,s._)("nav",m,[(0,s._)("ol",h,[(0,s.Wm)(D,{class:"breadcrumb-item",to:"/"},{default:(0,s.w5)((()=>[g])),_:1}),(0,s.Wm)(D,{class:"breadcrumb-item",to:"/products"},{default:(0,s.w5)((()=>[_])),_:1}),(0,s.Wm)(D,{class:"breadcrumb-item text-primary",style:{"text-decoration":"none",cursor:"text"},"aria-current":"page",to:""},{default:(0,s.w5)((()=>[y])),_:1})])]),(0,s._)("h2",v,(0,r.zw)(H.product.title),1),(0,s._)("p",w,[(0,s._)("del",null,"NT$ "+(0,r.zw)(H.product.origin_price),1)]),(0,s._)("p",f,"NT$ "+(0,r.zw)(H.product.price),1),(0,s._)("div",x,[(0,s._)("div",k,[(0,s._)("div",q,[(0,s._)("div",C,[(0,s._)("button",{class:"btn btn-outline-dark border-0 py-2",onClick:e[0]||(e[0]=t=>j.qtyCount("-")),type:"button",id:"button-addon1",disabled:1===H.qty},U,8,T)]),(0,s.wy)((0,s._)("input",{"onUpdate:modelValue":e[1]||(e[1]=t=>H.qty=t),type:"text",class:"form-control border-0 text-center my-auto shadow-none bg-light",placeholder:"","aria-label":"Example text with button addon","aria-describedby":"button-addon1"},null,512),[[c.nr,H.qty]]),(0,s._)("div",M,[(0,s._)("button",{class:"btn btn-outline-dark border-0 py-2",onClick:e[2]||(e[2]=t=>j.qtyCount("+")),type:"button",id:"button-addon2"},L)])])]),(0,s._)("div",z,[(0,s._)("a",{href:"./checkout.html",onClick:e[3]||(e[3]=(0,c.iM)((t=>(j.addToCart(),j.qtyCount("reset"))),["prevent"])),class:"text-nowrap btn btn-dark w-100 py-2"},"加入購物車")])])])]),(0,s._)("div",P,[(0,s._)("div",W,[(0,s._)("p",{innerHTML:H.product.description},null,8,E)]),(0,s._)("div",N,[(0,s._)("p",{innerHTML:H.product.content,class:"text-muted"},null,8,Z)])])])}var D=o(4902),V={data(){return{qty:1,product:{imageUrl:"",content:"",description:""}}},methods:{getProduct(){console.log("getProducts");const t=this.$route.params.id;this.$http.get(`https://vue3-course-api.hexschool.io/v2/api/ming123/product/${t}`).then((t=>{console.log(t),this.product=t.data.product,this.product.description=this.product.description.replace(/\n/g,"<br>"),this.product.content=this.product.content.replace(/\n/g,"<br>")})).catch((t=>{console.dir(t)})),console.log("123")},addToCart(t=this.qty){const e={product_id:this.$route.params.id,qty:t};this.$http.post("https://vue3-course-api.hexschool.io/v2/api/ming123/cart",{data:e}).then((t=>{console.log("addToCart()",t),D.Z.emit("get-cart")})).catch((t=>{console.dir(t.data.message)}))},qtyCount(t){"+"===t?this.qty+=1:"-"===t?this.qty<=1?console.log("已經是最小數量啦~~~"):this.qty-=1:"reset"===t&&(this.qty=1)}},mounted(){this.getProduct()}},A=o(89);const B=(0,A.Z)(V,[["render",j]]);var F=B}}]);
//# sourceMappingURL=874.a902890f.js.map