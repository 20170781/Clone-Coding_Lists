import requests    # url 불러오기
from bs4 import BeautifulSoup    # html에서 정보추출
import sys

# medium:  "https://codesquad-yoda.medium.com/%EC%9B%B9-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%A4%80%EB%B9%84%ED%95%B4%EC%95%BC-%ED%95%A0%EA%B9%8C-5ac7bb6ff2a9"
# naver blog: "https://blog.naver.com/seangh9604/222533158860"
# naver cafe: "https://cafe.naver.com/zzang9daddy/756954"
# tstory: "https://alex1107.tistory.com/entry/Web-Storage-API"

URL = "https://codesquad-yoda.medium.com/%EC%9B%B9-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%A4%80%EB%B9%84%ED%95%B4%EC%95%BC-%ED%95%A0%EA%B9%8C-5ac7bb6ff2a9"

def crawl(url):
    result = requests.get(url)  # URL의 HTML 가져오기
    soup = BeautifulSoup(result.text, "html.parser")    # html, BeautifulSoup에서 인식가능하게
    body = soup.find(name="body")                       # body 태그
    print(body.get_text())                              # 텍스트 출력


# 네이버 블로그의 경우
def delete_iframe_naverBlog(url):
    result = requests.get(url)
    soup = BeautifulSoup(result.text, "html.parser")

    src_url = "https://blog.naver.com/" + soup.iframe["src"]
    
    return src_url

crawl(delete_iframe_naverBlog(URL))    # 네이버 블로그

crawl(URL)  # 일반

if __name__ == '__main__':
    crawl(sys.argv)