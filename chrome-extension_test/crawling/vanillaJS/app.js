const bodyText = document.querySelector('body').innerText; // body태그 단어 추출
const bodyNum = bodyText.split(' ').length; // 단어들의 길이 반환

const userSelectWords = ['협찬', '홍보'];

const myNum = bodyText.match(new RegExp(`\\b(the|is|was|of)\\b`, 'gi')).length;
