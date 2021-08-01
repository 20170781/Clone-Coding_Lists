const url = 'https://lovetype-toyproject.netlify.app/';

function setShare(){
  var resultImg = document.querySelector('#resultImg');
  var resultAlt = resultImg.firstElementChild.alt;
  const shareTitle = '십이간지 연애유형 결과';
  const shareDesc = infoList[resultAlt].name;
  const shareImg = url + 'img/image-' + resultAlt + '.png';
  const shareURL = url + 'page/result-' + resultAlt + '.html';

    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: shareTitle,
        description: shareDesc,
        imageUrl: shareImg,
        link: {
          mobileWebUrl: shareURL,
          webUrl: shareURL,
        },
      },

      buttons: [
        {
          title: '결과 확인하기',
          link: {
            mobileWebUrl: shareURL,
            webUrl: shareURL,
          },
        },
      ]
    });
  }
