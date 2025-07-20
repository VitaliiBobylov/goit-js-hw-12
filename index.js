import{a as p,S as d,i as a}from"./assets/vendor-D8_O3--j.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const m="51387635-d1faa43170eec50f2b7d86b54",h="https://pixabay.com/api/";function g(i){const o={key:m,q:i,image_type:"photo",orientation:"horizontal",safesearch:!0};function n(t){return new Promise(e=>setTimeout(e,t))}return n(2e3).then(()=>p.get(h,{params:o}).then(t=>{const e=t.data;if(!e.hits||e.hits.length===0)throw new Error("No images found");return e}).catch(t=>{throw t}))}const l=document.querySelector(".gallery"),u=document.querySelector(".loader"),y=new d(".gallery a",{captionsData:"alt",captionDelay:250});function b(i){return i.map(({webformatURL:o,largeImageURL:n,tags:t,likes:e,views:r,comments:s,downloads:f})=>`
        <li class="photo-card">
          <a href="${n}">
            <img src="${o}" alt="${t}" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${e}</p>
            <p><b>Views:</b> ${r}</p>
            <p><b>Comments:</b> ${s}</p>
            <p><b>Downloads:</b> ${f}</p>
          </div>
        </li>
      `).join("")}function L(i){const o=b(i);l.insertAdjacentHTML("beforeend",o),y.refresh()}function v(){u.classList.add("is-visible")}function w(){u.classList.remove("is-visible")}function q(){l.innerHTML=""}const c=document.querySelector(".form");document.querySelector(".gallery");c.addEventListener("submit",i=>{i.preventDefault();const o=c.querySelector('input[name="search-text"]'),n=o.value.trim();if(!n){a.error({title:"Error",message:"Please enter a search term!",position:"topRight"});return}q(),v(),g(n).then(t=>{t&&t.hits&&t.hits.length>0?L(t.hits):a.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}).catch(t=>{a.error({title:"Error",message:"There was an error loading the images. Please try again.",position:"topRight"})}).finally(()=>{w(),o.value=""})});
//# sourceMappingURL=index.js.map
