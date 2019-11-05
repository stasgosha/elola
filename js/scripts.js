document.addEventListener('DOMContentLoaded', () => {

	window.addEventListener('scroll', () => {
		let header = document.querySelector('.header');
		let offset = document.body.clientWidth > 991 ? 136 : 0;

		if (!!header) {
			window.scrollY > offset
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	});

	// parallax scroll effect
	addParallaxBg('.first-screen-section .branding-image', 0.5);

	// parallax.js
	if (document.body.clientWidth >= 992) {
		// Parallax
		document.querySelectorAll('[id*="parallax-viewport"]').forEach(item => {
			let scene = document.getElementById( item.getAttribute('id') );
			let parallaxInstance = new Parallax(scene);
		})
	}

	// Top Nav
	document.querySelectorAll('.top-nav > ul > li.menu-item-has-children > a')
		.forEach(link => {
			link.addEventListener('click', function(e){
				e.preventDefault();
			});
		})
});

function getCoords(elem) {
	var box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};

}

function addParallaxBg(selector, direction = 1){
	if (!!selector) {
		window.addEventListener('scroll', () => {
			let els = document.querySelectorAll(selector);
			let scrollY = window.scrollY;

			els.forEach(el => {
				let elOffsetTop = getCoords(el).top;

				if (elOffsetTop < scrollY) {
					let difference = scrollY - elOffsetTop;
					var half = (difference / 2) * direction + 'px',
					transform = `translate3d(0, ${half}, 0)`;

					el.style.transform = transform;
				} 
				else {
					el.style.transform = 'translate3d(0,0,0)';
				}
			});
		});
	}
}

window.addEventListener('load', () => {
	// Sliders
	new Glider(document.querySelector('.products-slider .glider-contain'), {
		slidesToShow: 1,
		slidesToScroll: 1,
		rewind: true,
		draggable: true,
		duration: 1,
		arrows: {
			prev: '.glider-prev',
			next: '.glider-next'
		},
		responsive:[
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 992,
				settings: {
					slidesToShow: 4,
				}
			}
		]
	});
});

// Object Fit Polyfill
/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="bfred-it:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();

objectFitImages('.object-fit-cover');