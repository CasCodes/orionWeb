import './projects.css'

// fancy cursor
let mouseCursor = document.querySelector('.cursor');
let navLinks = document.querySelectorAll('.navbar a');
window.addEventListener('mousemove', cursor);

function cursor(e){
  mouseCursor.style.top = e.pageY + 'px';
  mouseCursor.style.left = e.pageX + 'px';
}

navLinks.forEach(link => {
  link.addEventListener('mousemove',() =>{
    mouseCursor.classList.add('link-grow');
    link.classList.add('hovered-link')
  });
  link.addEventListener('mouseleave',() =>{
    mouseCursor.classList.remove('link-grow');
    link.classList.remove('hovered-link')
  });
});

button.forEach(link => {
  link.addEventListener('mousemove',() =>{
    mouseCursor.classList.add('link-grow');
    link.classList.add('hovered-link')
  });
  link.addEventListener('mouseleave',() =>{
    mouseCursor.classList.remove('link-grow');
    link.classList.remove('hovered-link')
  });
});