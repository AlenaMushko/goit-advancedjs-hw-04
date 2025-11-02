import{a as S,i as c,S as M}from"./assets/vendor-GN5hr8qZ.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const h of s.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&a(h)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const R="52943742-ef4895d686f7f0b07a1c6f293",$="https://pixabay.com/api/";async function L(t,r,o=1){const a={key:R,q:t,image_type:"photo",orientation:"horizontal",safesearch:"true",page:o,per_page:r};try{const{data:e}=await S.get($,{params:a});return e}catch(e){throw new Error(`Failed to fetch images: ${e.message}`)}}function b(t,r,o=!1){const a=t.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}" class="gallery-link">
        <img 
          src="${e.webformatURL}" 
          alt="${e.tags}" 
          loading="lazy"
          class="gallery-image"
        />
        <div class="gallery-info">
          <p class="info-item">
            <b>Likes</b> <span class="info-item-value">${e.likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b> <span class="info-item-value">${e.views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b> <span class="info-item-value">${e.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b> <span class="info-item-value">${e.downloads}</span>
          </p>
        </div>
      </a>
    </li>
  `).join("");o?r.insertAdjacentHTML("beforeend",a):r.innerHTML=a}function q(t){t.innerHTML=""}function w(t){t.classList.remove("is-hidden")}function u(t){t.classList.add("is-hidden")}const y=document.querySelector(".form"),f=document.querySelector(".gallery"),i=document.querySelector(".spinner"),v=document.querySelector("#load-more-container"),A=document.querySelector("#load-more-button");let l=null,g="",n=1,p=0,d=0;const m=15;y.addEventListener("submit",async t=>{t.preventDefault();const r=y.searchQuery.value.trim();if(!r){c.warning({title:"Warning",message:"Please enter at least 1 character",position:"topRight"});return}g=r,n=1,p=0,d=0,q(f),P(),w(i);try{const o=await L(r,m,n);u(i),o.hits&&o.hits.length>0?(p=o.totalHits,d=Math.ceil(p/m),b(o.hits,f),l?l.refresh():l=new M(".gallery a",{captionsData:"alt",captionDelay:250}),n<d&&E()):c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"})}catch(o){u(i),c.error({message:`An error occurred: ${o.message}`,position:"topRight"})}});function E(){v.classList.remove("is-hidden")}function P(){v.classList.add("is-hidden")}A.addEventListener("click",async()=>{if(g){n+=1,w(i);try{const t=await L(g,m,n);u(i),b(t.hits,f,!0),l&&l.refresh(),setTimeout(()=>{const r=f.querySelectorAll(".gallery-item");if(r.length>0){const o=r[r.length-m];if(o){const a=o.getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}}},100),n>=d&&(P(),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch(t){u(i),c.error({message:`An error occurred: ${t.message}`,position:"topRight"})}}});
//# sourceMappingURL=index.js.map
