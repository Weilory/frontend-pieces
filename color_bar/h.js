const colorbars = document.querySelectorAll('#adjust-color div');
const border_color = document.getElementById('border-color-box');
const border_item = document.getElementById('border-item');
const border_move = document.getElementById('border-color');
const adjust_color = document.getElementById('adjust-color');

// left, top
var border_color_pos = {x: 0, y: 0};
var border_color_previous = {x: 0, y: 0};

var bstate = false;
var between = false;
var current_box = null;
var current_border = [];
var current_fill = [];

window.addEventListener('load', ()=>{
	adjust_color.style.visibility = 'hidden';
});

border_item.addEventListener('mousedown', e=>{
	bstate = true;
	let rec = border_color.getBoundingClientRect();
	border_color_pos = {x: rec.x, y: rec.y};
	border_color_previous = {x: e.clientX, y: e.clientY};
});

border_item.addEventListener('mousemove', e=>{
	if(!bstate){return;}
	between = true;
	border_move.style.left = `${border_color_pos.x + e.clientX - border_color_previous.x}px`;
	border_move.style.top = `${border_color_pos.y + e.clientY - border_color_previous.y}px`;
});

border_item.addEventListener('mouseup', e=>{
	if(!bstate){return;}
	bstate = false;
	if(between){
		border_move.style.left = `${border_color_pos.x + e.clientX - border_color_previous.x}px`;
		border_move.style.top = `${border_color_pos.y + e.clientY - border_color_previous.y}px`;
		between = false;
	}else{
		// click
		if(adjust_color.style.visibility === 'hidden'){
			current_box = border_item;
			adjust_color.style.animation = 'none';
			setTimeout(()=>{
				adjust_color.style.visibility = 'visible';
				adjust_color.style.animation = 'fadeIn 2s';
			}, 100);
		}else{
			adjust_color.style.visibility = 'hidden';
		}
	}
});

function color_it(box, col, deg=90){
	let cs;
	if(col.length === 0){
		cs = 'black';
	}else if(col.length === 1){
		cs = col[0];
	}else{
		cs = `linear-gradient(${deg}deg, ${col.join(',')})`;
	}
	box.style.background = cs;
}

colorbars.forEach(cb=>{
	cb.style.background = cb.getAttribute('value');
	cb.addEventListener('click', ()=>{
		if(current_box === border_item){
			current_border.push(cb.getAttribute('value'));
			color_it(border_item, current_border);
		}else{
			console.log('f');
		}
	});
});































