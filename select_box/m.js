// class Group{
// 	contour(){
// 	    var tlminx = 10000;
// 	    var tlminy = 10000;
// 	    var tlmaxx = 0;
// 	    var tlmaxy = 0;
// 		this._major.forEach(ar=>{
// 			if(tlminx > ar[0]){
// 				tlminx = ar[0];
// 			}if(tlminy > ar[1]){
// 				tlminy = ar[1];
// 			}if(tlmaxx < ar[2]){
// 				tlmaxx = ar[2];
// 			}if(tlmaxy < ar[3]){
// 				tlmaxy = ar[3];
// 			}
// 		});
// 		return [tlminx, tlminy, tlmaxx, tlmaxy];
// 	}
// }


const magic = document.querySelector('.magic-box');
const bope = document.querySelector('.bope');
const eope = document.querySelector('.eope');

var dim;
var drevious = {x:0,y:0};
var douse = {x:0,y:0};
var inmagic = false; 
var domagic = false; 
var movemagic = false; 
var closest = null;

function magic_control(){
	// inmagic = !inmagic;
	magic.classList.toggle("seeyou");
	// console.log(inmagic);
}

bope.addEventListener('click', ()=>{
  inmagic = !inmagic;
  magic_control();
});

function tight_layout(){
  // var tlminx = 10000;
  // var tlminy = 10000;
  // var tlmaxx = 0;
  // var tlmaxy = 0; 
  // var tl;
  // for(let i=0;i<indicate.length;i++){
  // 	if(['move','rotate','scale','group move','group rotate','group scale'].includes(indicate[i])) return;
  // 	if(indicate[i] === 'group'){
  // 		tl = pathsry[i].contour();
  // 	}else{
  // 		tl = major[i]; 
  // 	}
  // 	if(tlminx > tl[0]){
  // 		tlminx = tl[0];
  // 	}if(tlminy > tl[1]){
  // 		tlminy = tl[1];
  // 	}if(tlmaxx < tl[2]){
  // 		tlmaxx = tl[2];
  // 	}if(tlmaxy < tl[3]){
  // 		tlmaxy = tl[3];
  // 	}
  // }
  // return [tlminx, tlminy, tlmaxx, tlmaxy];
  return [200, 50, 200, 220];
}

function rect_distance(x, y, wid, hei, pt){
	function dis(ar){return ((ar[0]-pt.x)**2+((ar[1]-pt.y)**2))**0.5;}
	var ds = [[x,y],[x+wid,y],[x,y+hei],[x+wid,y+hei]];
	var di = ds.map(ar=>{return ((ar[0]-pt.x)**2+((ar[1]-pt.y)**2))**0.5;});
	return di.indexOf(Math.min.apply(Math, di));
}

sv.addEventListener('click', ()=>{
	inmagic = !inmagic;
	dim = tight_layout();
	magic.style.left = `${dim[0]}px`;
	magic.style.top = `${dim[1]}px`;
	magic.style.width = `${dim[2]}px`;
	magic.style.height = `${dim[3]}px`;
	magic_control();
});

function md_magic(e){
  domagic = true; 
  drevious = {x:e.clientX,y:e.clientY}; 
  if(dim[0]<e.clientX&&dim[0]+dim[2]>e.clientX&&dim[1]<e.clientY&&dim[1]+dim[3]>e.clientY){
    movemagic = true;
  }else{
    movemagic = false; 
    closest = rect_distance(dim[0],dim[1],dim[2],dim[3],drevious);
  }
}

window.addEventListener('mousedown', e=>{
	if(inmagic){
		md_magic(e);
	}
});

function get_difference(pre, mou){
  return {x:mou.x-pre.x,y:mou.y-pre.y};
}

function get_mv(pre, mou){return {x:mou.x-pre.x,y:mou.y-pre.y};}

function get_magic_scale(clo, rec, mv){
	var minx = 65;
	var miny = 30; 
	var sca;
	switch(clo){
		case 0:
		sca = [rec[0]+mv.x,rec[1]+mv.y,rec[2]-mv.x,rec[3]-mv.y];
		if(sca[2]<minx){
			sca[0] += sca[2] - minx;
			sca[2] = minx;
		}else if(sca[3]<miny){
			sca[1] += sca[3] - miny;
			sca[3] = miny;
		}
		return sca;
		case 1:
		sca = [rec[0],rec[1]+mv.y,rec[2]+mv.x,rec[3]-mv.y];
		if(sca[2]<minx){
			sca[2] = minx;
		}else if(sca[3]<miny){
			sca[1] += sca[3] - miny;
			sca[3] = miny;
		}
		return sca;
		case 2:
		sca = [rec[0]+mv.x,rec[1],rec[2]-mv.x,rec[3]+mv.y];
		if(sca[2]<minx){
			sca[0] += sca[2] - minx;
			sca[2] = minx;
		}else if(sca[3]<miny){
			sca[3] = miny; 
		}
		return sca;
		case 3:
		sca = [rec[0],rec[1],rec[2]+mv.x,rec[3]+mv.y];
		if(sca[2]<minx){
			sca[2] = minx;
		}else if(sca[3]<miny){
			sca[3] = miny;
		}
		return sca;
	}
}

function sca_sure(sca){
	if(sca[2] < 30 || sca[3] < 30){
		return true; 
	}
	return false;
}

function mm_magic(e){
  if(!domagic) return; 
  douse = {x:e.clientX,y:e.clientY}; 
  var dif = get_difference(drevious, douse);
  if(movemagic){
    magic.style.left = `${dim[0]+dif.x}px`;
    magic.style.top = `${dim[1]+dif.y}px`;
  }else{
    var tver = get_magic_scale(closest, dim, get_mv(drevious,douse));
    magic.style.left = `${tver[0]}px`;
    magic.style.top = `${tver[1]}px`;
    magic.style.width = `${tver[2]}px`;
    magic.style.height = `${tver[3]}px`;
  }
}

window.addEventListener('mousemove', e=>{
	if(inmagic){
		mm_magic(e);
	}
});

function mu_magic(e){
  domagic = false; 
  douse = {x:e.clientX,y:e.clientY}; 
  var dif = get_difference(drevious, douse); 
  if(movemagic){
    magic.style.left = `${dim[0]+dif.x}px`;
    magic.style.top = `${dim[1]+dif.y}px`;
    dim[0] += dif.x;
    dim[1] += dif.y;
  }else{
    var tver = get_magic_scale(closest, dim, get_mv(drevious,douse));
    magic.style.left = `${tver[0]}px`;
    magic.style.top = `${tver[1]}px`;
    magic.style.width = `${tver[2]}px`;
    magic.style.height = `${tver[3]}px`;
    dim = tver;
  }
}

window.addEventListener('mouseup', e=>{
	if(inmagic){
		mu_magic(e);
	}
});

eope.addEventListener('click', ()=>{
	console.log(dim);
});

function vne(a){return a.map(ar=>{return ar.map(br=>{return br.map(cr=>{return {x:cr.x,y:cr.y};});});});}

function extract(args, _dim){
	_pat = args[0];
	_maj = args[6];
	var pat_, maj_;
	if(_lin === 'vertex'){
		pat_ = vne(_pat);
		vmd(pat_, vne(_pat), dt=>{return {x:dt.x-_dim[0], y:dt.y-_dim[1]};});
	}else if(_lin === 'ellipse'){
		pat_ = [_pat[0]-_dim[0], _pat[1]-_dim[1], _pat[2], _pat[3], _pat[4], _pat[5], _pat[6]];
	}else{
		pat_ = _pat.map(ar=>{return {x:ar.x+_dim[0], y:ar.y+_dim[1]};});
	}
	maj_ = [_maj[0]-_maj[0], _maj[1]-_maj[1], _maj[2], _maj[3]];
	return [pat_, args[1], args[2], args[3], args[4], args[5], maj_];
}

/*

edit svg funcs, 
* svg_grad -> params: thecore, themaj [maj = [x0, y0, x1, y1]]
* <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">

*/


