const available_container = document.getElementById('available-container');
const using_container = document.getElementById('using-container');
const switch_available = document.getElementById('available-panel-app');

let available_state = true;
let available_amount = 10;
let using_amount = 8;

available_gtc = Math.ceil(Math.sqrt(available_amount));
let frs = Array.from(Array(available_gtc), ()=>'1fr').join(' ');

available_container.style.gridTemplateColumns = frs;
available_container.style.gridTemplateRows = frs;
using_container.style.gridTemplateColumns = '1fr';

for (let i = 0; i < available_amount; i++){
	let app = document.createElement('div');
	app.setAttribute('class', 'available-app');
	available_container.appendChild(app);
}

for (let i = 0; i < using_amount; i++){
	let app = document.createElement('div');
	app.setAttribute('class', 'using-app');
	using_container.appendChild(app);
}

const available_apps = document.querySelectorAll('.available-app');
const using_apps = document.querySelectorAll('.using-app');


const random_color = () => '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');


function available_category(app){
	app.addEventListener('click', ()=>{
		if(available_state){return;}
		app.classList.add('vanish');
		setTimeout(()=>{
			app.classList.remove('available-app');
			app.classList.add('using-app');
			using_container.appendChild(app);
			app.classList.remove('vanish');
			app.classList.add('matter');
			setTimeout(()=>{
				app.classList.remove('matter');
			}, 1000);
		}, 1000);
		using_category(app);
	});
}

function using_category(app){
	app.addEventListener('click', ()=>{
		if(available_state){return;}
		app.classList.add('vanish');
		setTimeout(()=>{
			app.classList.remove('using-app');
			app.classList.add('available-app');
			available_container.appendChild(app);
			app.classList.remove('vanish');
			app.classList.add('matter');
			setTimeout(()=>{
				app.classList.remove('matter');
			}, 1000);
		}, 1000);
		available_category(app);
	});
}

// color
available_apps.forEach(app=>{
	app.style.backgroundColor = random_color();
	available_category(app);
});

using_apps.forEach(app=>{
	app.style.backgroundColor = random_color();
	using_category(app);
});

switch_available.addEventListener('click', ()=>{
	if(available_state){
		available_container.style.display = 'grid';
		available_container.classList.add('matter');
		setTimeout(()=>{
			available_container.classList.remove('matter');
		}, 1000);
	}else{
		available_container.classList.add('vanish');
		setTimeout(()=>{
			available_container.classList.remove('vanish');
			available_container.style.display = 'none';
		}, 1000);
	}
	available_state = !available_state;
});



























