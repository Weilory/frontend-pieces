const mouses = document.querySelectorAll('.fb-emote__smile');
const left_eyes = document.querySelectorAll('.fb-emote__eye--left');
const right_eyes = document.querySelectorAll('.fb-emote__eye--right');

const faces = document.querySelectorAll('.fb-emote');

const cover = document.querySelector('.fb-active-emote');

const bar_length = 574;

var last_face = faces[2];
// record as submission
var last_face_index = 2;

function face_cover_animate(
  position_callback,
  expression_callback,
){
  // vanish
  cover.style.animation = 'face_vanish 0.5s';
  setTimeout(()=>{
    cover.style.display = 'none';
    // callback change the relative positioning
    position_callback();
    // callback change the face expression
    expression_callback();
    cover.style.display = 'block';
    // appear
    cover.style.animation = 'face_appear 0.5s';
    setTimeout(()=>{
      cover.style.animation = 'none';
    }, 500);
  }, 450);
}

// change active svg in absolute positioning as cover
function face_cover_expression_change(ind){
  const cover_paths = cover.querySelectorAll('path');
  cover_paths[0].setAttribute('d', left_eyes[ind].getAttribute('d'));
  cover_paths[1].setAttribute('d', right_eyes[ind].getAttribute('d'));
  cover_paths[2].setAttribute('d', mouses[ind].getAttribute('d'));
}

// grey face and font below color and size
function assign_last_face(ind){
  last_face.classList.remove('s--active');
  last_face = faces[ind];
  last_face_index = ind;
  last_face.classList.add('s--active');
}

faces[0].addEventListener('click', ()=>{
  assign_last_face(0);
  face_cover_animate(
    ()=>{cover.style.left = '-50%'},
    ()=>{face_cover_expression_change(0)}
  );
});

faces[1].addEventListener('click', ()=>{
  assign_last_face(1);
  face_cover_animate(
    ()=>{cover.style.left = '-25%'},
    ()=>{face_cover_expression_change(1)}
  );
});

faces[2].addEventListener('click', ()=>{
  assign_last_face(2);
  face_cover_animate(()=>{
    cover.style.left = '0'},
    ()=>{face_cover_expression_change(2)}
  );
});

faces[3].addEventListener('click', ()=>{
  assign_last_face(3);
  face_cover_animate(
    ()=>{cover.style.left = '25%'},
    ()=>{face_cover_expression_change(3)}
  );
});

faces[4].addEventListener('click', ()=>{
  assign_last_face(4);
  face_cover_animate(
    ()=>{cover.style.left = '50%'},
    ()=>{face_cover_expression_change(4)}
  );
});
