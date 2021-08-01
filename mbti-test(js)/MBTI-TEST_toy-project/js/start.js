const main = document.querySelector("#main");     //변수 선언(const: 상수로서 1개만 선언)
const qna = document.querySelector("#qna");       //querySelector로 선택된 main, qna의 id를 선택
const result = document.querySelector("#result"); // result id 선택
const endPoint = 12;                              //질문 개수
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];                                //배열 생성

// goNext -> addAnswer -> 버튼 클릭 시 goNext -> 질문 종료 후 goResult

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

// qna 함수
function goNext(qIdx){
  if (qIdx === endPoint){
    goResult();
    return;
  }
  var q1 = document.querySelector('.qBox');      // q1 class=qBox인 것
  q1.innerHTML = qnaList[qIdx].q;                //data.js에 있는 qnaList의 첫번째 요소의 q를 q1의 innerHTML에 넣어줌(qIdx가 1씩 증가 필요)
  for(let i in qnaList[qIdx].a){                 //answer 보여주기
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);  //addAnswer 함수 호출, i번째 버튼
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx + 1) + '%';     // 달성률 구현
}

// Answer에 버튼 만드는 함수
function addAnswer(answerText, qIdx, idx){            // idx는 goNext에서 i번째 버튼 의미함
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
      var target = qnaList[qIdx].a[idx].type;          // qIdx번째 질문에 대한 사용자의 idx번째 답의 type
      for(let i = 0; i < target.length; i++){
        select[target[i]] += 1;                        // 사용자가 버튼 클릭 시, 12간지 순서대로 해당 target의 값이 1씩 증가
      }

      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none'; // 버튼 하나만 클릭되면 나머지 버튼 사라짐
      }
      goNext(++qIdx);       //반복문 종료 후, qIdx 1증가시켜 goNext함수 실행
    }, 450)
  }, false);
}

// 결과 함수
function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";  // 1초동안 사라짐
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {                          //설정 시간이 되면 실행
    result.style.WebkitAnimation ="fadeIn 1s";   //0.45초 이후 result 1초동안 나타나면서, setTimeout실행하며 0.45초 후 qna 사라짐
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = "none";            //qna 사라지기
      result.style.display = "block";        //result 나타나기
    }, 450)})
    setResult()
    calResult();
  }

// 결과 알고리즘 함수
function calResult(){
  var result = select.indexOf(Math.max(...select));          //select배열에서 최댓값
  return result;
}

// 결과 도출 함수
function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');   //동물 이름
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');              //동물 사진
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;                  //공유하기 때 사용
  resultImg.classList.add('img-fluid');   //resultImg의 사진크기 조절
  imgDiv.appendChild(resultImg);          //imgDiv에 연결

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

//작동원리: 질문 별 해당하는 동물이 있고, 질문이 끝난 후 가장 많이 선택된 동물이 배정
