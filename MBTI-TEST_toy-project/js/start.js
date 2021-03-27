const main = document.querySelector("#main");   //변수 선언(const: 상수로서 1개만 선언)
const qna = document.querySelector("#qna");     //querySelector로 선택된 main, qna의 id를 선택

// Answer에 버튼 만드는 함수
function addAnswer(answerText, qIdx){
  var a1 = document.querySelector('.answerBox');      // a에 answerBox class 부여
  var answer1 = document.createElement('button');     //answer1에 button이라는 html요소를 만들어 넣음
  answer1.classList.add('answerList');                //answer1 button에 'answerList' class 추가
  answer1.classList.add('my-3');                      //'answerList' 미적요소1
  answer1.classList.add('py-3');                      //'answerList' 미적요소2
  answer1.classList.add('mx-auto');                   //'answerList' 중앙 위치 조절
  answer1.classList.add('fadeIn');                    //'answerList' fadeIn animation 추가

  a1.appendChild(answer1);                            //answer1이라는 버튼이 a1에 소속됨
  answer1.innerHTML = answerText
  answer1.addEventListener("click", function(){       //button 작동함수(index.html의 onclick과 다름)
    var children = document.querySelectorAll('.answerList'); // 버튼 3개 선택
    for(let i = 0; i < children.length; i++){
      children[i].disabled = true;        // 버튼 비활성화
      children[i].style.WebkitAnimation = "fadeOut 0.5s";  // 'answerList 모음' fadeOut animation 추가
      children[i].style.animation = "fadeOut 0.5s";

    }
    setTimeout(() => {
      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none'; // 버튼 하나만 클릭되면 나머지 버튼 사라짐
      }
      goNext(++qIdx);       //반복문 종료 후, qIdx 1증가시켜 goNext함수 실행
    }, 450)
  }, false);
}

// qna 함수
function goNext(qIdx){
  var q1 = document.querySelector('.qBox');      // q1 class=qBox인 것
  q1.innerHTML = qnaList[qIdx].q;                //data.js에 있는 qnaList의 첫번째 요소의 q를 q1의 innerHTML에 넣어줌(qIdx가 1씩 증가 필요)
  for(let i in qnaList[qIdx].a){                 //answer 보여주기
    addAnswer(qnaList[qIdx].a[i].answer, qIdx);  //addAnswer 함수 호출
  }
}

// 애니메이션 함수 정의
function begin(){
  main.style.WebkitAnimation = "fadeOut 1s";  // 1초동안 사라짐
  main.style.animation = "fadeOut 1s";
  setTimeout(() => {                          //설정 시간이 되면 실행

    qna.style.WebkitAnimation ="fadeIn 1s";   //0.45초 이후 qna 나타나면서, setTimeout실행하며 0.45초 후 main 사라짐
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = "none";            //main 사라지기
      qna.style.display = "block";            //qna 나타나기
    }, 450)
    let qIdx = 0;
    goNext(qIdx);                                 //goNext 함수 호출
  }, 450);
}
