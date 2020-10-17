const jpg_filenames = [
	'book',
	'build',
	'butterfly',
	'bridge',
	'meow', 
	'cat2', 
	'catty', 
	'champel',
	'circle',
	'city1',
	'coffee',
	'pencil',
	'city',
	'color',
	'deadpool',
	'singer',
	'dock',
	'dock1',
	'dotman',
	'earphone',
];

var front_images, back_images;

const jpg_wrapper = filename => 'img/' + filename + '.jpg';

function assign_dummy_images(val){
	front_images = jpg_filenames.slice(0, val).map(filename=>jpg_wrapper(filename));
	back_images = jpg_filenames.slice(val, val + val).map(filename=>jpg_wrapper(filename));
}

const riding = 9;

assign_dummy_images(riding);

const carousel = document.querySelector('.slider-content');

const polySideLength = (n, radius) => Math.abs(Math.sin(Math.PI / n) * radius * 2);
const polySideDegree = n => Array.from({length: n}, (xx, ii) => ii * 360 / n);

// states are images that rotating normally
function setUpHouses(degs, radius, width){
	// remove all child from carousel
	while (carousel.firstChild) {
	    carousel.firstChild.remove();
	}
	for(let ii = 0; ii < riding; ii++){
		let horse = document.createElement('div');
		horse.setAttribute('class', 'shadow');
		horse.style.transform = `rotateY(${degs[ii]}deg) translateZ(${radius}px)`;
		horse.style.width = `${width}px`;

		let horse_state = document.createElement('img');
		horse_state.src = front_images[ii];
		horse.appendChild(horse_state);

		let horse_hover_state = document.createElement('img');
		horse_hover_state.src = back_images[ii];
		horse.appendChild(horse_hover_state);

		carousel.appendChild(horse);

		horse.addEventListener('mouseenter', ()=>{
			horse_state.style.display = 'none';
			horse_hover_state.style.transform = 'scale(1.2)';
		});

		horse.addEventListener('mouseleave', ()=>{
			console.log('triggered');
			horse_hover_state.style.transform = 'none';
			setTimeout(()=>{
				horse_state.style.display = 'block';
			}, 600);
		});
	}
}

function loadHouse(){
	setUpHouses(
	degs=polySideDegree(riding),
	radius=1/3*window.innerWidth,
	width=0.8*polySideLength(riding, 1/3*window.innerWidth),
	);
}

window.addEventListener('load', loadHouse);
window.addEventListener('resize', loadHouse);




