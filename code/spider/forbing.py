import requests
from bs4 import BeautifulSoup

rawurl = "https://cn.bing.com/search?q="
keyword = input()
url= rawurl + keyword

strhtml = requests.get(url)
# print(strhtml.text)
soup = BeautifulSoup(strhtml.text,'lxml')
data = soup.find_all(name='li',attrs={"class":"b_algo"})
for item in data:
    string = str(item)
    print(string)
    hrefindex = string.find('href')
    targetindex = string.find('target')
    hindex = string.find('h=')
    startindex = endindex = hrefindex 
    if hindex>targetindex:
        endindex = hindex
    else:
        endindex = targetindex
    
    link = string[startindex+6:endindex-2]
    print(link)
    


