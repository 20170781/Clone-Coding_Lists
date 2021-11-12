const spawn = require('child_process');

const medium =
  'https://codesquad-yoda.medium.com/%EC%9B%B9-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%A4%80%EB%B9%84%ED%95%B4%EC%95%BC-%ED%95%A0%EA%B9%8C-5ac7bb6ff2a9';
const result = spawn('python3', ['crawling.py', medium]);

result.stdout.on('data', (test) => {
  console.log(test.toString());
});
