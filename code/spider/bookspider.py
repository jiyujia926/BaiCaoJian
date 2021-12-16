from bs4 import BeautifulSoup  # 网页解析 获取数据
import re  # 正则表达式 文字匹配
import urllib.request
import urllib.error  # 制定url 获取网页数据
import operator
# 下面的处理（到time.sleep()那）是 遇到了远程主机强制关闭现有链接的问题
# 处理方案参考 "https://cloud.tencent.com/developer/article/1699598"
import socket
import time

timeout = 20
socket.setdefaulttimeout(timeout)  # 这里对整个socket层设置超时时间。后续文件中如果再使用到socket，不必再设置
sleep_download_time = 10
time.sleep(sleep_download_time)  # 这里时间自己设定

# 爬取以下数据 并返回一个列表嵌套的字典 每个字典代表一本书 要修改爬取的页面数 要在getData函数和dataProcess函数都要改i的值
standardattr = ['书名', '图片链接', '标签', '简介', '作者', '日期', '出版社']

findname = re.compile(r'title=" (.*?)"><img alt="')
findjpg1 = re.compile(r'<img alt=.*?src="(.*?)"')
findjpg2 = re.compile(r'data-original="(.*?)"')
findtitle = re.compile(r'title=" (.*?)">')
findsummary = re.compile(r'<p class="detail">(.*?)</p>')
findauthor = re.compile(r'title="(.*?)">')
finddate = re.compile(r'<span> /(.*?)</span>')
findpublic = re.compile(r'title="(.*?)">')


def main():
    baseUrl = 'https://search.dangdang.com/?key=%D6%D0%D2%A9&act=input&page_index='
    tempresult = getData(baseUrl)
    # for item in tempresult:
    #     print(item)
    listresult = dataProcess(tempresult[0], tempresult[1], tempresult[2], tempresult[3], tempresult[4], tempresult[5], tempresult[6])
    # print(listresult)
    # print(len(listresult))
    # for item in listresult:
    #     length = len(item)
    #     if length != 7:
    #         print('False')
    #         break
    #     print(item)
    dictresult = combineListToDict(listresult)  # 返回的是一个列表里嵌套字典，每个字典代表一本书
    for item in dictresult:
        length = len(item)
        if length != 7:
            print('False')
            break
        print(item)
    print(len(dictresult))


def getData(baseurl):
    nameList = []
    jpgList = []
    titleList = []
    summaryList = []
    authorList = []
    dateList = []
    publicList = []

    for i in range(0, 10):  # 页面数 这里到第10页肯定是没问题的 一共600本书肯定够用了
        url = baseurl + str(i + 1)
        html = askURL(url)
        # print(html)

        soup = BeautifulSoup(html, "html.parser")
        # print(soup)
        # print(soup)
        # allcontent = soup.find_all(id="search_nature_rg")
        # print(allcontent[0])
        nameContent = soup.find_all('a', class_="pic")
        # for item in nameContent:
        #     print(item)
        name = getSpecifyData(nameContent, findname)
        # print(name)
        # print(len(name))
        jpgContent = soup.find_all('a', class_="pic")
        # for item in jpgContent:
        #     print(item)
        jpg = []
        for j in range(0, 60):
            temp = str(jpgContent[j])
            if j == 0:
                tempjpg = re.findall(findjpg1, temp)[0]
            else:
                tempjpg = re.findall(findjpg2, temp)[0]
            tempjpg = "https:" + tempjpg
            jpg.append(tempjpg)
        # print(jpg)
        # print(len(jpg))
        titleContent = soup.find_all('p', class_="name")
        # for item in titleContent:
        #     print(item)
        title = getSpecifyData(titleContent, findtitle)
        # print(title)
        # print(len(title))
        summaryContent = soup.find_all('p', class_="detail")
        # for item in summaryContent:
        #     print(item)
        summary = getSpecifyData(summaryContent, findsummary)
        # print(summary)
        # print(len(summary))
        authorContent = soup.find_all('p', class_="search_book_author")
        # for item in authorContent:
        #     print(item)
        author = getSpecifyData(authorContent, findauthor)
        # print(author)
        # print(len(author))
        dateContent = soup.find_all('p', class_="search_book_author")
        # for item in dateContent:
        #     print(item)
        # temp = str(dateContent[0])
        date = []
        for temp in dateContent:
            temp = str(temp)
            if len(re.findall(finddate, temp)) > 0:
                tempdate = re.findall(finddate, temp)[0]
            else:
                tempdate = ''
            date.append(tempdate)
        # print(date)
        # print(len(date))
        # date = getSpecifyData(dateContent, finddate)
        # print(date)
        # print(len(date))
        publicContent = soup.find_all(dd_name="单品出版社")
        # for item in publicContent:
        #     print(item)
        public = getSpecifyData(publicContent, findpublic)
        # print(public)
        # print(len(public))

        nameList.append(name)
        jpgList.append(jpg)
        titleList.append(title)
        summaryList.append(summary)
        authorList.append(author)
        publicList.append(public)
        dateList.append(date)

    return nameList, jpgList, titleList, summaryList, authorList, dateList, publicList


def getSpecifyData(specifylist, regex):
    result = []
    for item in specifylist:
        item = str(item)
        tempResult = re.findall(regex, item)[0]
        result.append(tempResult)

    return result


def dataProcess(list1, list2, list3, list4, list5, list6, list7):
    allBooklist = []
    for i in range(0, 10):  # 页面数 必须从0开始 即上面有多少页这里就是(0, 页面数)
        for j in range(0, 60):
            templist = [list1[i][j], list2[i][j], list3[i][j], list4[i][j], list5[i][j], list6[i][j], list7[i][j]]
            allBooklist.append(templist)

    return allBooklist


def combineListToDict(listinlist):
    dictresult = []
    for eachlist in listinlist:
        eachdict = dict(zip(standardattr, eachlist))
        dictresult.append(eachdict)
    return dictresult


def askURL(url):
    head = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) "
                      "Chrome/95.0.4638.69 Safari/537.36 ",
    }
    request = urllib.request.Request(url=url, headers=head)
    response = urllib.request.urlopen(request)
    html = response.read().decode("gb2312", errors='ignore')
    response.close()
    # print(html)
    return html


if __name__ == "__main__":
    main()
