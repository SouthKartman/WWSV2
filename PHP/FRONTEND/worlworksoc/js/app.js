gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

if (ScrollTrigger.isTouch !== 1) {

	ScrollSmoother.create({
		wrapper: '.start_wrapper',
		content: '.start_content',
		smooth: 1.5,
		effects: true
	})

	gsap.fromTo('.start_hero-section', { opacity: 1 }, {
		opacity: 0,
		scrollTrigger: {
			trigger: '.start_hero-section',
			start: 'center',
			end: '820',
			scrub: true
		}
	})

	let itemsL = gsap.utils.toArray('.start_gallery__left .start_gallery__item')

	itemsL.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: -50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-850',
				end: '-100',
				scrub: true
			}
		})
	})

	let itemsR = gsap.utils.toArray('.start_gallery__right .start_gallery__item')

	itemsR.forEach(item => {
		gsap.fromTo(item, { opacity: 0, x: 50 }, {
			opacity: 1, x: 0,
			scrollTrigger: {
				trigger: item,
				start: '-750',
				end: 'top',
				scrub: true
			}
		})
	})

}
