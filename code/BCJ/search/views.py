from django.shortcuts import render
from elasticsearch_dsl.search import MultiSearch
from .models import Herbs
from .herbspide import main
from django.http import HttpResponse
import json
from .documents import HerbsDocument
from django.core import serializers
from django.core.serializers.json import DjangoJSONEncoder
# Create your views here.
# def search_test(keyword):
#     return "success: "+keyword
def search(request):
    data = json.loads(request.body)
    keyword = data['Keyword']
    s = HerbsDocument.search().query("match",Name=keyword)
    qs = s.to_queryset()
    herblist = []
    for herb in qs:
        herbs = {}
        herbs['title']=herb.Name
        herbs['url']=herb.Picture_url
        herbs['abstract']=herb.Herb_info
        # herbs['Medical_function']=herb.Medical_function
        herblist.append(herbs)
    s = HerbsDocument.search().query("match",Medicalfunction=keyword)
    qs = s.to_queryset()
    for herb in qs:
        herbs = {}
        herbs['title']=herb.Name
        herbs['url']=herb.Picture_url
        herbs['abstract']=herb.Herb_info
        # herbs['Medical_function']=herb.Medical_function
        herblist.append(herbs)
    # return HttpResponse(herblist)
    # data = serializers.serialize('python',qs)
    res = {
        'data': herblist
    }
    return HttpResponse(json.dumps(res,cls=DjangoJSONEncoder),content_type = 'application/json')
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