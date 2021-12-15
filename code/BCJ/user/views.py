from django.shortcuts import render
from django.http import HttpResponse
from django.core.mail import send_mail
from threading import Thread     # 导入线程模块
from BCJ import settings
import json
import uuid
import random
import datetime

from . import models
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

    email_title = "找回密码"
    code = random_str()             #随机生成的验证码
    IdentifyingCode = models.IdentifyingCode.objects.create(Code=code)
    IdentifyingCode.User.add(user)
    email_body = "验证码为: {0}".format(code)
    t1 = Thread( target = send_mail, args = (email_body, settings.EMAIL_HOST_USER,[Email]) ) 
    t1.start()

    return HttpResponse("验证码已发送，请查收邮件")


def Verifycode(request):
    data = json.loads(request.body)
    Email = data['Email']
    Newpassword =data['Newpassword']
    user = models.User.objects.filter(Email=data['Email']).first()
    user_code = list(models.IdentifyingCode.objects.filter(User=user))
    if user_code:
        now_time = datetime.datetime.now()
        code = data['Code']                     #获取传递过来的验证码
        for item in user_code:
            if (now_time-item.Time).seconds > 120 and code == item.Code:
                user.Password = Newpassword
                msg = "密码已重置"
            item.delete()
        if msg != "密码已重置":
            msg = "验证码已过期，请重新获取"
        return HttpResponse(msg)   
    else:
        return HttpResponse("邮箱错误")
    