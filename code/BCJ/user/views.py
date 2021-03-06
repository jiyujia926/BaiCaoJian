from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
from threading import Thread     # 导入线程模块
from BCJ import settings
import json
import uuid
import random
import datetime
import pytz

from . import models
from search import models as search_models
# Create your views here.
def register(request):
    
    data = json.loads(request.body)
    checkemail = list(models.User.objects.values('Email').filter(Email = data['Email']))
    if checkemail:
        return HttpResponse("邮箱已被注册")
    else:
        data['UID'] = uuid.uuid4()
        models.User.objects.create(**data)
        return HttpResponse("注册成功！")

def login(request):
    data = json.loads(request.body)
    logininguser = list(models.User.objects.values('Password').filter(Email=data['Email']))
    if logininguser:
        if logininguser[0]['Password'] == data['Password']:

            return HttpResponse("密码正确")
        else:
            return HttpResponse("密码错误")
    else:
        return HttpResponse("未注册")

def getusername(request):
    data = json.loads(request.body)
    loginuser = list(models.User.objects.values('Name').filter(Email = data['Email']))
    if loginuser:
        return HttpResponse(loginuser[0]['Name'])
    else:
        return HttpResponse("没这个人")

def modifyPassword(request):
    data = json.loads(request.body)
    user = list(models.User.objects.values('Password').filter(Email=data['Email']))
    if user:
        if user[0]['Password'] == data['Password']:
            models.User.objects.filter(Email=data['Email']).update(Password=data['Newpassword'])
            return HttpResponse("修改成功")
        else:
            return HttpResponse("密码错误")
    else:
        return HttpResponse("该邮箱未注册")

#随机生成验证码
def random_str(randomlength=6):
    random.random()
    str = ''
    chars = 'abcdefghijklmnopqrstuvwsyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    length = len(chars) - 1
    for i in range(randomlength):
        str += chars[random.randint(0, length)]
    return str

#发送邮件找回密码 
def findPassword(request):
    data = json.loads(request.body)
    Email = data['Email']
    user = models.User.objects.filter(Email=data['Email']).first()
    if user:
        email_title = "电子邮箱验证码"
        code = random_str()             #随机生成的验证码
        IdentifyingCode = models.IdentifyingCode.objects.create(Code=code)
        IdentifyingCode.User.add(user)
        email_body = "尊敬的百草笺用户，您好！\n您的百草笺账号正在找回密码，验证码为: {0}， 请在30分钟内输入。百草笺不会向您索取验证信息，请勿泄露。\n感谢您对百草笺的支持！".format(code)
        t1 = Thread( target = send_mail, args = (email_title, email_body, settings.EMAIL_HOST_USER,[Email]) ) 
        t1.start()
        return HttpResponse("验证码已发送，请查收邮件")
    else:
        return HttpResponse("邮箱未注册")


def Verifycode(request):
    data = json.loads(request.body)
    Email = data['Email']
    Newpassword =data['Newpassword']
    user = models.User.objects.filter(Email=data['Email']).first()
    if user:
        user_code = list(models.IdentifyingCode.objects.filter(User=user))
        if user_code:
            now_time = datetime.datetime.now()
            code = data['Checksum']                     #获取传递过来的验证码
            msg = ""
            for item in user_code:
                diff = (now_time-item.Time).seconds
                if 0 <= diff and diff < 1800 :
                    if code == item.Code:
                        user.Password = Newpassword
                        user.save()
                        msg = "设置成功"
                        item.delete()
                        print("设置成功")
                else:
                    item.delete()
            if msg == "":
                msg = "验证码错误"
            
            return HttpResponse(msg)   
        else:
            return HttpResponse("邮箱无验证码")
    else:
        return HttpResponse("邮箱未注册")
    
def addFavor(request):
    data = json.loads(request.body)
    user = models.User.objects.filter(Email=data['Email']).first()
    herb = search_models.Herbs.objects.filter(Herb_id=data['Id']).first()
    check = search_models.Favor.objects.filter(User=user,Herb=herb).first()
    if check:
        return HttpResponse("你已收藏")
    favor = search_models.Favor.objects.create()
    favor.User.add(user)
    favor.Herb.add(herb)
    return HttpResponse("收藏成功")

def returnFavor(request):
    data = json.loads(request.body)
    user = models.User.objects.filter(Email=data['Email']).first()
    herb_list = list(search_models.Favor.objects.values('Herb','Info').filter(User=user))
    list1=[]
    for item in herb_list:
        herbs={}
        herb = search_models.Herbs.objects.values().filter(Herb_id=item['Herb']).first()
        herbs['Id'] = herb['Herb_id']
        herbs['Detail_page'] = herb['Detail_page']
        herbs['Name'] = herb['Name']
        description = "别名: "+herb['Subname']+"    英文名: "+herb['English_name']+"\n药材性状: "+herb['Herb_info']+"\n性味归经: "+herb['Taste']+"\n功效与作用: "+herb['Function']+"\n使用禁忌: "+herb['Taboo']
        # herbs['Description'] = [{'key':"别名", 'info':herb['Subname']},{'key':"英文名", 'info':herb['English_name']},{'key':"药材性状", 'info':herb['Herb_info']},{'key':"性味归经", 'info':herb['Taste']},{'key':"功效与作用", 'info':herb['Function']},{'key':"使用禁忌", 'info':herb['Taboo']}]
        herbs['Description'] = description
        list1.append(herbs)
    return HttpResponse(json.dumps(list1))

def deleteFavor(request):
    data = json.loads(request.body)
    user = models.User.objects.filter(Email=data['Email']).first()
    herb = search_models.Herbs.objects.filter(Herb_id=data['Id']).first()
    favor = search_models.Favor.objects.filter(User=user,Herb=herb).first()
    if favor:
        favor.delete()
        return HttpResponse("删除成功")
    else:
        return HttpResponse("删除失败")
