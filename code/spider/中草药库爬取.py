from bs4 import BeautifulSoup  # 网页解析 获取数据
import re  # 正则表达式 文字匹配
import urllib.request
import urllib.error  # 制定url 获取网页数据
import operator

# 返回了两个值 一个titlelist 一个datalist 存在result里 上面是下面数据每一项的含义的解释 比如下面有一个链接 上面就说这个链接是详情页面的链接 是一一对应的
# titlelist和datalist 都是列表嵌套列表 里面每一个列表是一个页面的值
standardtitle = ['详情页面', '图像链接', '中药名', '别名', '英文名', '药用部位', '植物形态', '产地分布', '采收加工', '药材性状', '性味归经', '功效与作用', '临床应用',
                 '药理研究', '化学成分', '使用禁忌']


def main():
    baseurl1 = 'http://www.zhongyoo.com/name/page_'
    baseurl2 = '.html'
    result = getData(baseurl1, baseurl2)

    # for eachdata in result:
    #     print(eachdata)
    #     for eachdatadata in eachdata:
    #         print(eachdatadata)


findjpg = re.compile(r'src="(.*?)"')
finddetaillink = re.compile(r'<strong><a class="title" href="(.*?)"')

findtitle = re.compile(r'【<strong>(.*?)</strong>】')
finddetailcontent = re.compile(r'【<strong>.*</strong>】(.*?)</p>')


def getData(baseurl1, baseurl2):
    titlelist = []
    datalist = []
    dictlist = []
    for i in range(0, 5):  # 控制页面 这里只显示第一页 要爬取全部修改为range(0, 44)
        url = baseurl1 + str(i + 1) + baseurl2
        html = askURL(url)
        # print(html)

        soup = BeautifulSoup(html, "html.parser")
        allcontent = soup.find_all(class_="sp")
        for item in allcontent:  # 这个是示例 只显示每页的第一个中草药的情况 要爬取全部要修改此处为 allcontent
            # print(item)
            data = []
            title = []
            item = str(item)

            detaillink = re.findall(finddetaillink, item)[0]
            data.append(detaillink)

            jpg = re.findall(findjpg, item)[0]
            data.append(jpg)

            detailcontent = getDetail(detaillink)
            if detailcontent != '':
                data.extend(detailcontent[0])
                title.extend(detailcontent[1])

                appendtitle = ['详情页面', '图像链接']
                appendtitle.extend(title)
                title = appendtitle
                if operator.eq(title, standardtitle) and len(title) == 16 and len(data) == 16:
                    # print(title)  # 这两行可以边爬取边看结果 爬的好像有点慢...
                    # print(data)
                    print(dict(zip(standardtitle, data)))
                    dictlist.append(dict(zip(standardtitle, data)))
                    datalist.append(data)
                    titlelist.append(title)

    return dictlist


def getDetail(detaillink):
    detailhtml = askURL(detaillink)
    detailsoup = BeautifulSoup(detailhtml, "html.parser")
    detailcontent = detailsoup.find_all(class_="text")
    detailitem = detailcontent[1]  # 因为一开始有一个text的class是无关详细信息的 第二个才是需要的
    detaildata = []
    detailtitle = []
    detailitem = str(detailitem)

    detailcontentlist = re.findall(finddetailcontent, detailitem)  # 从名字到药方一共15项 取前14项
    length = len(detailcontentlist)
    if length <= 13:
        return ''

    for i in range(0, length - 1):
        eachitem = detailcontentlist[i]
        eachitem = re.sub(r'<(.*?)>', "", eachitem)
        detaildata.append(eachitem)

    detailtitlelist = re.findall(findtitle, detailitem)[0:14]  # 确定只保留14项
    for eachitem in detailtitlelist:
        eachitem = re.sub(r'<(.*?)>', "", eachitem)
        detailtitle.append(eachitem)

    for i in range(0, 14):
        if i == 2:
            if detailtitle[2] == '外语名':
                detailtitle[2] = '英文名'
            elif detailtitle[2] != '英文名':
                detailtitle.insert(2, '英文名')
                detaildata.insert(2, '')

    detailtitle = detailtitle[0:14]
    detaildata = detaildata[0:14]

    return detaildata, detailtitle


def askURL(url):
    head = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/95.0.4638.69 Safari/537.36 ",
    }
    request = urllib.request.Request(url=url, headers=head)
    response = urllib.request.urlopen(request)
    html = response.read().decode("gbk", errors='ignore')
    # print(html)
    return html


if __name__ == "__main__":
    main()
