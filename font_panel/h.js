const fp_panel = document.getElementById('font-control-panel');
const fp_drag = document.getElementById('fp-drag');
const fp_dismiss = document.getElementById('fp-dismiss');

var ptop = 20; 
var pleft = 40;
var pprevious = {x: 0, y: 0}; 
var pmouse = {x: 0, y: 0}; 
var pdrawing = false;

fp_drag.addEventListener('mousedown', e=>{
  isolate = false;
  pprevious = {x: e.clientX, y: e.clientY}; 
  pdrawing = true; 
}); 

fp_panel.addEventListener('mousemove', e=>{
  if(!pdrawing) return; 
  fp_panel.style.left = `${pleft-pprevious.x+e.clientX}px`;
  fp_panel.style.top = `${ptop-pprevious.y+e.clientY}px`; 
}); 

fp_drag.addEventListener('mouseup', e=>{
  pdrawing = false; 
  pleft = pleft-pprevious.x+e.clientX; 
  ptop = ptop-pprevious.y+e.clientY; 
  pprevious = {x: e.clientX, y: e.clientY}; 
});

function font_panel_control(){
  isolate = false;
  fp_panel.classList.toggle('seeyou');
}

fp_dismiss.addEventListener('click', font_panel_control);