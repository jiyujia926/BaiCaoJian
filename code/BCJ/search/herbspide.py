from bs4 import BeautifulSoup  # 网页解析 获取数据
import re  # 正则表达式 文字匹配
import urllib.request
import urllib.error  # 制定url 获取网页数据

# 返回了两个值 一个titlelist 一个datalist 存在result里 上面是下面数据每一项的含义的解释 比如下面有一个链接 上面就说这个链接是详情页面的链接 是一一对应的
# titlelist和datalist 都是列表嵌套列表 里面每一个列表是一个页面的值

def main():
    baseurl1 = 'http://www.zhongyoo.com/name/page_'
    baseurl2 = '.html'
    print("get start")
    result = getdata(baseurl1, baseurl2)
    # print(result[0])
    # print(len(result))
    # print(result[-1])
    print("get result")
    return result

findjpg = re.compile(r'src="(.*?)"')
finddetaillink = re.compile(r'<strong><a class="title" href="(.*?)"')

findtitle = re.compile(r'<strong>(.*?)</strong>')
finddetailcontent = re.compile(r'[\u4e00-\u9fa5]</strong>】(.*?)</p>')


def getdata(baseurl1, baseurl2):
    titlelist = []
    datalist = []
    for i in range(0, 45):    # 控制页面 这里只显示第一页 要爬取全部修改为range(0, 44)
        url = baseurl1 + str(i + 1) + baseurl2
        html = askURL(url)
        # print(html)

        soup = BeautifulSoup(html, "html.parser")
        allcontent = soup.find_all(class_="sp")
        for item in allcontent:   # 这个是示例 只显示每页的第一个中草药的情况 要爬取全部要修改此处为 allcontent
            # print(item)
            data = []
            title = []
            item = str(item)

            detaillink = re.findall(finddetaillink, item)[0]
            data.append(detaillink)

            jpg = re.findall(findjpg, item)[0]
            data.append(jpg)

            detailcontent = detail(detaillink)
            data.extend(detailcontent[0])
            title.extend(detailcontent[1])

            appendtitle = ['详情页面', '图像链接']
            appendtitle.extend(title)
            title = appendtitle
            # print(title)    # 这两行可以边爬取边看结果 爬的好像有点慢...
            # print(data)

            datalist.append(data)
            # titlelist.append(title)

    return  datalist


def detail(detaillink):
    detailhtml = askURL(detaillink)
    detailsoup = BeautifulSoup(detailhtml, "html.parser")
    detailcontent = detailsoup.find_all(class_="text")
    detailitem = detailcontent[1]
    detaildata = []
    detailtitle = []
    detailitem = str(detailitem)

    detailcontentlist = re.findall(finddetailcontent, detailitem)[0:]
    length = len(detailcontentlist)

    for i in range(0, length-1):
        eachitem = detailcontentlist[i]
        eachitem = eachitem = re.sub(r'<(.*?)>', "", eachitem)
        detaildata.append(eachitem)

    detailtitlelist = re.findall(findtitle, detailitem)[0:14]
    for eachitem in detailtitlelist:
        detailtitle.append(eachitem)

    return detaildata, detailtitle


def askURL(url):
    head = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                       "Chrome/95.0.4638.69 Safari/537.36 ",
    }
    request = urllib.request.Request(url=url, headers=head)
    response = urllib.request.urlopen(request)
    html = response.read().decode("gbk",errors='ignore')
    # print(html)
    return html


if __name__ == "__main__":
    main()
