import requests
from bs4 import BeautifulSoup

# if don't use headers, it can only get data shown on the 1st page
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:81.0) Gecko/20100101 Firefox/81.0',
				'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
				'Accept-Language': 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2',
				'Accept-Encoding': 'gzip, deflate',
				'Cookie': 'BAIDUID=1A6EF88EE4929836C761FB37A1303522:FG=1; BIDUPSID=1A6EF88EE4929836C761FB37A1303522; PSTM=1603199415; H_PS_PSSID=32755_1459_32877_7567_31253_32706_32231_7517_32117_32845_32761_26350; BD_UPN=13314752; BDORZ=B490B5EBF6F3CD402E515D22BCDA1598; delPer=0; BD_CK_SAM=1; PSINO=5; H_PS_645EC=e4bcE4275G3zWcvH2pxYG6R32rBxb5yuey8xcioaej8V7IaJRfEq4xp4iCo; COOKIE_SESSION=45294_0_2_5_0_2_0_1_0_2_3_0_0_0_0_0_0_0_1603244844%7C5%230_0_1603244844%7C1; BA_HECTOR=2gal2h2ga58025f1vs1fov5vf0k'}

def getHtml(url, keyword, page):
    try:
        params= {"q": keyword, "first": str(page * 10 - 1), 'FORM': 'PERE'}
        strhtml = requests.get(url=url, headers=headers, params=params)
        print('爬取成功')
        return strhtml.text
    except:
        print('爬取失败')
        return ""

def parseHtml(result, doc):
    if doc:
        soup = BeautifulSoup(doc, 'lxml')
        data = soup.find_all(name='li', attrs={"class": "b_algo"})
        for item in data:
            a_elements = item.find_all('a')
            title = a_elements[1].text  # get title
            url = a_elements[1]['href'] # get link
            p_element = item.find('p')
            abstract = p_element.text.replace('\u2002', '').replace('\n', '').replace('\t', '').replace('\r', '')
            info = {'Title': title, 'Url': url, 'Abstract': abstract}
            result.append(info)

def printResult(result):
    for item in result:
        print(item)

def main(keyword:str):
    rawurl = "http://cn.bing.com/search?"
    # keyword = input("Please enter keyword: ")
    result = []
    # changing the number in range can edit page number
    for page in range(1,2):
        doc = getHtml(rawurl, keyword, page)
        parseHtml(result, doc)
    # printResult(result)
    return result

if __name__ == "__main__":
    main("胆木")
