from django.shortcuts import render
from .models import Herbs
from herbspide import main
from django.http import HttpResponse
# Create your views here.
def addherbs(request):
    result = main()
    i=0
    for herb in result:
        oneherb = Herbs(Detail_page=herb[0],
                        Picture_url=herb[1],
                        Name=herb[2],
                        SubName=herb[3],
                        English_name=herb[4],
                        Medical_part=herb[5],
                        Plant_pose=herb[6],
                        Produce_place=herb[7],
                        Pick_reproduce=herb[8],
                        Herb_info=herb[9],
                        Taste=herb[10],
                        Function=herb[11],
                        Medical_function=herb[12],
                        Medical_search=herb[13],
                        Chemistry_component=herb[14],
                        Taboo=herb[15],
                        )
        oneherb.save()
        print(i)
        i = i+1
    return HttpResponse("yes!")