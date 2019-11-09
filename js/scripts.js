document.addEventListener('DOMContentLoaded', () => {
	new WOW().init({
		mobile: false,
		offset: 200
	});

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
	setTimeout(() => {
		addParallaxBg('.first-screen-section .branding-image', 0.5);

		document.querySelectorAll('.with-parallax')
			.forEach(item => {
				let direction = 0.5;
				if (item.dataset.direction !== undefined) {
					direction = item.dataset.direction;
				}

				window.addEventListener('scroll', e => {
					let elOffsetTop = getCoords(item).top;

					let difference = scrollY - elOffsetTop;
					var half = scrollY * direction + 'px',
					transform = `translate3d(0, ${half}, 0)`;

					item.style.transform = transform;
				});
			});
	}, 500);

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

	// Mobile Bg
	if (document.body.clientWidth < 992) {
		document.querySelectorAll('[data-mobileBg]')
			.forEach(el => {
				let mobileBg = el.dataset.mobilebg;

				el.style.cssText = mobileBg;
			})
	}

	// Previews
	function setBigPhotoParams(src, link){
		let target = document.querySelector('.big-image');
		target.setAttribute('href', link);

		target.querySelector('img').setAttribute('src', src);

		refreshFsLightbox();
	}

	document.querySelectorAll('.preview-block')
			.forEach(el => {
				el.addEventListener('click', e => {
					e.preventDefault();

					let img = el.querySelector('img');

					let src = img.dataset.src;
					let link = img.dataset.bigsrc;

					setBigPhotoParams(src, link);

					document.querySelectorAll('.preview-block')
						.forEach(item => item.classList.remove('selected'));

					el.classList.add('selected');
				})
			});

	document.querySelector('.preview-block').click();

	// Tabs
	function getSiblings(elem) {
		let siblings = [];
		let sibling = elem;
		while (sibling.previousSibling) {
			sibling = sibling.previousSibling;
			sibling.nodeType == 1 && siblings.push(sibling);
		}

		sibling = elem;
		while (sibling.nextSibling) {
			sibling = sibling.nextSibling;
			sibling.nodeType == 1 && siblings.push(sibling);
		}

		return siblings;
	}

	document.querySelectorAll('[data-tab]')
			.forEach(el => {
				el.addEventListener('click', e => {
					e.preventDefault();

					let dest = document.querySelector(el.dataset.tab);

					console.log(document.querySelector(el.dataset.tab));

					dest.classList.add('visible');
					el.classList.add('current');

					getSiblings(el).forEach(item => { item.classList.remove('current') });
					getSiblings(dest).forEach(item => { item.classList.remove('visible') });
				})
			});

	document.querySelector('.tab-link:first-child').click();
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
			prev: '.products-slider .glider-prev',
			next: '.products-slider .glider-next'
		},
		responsive:[
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,
				}
			},
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

	new Glider(document.querySelector('.photos-previews-slider .glider-contain'), {
		slidesToShow: 3,
		slidesToScroll: 1,
		rewind: true,
		draggable: true,
		duration: 1,
		arrows: {
			prev: '.photos-previews-slider .glider-prev',
			next: '.photos-previews-slider .glider-next'
		}
	});
});

// Object Fit Polyfill
/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="bfred-it:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();

objectFitImages('.object-fit-cover');

// SVG use polyfill
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});


svg4everybody();