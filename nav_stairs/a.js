const list_fold = n => Array.from({length: n-1}, (x, i)=>i % 2 === 0 ? (n+1)/2 + Math.ceil((i+1)/2) - 2 : (n+1)/2 - Math.ceil((i+1)/2) - 1);
// list_fold(11) => [5, 4, 6, 3, 7, 2, 8, 1, 9, 0]

const nav_ul = document.getElementById('nav-ul');
const nav_launch = document.getElementById('nav-launch');
const nav_items = document.querySelectorAll('.list-item');

// initial display set to false
var nav_flag = false;
var nav_speed = 250;

window.addEventListener('load', ()=>{
	nav_items.forEach(nv=>{
		nv.style.display = 'none';
	});
});

nav_launch.addEventListener('mouseenter', ()=>{
	list_fold(nav_items.length + 1).forEach((ind, ii)=>{
		setTimeout(()=>{
			nav_items[ind].style.display = 'block';
		}, nav_speed * (ii + 1));
	});
});

nav_ul.addEventListener('mouseleave', ()=>{
	list_fold(nav_items.length + 1).forEach((ind, ii)=>{
		setTimeout(()=>{
			nav_items[ind].style.display = 'none';
		}, nav_speed * (ii + 1));
	});
});