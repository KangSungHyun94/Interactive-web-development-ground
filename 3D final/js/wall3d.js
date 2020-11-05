(function(){
  const houseElem = document.querySelector('.house');
  const barElem = document.querySelector('.progress-bar');
  const stageElem=document.querySelector('.stage');
  const mousePos={ x:0, y:0};
  const selectCharacterElem=document.querySelector('.select-character');
//★스크롤 바의 길이가 눈에 보이는 창의 높이임.(window.innerHeight)
//그래서 스크롤하는 영역은. 전체 크기 - 스크롤바의 길이
//pageYoffset의 최대값은 maxscrollvalue와 같은 값임
let maxScrollValue;

function resizeHandler(){
  maxScrollValue = document.body.offsetHeight - window.innerHeight;
}
  window.addEventListener('scroll',function(){
    const scrollPer = pageYOffset / maxScrollValue;
    const zMove = scrollPer * 980 -490; //0부터 1은 너무 작은 값이라 1000을 곱해서 0부터 1000으로 만듦.
    houseElem.style.transform='translateZ(' + zMove + 'vw)';

    //progress bar
    barElem.style.width = scrollPer*100 + '%';
  });

  //가운데를 (0,0)이라 치고 나머지 좌표를 따는 식?임.
  window.addEventListener('mousemove',function(e){
    mousePos.x = -1 + (e.clientX / window.innerWidth)*2;
    mousePos.y = 1 - (e.clientY / window.innerHeight)*2;
    stageElem.style.transform='rotateX('+(mousePos.y*5)+'deg) rotateY('+(mousePos.x*5)+'deg)';
  });

  //resize 이벤트 (화면 크기 달라지는거 말하는듯)
  window.addEventListener('resize',resizeHandler);

  stageElem.addEventListener('click',function(e){
    new Character({
      xPos:e.clientX / window.innerWidth * 100,
      speed :Math.random() * 0.5 + 0.2
    });
  });

  selectCharacterElem.addEventListener('click',function(e){
    const value = e.target.getAttribute('data-char');
    document.body.setAttribute('data-char',value);
  });

  resizeHandler();
})();
