from django.db import models
from user.models import User

# Create your models here.
class Herbs(models.Model):
    # ['详情页面', '图像链接', '中药名', '别名', '英文名', '药用部位', '植物形态', '产地分布', '采收加工', '药材性状', '性 
# 味归经', '功效与作用', '临床应用', '药理研究', '化学成分', '使用禁忌']
    Herb_id = models.IntegerField(primary_key=True)
    Detail_page = models.TextField(null=True)
    Picture_url = models.TextField(null=True)
    Name = models.TextField(null=True)
    Subname = models.TextField(null=True)
    English_name = models.TextField(null=True)
    Medical_part = models.TextField(null=True)
    Plant_pose = models.TextField(null=True)
    Produce_place = models.TextField(null=True)
    Pick_reproduce = models.TextField(null=True)
    Herb_info = models.TextField(null=True)
    Taste = models.TextField(null=True)
    Function = models.TextField(null=True)
    Medical_function = models.TextField(null=True)
    Medical_search = models.TextField(null=True)
    Chemistry_component = models.TextField(null=True)
    Taboo = models.TextField(null=True)
    
class Books(models.Model):
    Book_id = models.IntegerField(primary_key=True)
    Book_name = models.TextField(null=True)
    Picture_url = models.TextField(null=True)
    Book_tag = models.TextField(null=True)
    Book_info = models.TextField(null=True)
    Book_author = models.TextField(null=True)
    Book_publishdate = models.TextField(null=True)
    Book_publish = models.TextField(null=True)

class Favor(models.Model):
    User = models.ManyToManyField(User)
    Herb = models.ManyToManyField(Herbs)
    Info = models.TextField(null=True)

class Frequency(models.Model):
    key = models.CharField(max_length=50,primary_key=True)
    value = models.IntegerField(default=0)


class Picture(models.Model):
    Name = models.TextField()
    Url = models.TextField()

