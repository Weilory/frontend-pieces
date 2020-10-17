function svg_display(){
	gsap.registerPlugin(MotionPathPlugin, DrawSVGPlugin);

	gsap.set(".hide", { opacity: 1 });

	gsap.set("#s-path", { drawSVG: "0 4%" });

	gsap.set(["#motion-path-1", "#flash line", ".movement", ".movement2"], {
		drawSVG: "0% 0%"
	});

	gsap.set("#motion-path-2", {
		drawSVG: "100% 100%"
	});

	gsap.set(["#burst-1 path", "#burst-2 path", "#burst-3 path"], {
		transformOrigin: "center",
		opacity: 0,
		scale: 0.3
	});

	gsap.set(".triangle", {
		scale: 0.5,
		transformOrigin: "center"
	});

	gsap.set("#v", {
		transformOrigin: "bottom center"
	});

	function s() {
		const s = gsap.timeline();
		s.from("#s", {
			scale: 0,
			motionPath: {
				path: "#motion-path-1",
				align: "#motion-path-1",
				alignOrigin: [0.3, 0.7],
				start: 0.5,
				end: 0
			},
			rotation: -40,
			duration: 0.5,
			ease: "expo.out"
		})
			.to(
				"#motion-path-1",
				{
					keyframes: [
						{ opacity: 1, duration: 0.01 },
						{ drawSVG: "20% 40%", duration: 0.2 },
						{ drawSVG: "40% 40%", duration: 0.2 },
						{ opacity: 0, duration: 0.01 }
					]
				},
				0
			)
			.to(
				"#s",
				{
					keyframes: [
						{ duration: 0.1, scaleY: 0.4 },
						{ duration: 0.1, scaleY: 1 }
					]
				},
				0.11
			)
			.to(
				"#s",
				{
					y: 0,
					x: 0,
					duration: 0.2
				},
				0.35
			)
			.to(
				"#s",
				{
					keyframes: [
						{ rotation: -30, duration: 0.3, ease: "back.out(1.7)" },
						{ rotation: 0, duration: 2, ease: "elastic.out(1, 0.5)" }
					]
				},
				0.35
			)
			.to(
				"#s-path",
				{
					drawSVG: "100%",
					duration: 0.7,
					ease: "sine.out"
				},
				0.5
			)
			.to(
				"#movement-1",
				{
					keyframes: [
						{ opacity: 1, duration: 0.01 },
						{ drawSVG: "20% 50%", duration: 0.2 },
						{ drawSVG: "100% 100%", duration: 0.2 },
						{ opacity: 0, duration: 0.01 }
					]
				},
				0.5
			)
			.to(
				"#movement-2",
				{
					keyframes: [
						{ opacity: 1, duration: 0.01 },
						{ drawSVG: "20% 50%", duration: 0.2 },
						{ drawSVG: "100% 100%", duration: 0.2 },
						{ opacity: 0, duration: 0.01 }
					]
				},
				0.7
			);

		return s;
	}

	function burstOne() {
		const burst = gsap.timeline();

		burst.to("#burst-1 path", {
			keyframes: [
				{ opacity: 1, duration: 0.01 },
				{
					x: "random(-50, 20)",
					y: "random(-50, -10)",
					duration: 0.3,
					rotation: "random(-90, -300)",
					scale: 0.8
				},
				{ opacity: 0, duration: 0.06 }
			],
			stagger: {
				amount: 3
			},
			duration: 1
		});
		return burst;
	}

	function burstTwo() {
		const burst = gsap.timeline();

		burst.to("#burst-2 path", {
			keyframes: [
				{ opacity: 1, duration: 0.01 },
				{
					x: "random(0, 20)",
					y: "random(-40, -10)",
					duration: 1,
					rotation: "random(-300, -300)",
					scale: 1
				},
				{ opacity: 0, duration: 0.2, delay: -0.2 }
			],
			stagger: {
				amount: 3
			},
			duration: 1
		});
		return burst;
	}

	function burstThree() {
		const burst = gsap.timeline();

		burst.to("#burst-3 path", {
			keyframes: [
				{ opacity: 1, duration: 0.01 },
				{
					x: "random(-20, 40)",
					y: "random(-50, -10)",
					duration: 1,
					rotation: "random(-180, -180)",
					scale: 1
				},
				{ opacity: 0, duration: 0.2, delay: -0.2 }
			],
			stagger: {
				amount: 3
			},
			duration: 0.7
		});
		return burst;
	}

	function v() {
		const v = gsap.timeline();

		v.to(".triangle", {
			scale: 1,
			motionPath: {
				path: "#motion-path-1",
				align: "#motion-path-1",
				alignOrigin: [0.3, 0.7],
				start: 0.5,
				end: 1
			},
			rotation: -40,
			duration: 0.8
		})
			.to(
				".triangle",
				{
					keyframes: [
						{ opacity: 1, duration: 0.01 },
						{ opacity: 0, duration: 0.01, delay: 0.6 }
					]
				},
				"<"
			)
			.to(
				"#flash line",
				{
					keyframes: [
						{ drawSVG: "20% 50%", duration: 0.1 },
						{ drawSVG: "100% 100%", duration: 0.1 }
					]
				},
				">"
			)
			.from(
				"#v",
				{
					scale: 0,
					duration: 0.7,
					// ease: "elastic.Out(1, 0.5)",
					ease: "back.out(2)",
					rotation: 20
				},
				"<"
			);

		return v;
	}

	function g() {
		const g = gsap.timeline();

		g.to(
			"#motion-path-2",
			{
				keyframes: [
					{ opacity: 1, duration: 0.01 },
					{ drawSVG: "50% 90%", duration: 0.2 },
					{ drawSVG: "0% 0%", duration: 0.2 },
					{ opacity: 0, duration: 0.01 }
				]
			},
			0
		).from(
			"#g",
			{
				transformOrigin: "center",
				scale: 0,
				duration: 0.5,
				ease: "expo.out",
				motionPath: {
					path: "#motion-path-2",
					align: "#motion-path-2",
					alignOrigin: [0.7, 0.8],
					autoRotate: 80,
					start: 0,
					end: 1
				}
			},
			"<"
		);
		g.to(
			"#g",
			{
				keyframes: [
					{
						scaleY: 0.6,
						duration: 0.3,
						transformOrigin: "bottom center"
					},
					{
						scaleY: 1,
						duration: 0.6,
						ease: "back.out(4)",
						transformOrigin: "bottom center"
					}
				]
			},
			">-0.4"
		);
		g.to(
			"#g-shape",
			{
				opacity: 0,
				duration: 0.1
			},
			"<+0.1"
		)
			.to(
				"#movement-3",
				{
					keyframes: [
						{ opacity: 1, duration: 0.01 },
						{ drawSVG: "20% 50%", duration: 0.2 },
						{ drawSVG: "100% 100%", duration: 0.2 },
						{ opacity: 0, duration: 0.01 }
					]
				},
				0.5
			)
			.to(
				"#movement-4",
				{
					keyframes: [
						{ opacity: 1, duration: 0.01 },
						{ drawSVG: "20% 50%", duration: 0.2 },
						{ drawSVG: "100% 100%", duration: 0.2 },
						{ opacity: 0, duration: 0.01 }
					]
				},
				"<"
			);

		return g;
	}

	const main = gsap.timeline({ delay: 1.5 });
	main.add(s().timeScale(0.9));
	main.add(burstOne(), 0.1);
	main.add(v().timeScale(1.1), 0.2);
	main.add(g(), 0.7);
	main.add(burstTwo(), 1);
	main.add(burstThree(), 1.5);

	// ScrubGSAPTimeline(main);
}

const svg_anim = document.getElementById('logo-anim');

window.addEventListener('load', ()=>{
	svg_display();
});

window.addEventListener('click', ()=>{
	svg_display();
});