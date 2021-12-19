from bs4 import BeautifulSoup  # 网页解析 获取数据
import re  # 正则表达式 文字匹配
import urllib.request
import urllib.error  # 制定url 获取网页数据
# 下面的处理（到time.sleep()那）是 遇到了远程主机强制关闭现有链接的问题
# 处理方案参考 "https://cloud.tencent.com/developer/article/1699598"
import socket
import time

timeout = 20
socket.setdefaulttimeout(timeout)  # 这里对整个socket层设置超时时间。后续文件中如果再使用到socket，不必再设置
sleep_download_time = 20
time.sleep(sleep_download_time)  # 这里时间自己设定

standardattr = ['名字', '图片']  # 只爬取名字和图片

findName = re.compile(r'title="(.*?)">')
findPureName = re.compile(r'title=".*?">(.*?)</a>')
findlink = re.compile(r'href="(.*?)"')
findpic = re.compile(r'src="(.*?\.jpg)"')


def main():
    baseurl = "https://zh.wikipedia.org/wiki/%E4%B8%AD%E8%8D%89%E8%8D%AF%E5%88%97%E8%A1%A8"
    dictresult = getData(baseurl)
    for item in dictresult:
        print(item)
    print(len(dictresult))


def getData(baseurl):
    html = askURL(baseurl)
    soup = BeautifulSoup(html, "html.parser")
    # allcontent = soup.find_all('div')  # allcontent是一个列表 列表里每个元素还是tag
    # print(allcontent)
    # print(len(allcontent))
    dictlist = []
    allcontent = soup.find_all('a', href=True, title=True)
    for item in allcontent[5:1200]:  # [5:1212] 实际爬得的图片要远小于这个区间长度 5：200 有 56张
        # print(item)
        data = []
        item = str(item)

        name = re.findall(findName, item)[0]
        pureName = re.findall(findPureName, item)[0]
        # print(name, pureName)

        if pureName == name:  # 过滤掉比如 编辑章节：B 编辑 这种
            detail = re.findall(findlink, item)[0]
            detail = "https://zh.wikipedia.org" + detail
            picture = getPicture(detail)
            if picture != "":  # 只有不是空串才处理
                picture = "https:" + picture
            # print(picture)
            # print()
        else:
            picture = ""

        if name.find("*") < 0 and name.find("编辑") < 0 and picture != "":
            data.append(pureName)
            data.append(picture)
            eachdict = dict(zip(standardattr, data))
            dictlist.append(eachdict)
    return dictlist


def getPicture(url):  # 链接是详情页面的链接
    html = askURL(url)
    soup = BeautifulSoup(html, "html.parser")
    picturetag = soup.find_all('img', alt=True, src=True, width=True)
    # for item in picturetag:
    #     print(item)
    picture = str(picturetag[1])
    if len(re.findall(findpic, picture)) > 0:  # 搜不到就返回空字符串
        link = re.findall(findpic, picture)[0]
    else:
        link = ""
    # print(link)
    # print()
    return link


def askURL(url):
    head = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/95.0.4638.69 Safari/537.36 ",
    }
    request = urllib.request.Request(url=url, headers=head)
    response = urllib.request.urlopen(request)
    html = response.read().decode("utf-8", errors='ignore')
    # print(html)
    return html


if __name__ == "__main__":
    main()
