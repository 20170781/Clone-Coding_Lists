const main = document.querySelector("#main");   //변수 선언(const: 상수로서 1개만 선언)
const qna = document.querySelector("#qna");     //querySelector로 선택된 main 선택

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
  }, 450);
}
