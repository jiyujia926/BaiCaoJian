from django.db import models
from django.shortcuts import render
from elasticsearch_dsl.search import MultiSearch
from .models import Herbs,Books,Frequency, Picture
from .herbspide import main as herbmain
from .bookspider import main as bookmain
from django.http import HttpResponse
import json
from .documents import HerbsDocument, PicturesDocument
from .documents import BooksDocument
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
# from .newsspider import main as newspider
# from .forbing import main as bingspider
# Create your views here.
# def search_test(keyword):
#     return "success: "+keyword
def search(request):
    data = json.loads(request.body)
    keyword = data['Keyword']
    # keyword = "肾亏"
    print(keyword)
    frequency = Frequency.objects.filter(key=keyword).first()
    # print(frequency)
    if frequency:
        frequency.value = frequency.value+1
        frequency.save()
    else:
        frequency = Frequency.objects.create(key=keyword,value=1)
    s = HerbsDocument.search().query("match",Name=keyword)
    qs = s.to_queryset()
    herblist = []
    booklist = []
    picturelist = []
    newslist = []
    binglist = []
    for herb in qs:
        herbs = {}
        herbs['id']=herb.Herb_id
        herbs['title']=herb.Name
        herbs['url']=herb.Picture_url
        herbs['abstract']=herb.Herb_info
        herbs['Medical_function']=herb.Medical_function
        herblist.append(herbs)
    s = HerbsDocument.search().query("match",Medical_function=keyword)
    qs = s.to_queryset()
    for herb in qs:
        herbs = {}
        herbs['id']=herb.Herb_id
        herbs['title']=herb.Name
        herbs['url']=herb.Picture_url
        herbs['abstract']=herb.Herb_info
        herbs['Medical_function']=herb.Medical_function
        if herbs in herblist:
            pass
        else:
            herblist.append(herbs)
    # return HttpResponse(herblist)
    # data = serializers.serialize('python',qs)
    s = BooksDocument.search().query("match",Book_name=keyword)
    qs = s.to_queryset()
    for book in qs:
        books = {}
        books['title']=book.Book_name
        books['url']=book.Picture_url
        booktag = str(book.Book_tag)
        if booktag.find("团购")>=0:
            startindex = booktag.find("团购")
            booktag=booktag[:startindex]
        books['tag']=booktag
        books['info']=book.Book_info
        books['author']=book.Book_author
        books['publishdate']=book.Book_publishdate
        books['publish']=book.Book_publish
        if books in booklist:
            pass
        else:
            booklist.append(books)
    s = BooksDocument.search().query("match",Book_tag=keyword)
    qs = s.to_queryset()
    for book in qs:
        books = {}
        books['title']=book.Book_name
        books['url']=book.Picture_url
        booktag = str(book.Book_tag)
        if booktag.find("团购")>=0:
            startindex = booktag.find("团购")
            booktag=booktag[:startindex]
        books['tag']=booktag
        books['info']=book.Book_info
        books['author']=book.Book_author
        books['publishdate']=book.Book_publishdate
        books['publish']=book.Book_publish
        if books in booklist:
            pass
        else:
            booklist.append(books)
    s = PicturesDocument.search().query("match",Name=keyword)
    qs = s.to_queryset()
    for pic in qs:
        picture = {}
        picture['name']=pic.Name
        picture['url']=pic.Url
        if picture in picturelist:
            pass
        else:
            picturelist.append(picture)
    # newsresult = newspider(keyword)
    # binglist = bingspider(keyword)
    print(len(herblist))
    print(len(booklist))
    print(len(picturelist))
    # print(len(newsresult))
    # print(len(binglist))
    res = {
        'citiao': herblist,
        'shuben': booklist,
        'tupian': picturelist,
        # 'xinwen': newsresult,
        # 'bing': binglist
    }
    return HttpResponse(json.dumps(res))

def mostsearching(request):
    frequencylist = list(Frequency.objects.values('key','value').order_by('-value'))
    length=len(frequencylist)
    if len(frequencylist) > 10:
        length = 10
    result=[]
    for item in frequencylist:
        result.append(item)
    print(result)
    return HttpResponse(json.dumps(result[:length]))

def cloud(request):
    frequencylist = list(Frequency.objects.values('key','value').order_by('-value'))
    length=len(frequencylist)
    result=[]
    for item in frequencylist:
        result.append(item)
    print(result)
    return HttpResponse(json.dumps(result))

# def addbooks(request):
#     result = bookmain()
#     i=1
#     for book in result:
#         book1 = Books(Book_id = i,Book_name=book['书名'],Picture_url=book['图片链接'],Book_tag=book['标签'],Book_info=book['简介'],Book_author=book['作者'],Book_publishdate=book['日期'],Book_publish=book['出版社'])
#         book1.save()
#         print(i)
#         i  = i+1
#     return HttpResponse("yes!")
# def addherbs(request):
#     result = main()
#     i=1
#     for herb in result:
#         rawherb = {
#                     'Herb_id' :i,                
#                     'Detail_page':'',
#                     'Picture_url':'',
#                     'Name':'',
#                     'Subname':'',
#                     'English_name':'',
#                     'Medical_part':'',
#                     'Plant_pose':'',
#                     'Produce_place':'',
#                     'Pick_reproduce':'',
#                     'Herb_info':'',
#                     'Taste':'',
#                     'Function':'',
#                     'Medical_function':'',
#                     'Medical_search':'',
#                     'Chemistry_component':'',
#                     'Taboo':'',
#         }
#         if '详情页面' in herb.keys():
#             rawherb['Detail_page'] = herb['详情页面']
#         if '图像链接' in herb.keys():
#             rawherb['Picture_url'] = herb['图像链接']
#         if '中药名' in herb.keys():
#             rawherb['Name'] = herb['中药名']
#         if '别名' in herb.keys():
#             rawherb['Subname'] = herb['别名']
#         if '英文名' in herb.keys():
#             rawherb['English_name'] = herb['英文名']
#         if '药用部位' in herb.keys():
#             rawherb['Medical_part'] = herb['药用部位']
#         if '植物形态' in herb.keys():
#             rawherb['Plant_pose'] = herb['植物形态']
#         if '产地分布' in herb.keys():
#             rawherb['Produce_place'] = herb['产地分布']
#         if '采收加工' in herb.keys():
#             rawherb['Pick_reproduce'] = herb['采收加工']
#         if '药材性状' in herb.keys():
#             rawherb['Herb_info'] = herb['药材性状']
#         if '性味归经' in herb.keys():
#             rawherb['Taste'] = herb['性味归经']
#         if '功效与作用' in herb.keys():
#             rawherb['Function'] = herb['功效与作用']
#         if '临床应用' in herb.keys():
#             rawherb['Medical_function'] = herb['临床应用']
#         if '药理研究' in herb.keys():
#             rawherb['Medical_search'] = herb['药理研究']
#         if '化学成分' in herb.keys():
#             rawherb['Chemistry_component'] = herb['化学成分']
#         if '使用禁忌' in herb.keys():
#             rawherb['Taboo'] = herb['使用禁忌']
#         oneherb = Herbs(**rawherb)
#         oneherb.save()
#         print(i)
#         i = i+1
#     return HttpResponse("yes!")

# def addpictures(request):
#     i = 1
#     for picture in picturelist:
#         pic = Picture.objects.create(Name=picture['name'],Url=picture['url'])
#         pic.save()
#         print(i)
#         i += 1
        
#     return HttpResponse("add")