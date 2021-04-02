function render_element(styles, el) {
  for (const [kk, vv] of Object.entries(styles)) {
    el.style[kk] = vv;
  }
}

// dismiss button widget
class ButtonDismiss{
	constructor(
		parent_el, 
		callback=null,
		width='30px',
		margin='2px',
	){
		this.parent_el = parent_el;
		this.callback = callback;
		this.width = width;
		this.margin = margin;

		this.el = document.createElement('div');
		render_element({
			position: 'absolute',
			width: this.width,
			height: this.width,
			right: '0',
			display: 'inline-block',
			borderRadius: this.width,
			background: 'white',
			margin: this.margin,
			cursor: 'pointer',
		}, this.el);

		this.click = this.click.bind(this);
		this.mouseenter = this.mouseenter.bind(this);
		this.mouseleave = this.mouseleave.bind(this);
		this.el.addEventListener('click', this.click);
		this.el.addEventListener('mouseenter', this.mouseenter);
		this.el.addEventListener('mouseleave', this.mouseleave);

		this.parent_el.appendChild(this.el);
	}

	mouseenter(){
		this.el.style.background = 'red';
	}

	mouseleave(){
		this.el.style.background = 'white';
	}

	click(){
		if(this.callback){
			this.callback();
		}else{
			this.el.style.display = 'none';
		}
	}
}


/*
element wrapper
then call element.show() and element.hide()
to alter visibility with transition
*/

class SH{
	/*
	add element method and return element
	*/
	constructor(
		el, // HTMLElement
		dis, // block/flex
		appear // bool: init by (appear === true ? show : hide)
	){
		this.el = el;
		this.dis = dis;
		if(appear){
			this.el.style.display = this.dis;
		}else{
			this.el.style.display = "none";
			// since effect is triggered in hiding by toggling class
			// prepare animation for removing class
			this.hide();
		}
		/* 
		manually assign el transition to
			all 500ms !important
		in style sheets
		*/
		el.hide = this.hide = this.hide.bind(this);
		el.show = this.show = this.show.bind(this);
	}

	hide(){
		setTimeout(()=>{
			this.el.style.display = "none";
		}, 500);
	}

	show(){
		this.el.style.display = this.dis;
	}
}

class SR extends SH{
	/*
	scale and rotate
	*/
	constructor(el, dis, appear){super(el, dis, appear);}

	hide(){
		this.el.classList.add('page-rotate-trans');
		super.hide();
	}

	show(){
		super.show();
		setTimeout(()=>{
			this.el.classList.remove('page-rotate-trans');
		}, 200);
	}
}

class BS extends SH{
	/*
	border radius and scale
	*/
	constructor(el, dis, appear){super(el, dis, appear);}

	hide(){
		this.el.classList.add('page-border-trans');
		this.el.classList.add('page-scale-trans');
		super.hide();
	}

	show(){
		super.show();
		setTimeout(()=>{
			this.el.classList.remove('page-scale-trans');
			this.el.classList.remove('page-border-trans');
		}, 200);
	}
}

class RT extends SH{
	/*
	right and top shrink
	*/
	constructor(el, dis, appear){
		super(el, dis, appear);
		this.el.classList.add('page-pre-top-center-trans');
	}
		
	hide(){
		this.el.classList.add('page-scale-trans');
		this.el.classList.add('page-rotate-trans');
		super.hide();
	}

	show(){
		super.show();
		setTimeout(()=>{
			this.el.classList.remove('page-scale-trans');
			this.el.classList.remove('page-rotate-trans');
		}, 200);
	}
}

class ShowHide{
	constructor(el, dis, appear){
		var cls = [
			SR,
			BS,
			RT,
		];

		// return a random effect from cls array
		return new cls[Math.floor(Math.random() * cls.length)](el, dis, appear);
	}
}

class PanelMain{
	// singleton
	constructor(
		appear=false, // appear -> bool: true: show panel; false: hide panel;
	){
		if(PanelMain._instance)return PanelMain._instance;
		this.appear = appear;
		this.el = document.createElement('div');
		render_element({
			position: 'fixed',
			display: 'flex',
			zIndex: '100000000',
			borderRadius: '20px',
			boxShadow: '8px 14px 7px darkgray',
			border: '10px solid #eee',
			fontFamily: "'Roboto', Arial, Helvetica, Sans-serif, Verdana",
			background: '#dee1e3',
			overflow: 'auto',
			left: 'calc(50vw - 384px)',
			top: '30vh',
			width: '768px',
			height: '40vh',
			transition: 'all 500ms',
		}, this.el);
		document.body.appendChild(this.el);
		this.panel = new ShowHide(
			this.el,
			'flex',
			this.appear,
		);
		this.show = this.panel.show;
		this.hide = this.panel.hide;
		this.dismiss_btn = new ButtonDismiss(this.el, this.hide, '40px');
		PanelMain._instance = this;
	}
}

var panelmain = new PanelMain();
setTimeout(()=>{
	panelmain.show();
	setTimeout(()=>{
		panelmain.hide();
	}, 1500);
}, 1500);













