const feed = document.getElementById('feed');
const feed_loader = document.getElementById('feed-loader');

const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);

// feed load
function go_feed_loading(){
	feed_loader.style.display = 'flex';
}

function kill_feed_loading(){
	feed_loader.style.display = 'none';
}

// pass height and width, return the amount of images
function grid_calc(w){return Math.floor(w / 99);}

const max_iter = grid_calc(screen.width);

console.log('max: ', max_iter);

// load popular images from database
// function gird_load(){
// }

function temporary_color(){
	document.querySelectorAll('.box').forEach(box=>{
		box.style.backgroundColor = randomColor();
	});
}

// pass in iter, an integer that indicate
// how many feed box are used
// function grid_parse(ite){
// 	var str = '';
// 	for(let ii = 0; ii < ite; ii++){
// 		if(ii % 2 === 0){
// 			// double
// 			str += '<div class="feed-boxes"><div class="box"></div><div class="box"></div></div>';
// 		}else{
// 			// single
// 			str += '<div class="feed-boxes"><div class="box"></div></div>';
// 		}
// 	}
// 	return str;
// }

// function grid_size_change(){
// 	feed.innerHTML = grid_parse(grid_calc(window.innerWidth));
// }

var domDiamond = [];

// load all element to js at once with assigned color
// control display by optional rendering
const init_domDiamond = () => {
	
}

window.addEventListener('load', ()=>{
	// grid_size_change();
	// temporary_color();
});

window.addEventListener('resize', ()=>{
	// wait resize to finish
	// show loader
	// setTimeout(()=>{
	// 	// dismiss loader
	// 	grid_size_change();
	// 	temporary_color();
	// }, 1000);
});

