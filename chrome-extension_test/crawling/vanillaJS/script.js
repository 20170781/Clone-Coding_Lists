const inputBox = document.getElementById('user'); // 입력 태그

inputBox.addEventListener('change', async () => {
  const resultBox = document.getElementById('result'); // 결과가 들어가는 태그

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  let userWords = inputBox.value; // 입력값

  // storage에 입력값 추가
  // chrome.storage.sync.set({
  //   userWords,
  // });

  // 웹페이지에서 실행하는 api
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: getCountWords, // 콜백 함수 getCountWords
      args: [userWords],
    },
    (resultArr) => {
      // 콜백 함수 실행 결과를 인수로 받음 (객체 형태)
      console.log(resultArr);
      resultBox.innerText = `counts: ${resultArr[0].result}`;
    }
  );
});

// 콜백 함수
getCountWords = (userWords) => {
  let bodyText = document.body.innerText;
  let wordCounts =
    bodyText.match(
      new RegExp(`\\b${userWords}\\b`, 'gi') // 전처리
    )?.length ?? 0;

  return wordCounts;
};
