"""BCJ URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.core.serializers.json import Serializer
from django.urls import path

from user import views as user_view
from search import views as search_view

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('add/',search_view.addherbs),
    path('register/',user_view.register),
    path('login/',user_view.login),
    path('getusername/',user_view.getusername),
    path('search/', search_view.search),
    path('modifypassword/',user_view.modifyPassword),
    path('find_pwd/', user_view.findPassword),
    path('verify_code/', user_view.Verifycode),
    path('addfavor/',user_view.addFavor),
    path('checkfavor/',user_view.checkFavor),
    path('returnfavor/',user_view.returnFavor),
    path('deletefavor/',user_view.deleteFavor),
    path('mostsearching/',search_view.mostsearching),
    path('cloud/',search_view.cloud),
    path('detailpage/',search_view.detailpage),
    path('addnewsandbing/',search_view.addnewsandbings)
    # path('addbooks/',search_view.addbooks),
    # path('addpictures/',search_view.addpictures)
]
