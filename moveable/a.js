function oMousePos(e){
  // var rc = canvas.getBoundingClientRect();
  // return {
  //   x: e.clientX - rc.left,
  //   y: e.clientY - rc.top,
  // };
  return {
  	x: e.clientX,
  	y: e.clientY
  }
}

const blue_container = document.getElementById('blue-box');
const green_container = document.getElementById('green-box');
const pink_container = document.getElementById('pink-box');

const blue_drag = document.getElementById('blue-draggable');
const green_drag = document.getElementById('green-draggable');
const pink_drag = document.getElementById('pink-draggable');


class MoveablePanel{

	/*
	prevent an element from moving out of window
	*/

	constructor(container, draggable, left, top){
		this.container = container;
		this.draggable = draggable;
		this.left = left;
		this.top = top;
		let rect = container.getBoundingClientRect();
		this.width = rect.width;
		this.height = rect.height;
		this.status = false;
	}

	mousedown(e){
		this.status = true;
		this.previous = oMousePos(e)
	}

	mousemove(e){
		if(!this.status){return;}
		let pos = oMousePos(e);
		let vleft = this.left + pos.x - this.previous.x;
		let vtop = this.top + pos.y - this.previous.y;
		let kleft, ktop;

		if(vleft < 0){
			kleft = 0;
		}else if(vleft > window.innerWidth - this.width){
			kleft = window.innerWidth - this.width;
		}else{
			kleft = vleft;
		}

		if(vtop < 0){
			ktop = 0;
		}else if(vtop > window.innerHeight - this.height){
			ktop = window.innerHeight - this.height;
		}else{
			ktop = vtop;
		}
		this.container.style.left = `${kleft}px`;
		this.container.style.top = `${ktop}px`;
	}

	/*
	sometimes user move the cursor too fast which mouseleave is previous than mouseup
	to prevent moving too fast and break the control, mouseleave is handled the same as mouseup
	*/
	
	mouseupleave(e){
		if(!this.status){return;}
		this.status = false;
		let pos = oMousePos(e);
		let vleft = this.left + pos.x - this.previous.x;
		let vtop = this.top + pos.y - this.previous.y;

		if(vleft < 0){
			this.left = 0;
		}else if(vleft > window.innerWidth - this.width){
			this.left = window.innerWidth - this.width;
		}else{
			this.left = vleft;
		}

		if(vtop < 0){
			this.top = 0;
		}else if(vtop > window.innerHeight - this.height){
			this.top = window.innerHeight - this.height;
		}else{
			this.top = vtop;
		}

		this.container.style.left = `${this.left}px`;
		this.container.style.top = `${this.top}px`;
	}
}

function enable_movement(container, draggable, top, left){
	let mp = new MoveablePanel(container, draggable, top, left);
	draggable.addEventListener('mousedown', e=>{mp.mousedown(e)});
	draggable.addEventListener('mousemove', e=>{mp.mousemove(e)});
	draggable.addEventListener('mouseup', e=>{mp.mouseupleave(e)});
	draggable.addEventListener('mouseleave', e=>{mp.mouseupleave(e)});
}

enable_movement(blue_container, blue_drag, 0, 0);
enable_movement(green_container, green_drag, 500, 0);
enable_movement(pink_container, pink_drag, 0, 300);









