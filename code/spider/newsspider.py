import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains  # 引入 ActionChains 类
from bs4 import BeautifulSoup  # 网页解析 获取数据
import re

'''
需要注意的事！！！！
selenium是python自带的库 pip install一下就行
chromewebdriver这个可执行文件需要跟这个爬虫放在同一级目录！！！ 我会一起上传
'''


standardtitle = ['来源', '标题', '简介', '时间', '链接']

findlink = re.compile(r'<a class="WlydOe".*?href="(.*?)".*?>')
findSourceAndTime = re.compile(r'<span>(.*?)</span>')
findTitle = re.compile(r'style="-webkit-line-clamp:3">(.*?)</div>')
findSummary = re.compile(r'style="margin-top:8px;-webkit-line-clamp:3">(.*?)</div>', re.S)


def main():
    option = webdriver.ChromeOptions()
    option.add_argument("headless")
    driver = webdriver.Chrome(executable_path='./chromedriver.exe',
                              options=option)  # chromedriver不是python自带的库 这个地方必须要有包含这个可执行文件的路径
    # driver.maximize_window()
    driver.implicitly_wait(6)
    url = 'https://www.google.com/'
    herb = '金龟子'  # 这个草药名字是需要传入的参数！！！！！
    page = browserOperation(driver, url, herb)
    result = pageProcess(page)
    for item in result:
        print(item)


def browserOperation(driver, url, herbname):
    driver.get(url)

    input_box = driver.find_element_by_name('q')
    time.sleep(1)

    input_box.send_keys(herbname)  # 这里是在输入框中输入文字 herbname 这个是需要传入的参数！！！！！！！
    time.sleep(1)
    input_box.send_keys(Keys.ENTER)
    time.sleep(1)
    left_click = driver.find_element_by_link_text('新闻')
    Auctionclick = ActionChains(driver).click(left_click)
    Auctionclick.perform()
    time.sleep(1)
    driver.refresh()
    time.sleep(2)
    html = driver.execute_script("return document.documentElement.outerHTML")  # 获取当前的html页面
    return html


def pageProcess(html):
    result = []
    source = []
    reportTime = []
    title = []
    summary = []
    soup = BeautifulSoup(html, "html.parser")
    # print(soup)
    newslist = soup.find_all(class_="ftSUBd")
    newslist = str(newslist)
    SourceAndTime = re.findall(findSourceAndTime, newslist)
    for i in range(0, 20):
        if i % 2 == 0:
            source.append(SourceAndTime[i])
        else:
            reportTime.append(SourceAndTime[i])

    link = re.findall(findlink, newslist)
    title = re.findall(findTitle, newslist)
    summary = re.findall(findSummary, newslist)
    for i in range(0, 10):
        summary[i] = re.sub('\n', '', summary[i])

    # print(source, len(source))
    # print(reportTime, len(reportTime))
    # print(link, len(link))
    # print(title, len(title))
    # print(summary, len(summary))

    dict1 = [{standardtitle[0]: item1} for item1 in source]
    dict2 = [{standardtitle[1]: item2} for item2 in title]
    dict3 = [{standardtitle[2]: item3} for item3 in summary]
    dict4 = [{standardtitle[3]: item4} for item4 in reportTime]
    dict5 = [{standardtitle[4]: item5} for item5 in link]

    for i in range(0, 10):
        tempdict = {}
        tempdict.update(dict1[i])
        tempdict.update(dict2[i])
        tempdict.update(dict3[i])
        tempdict.update(dict4[i])
        tempdict.update(dict5[i])
        result.append(tempdict)

    # for item in result:
    #     print(item)
    return result


if __name__ == "__main__":
    main()
