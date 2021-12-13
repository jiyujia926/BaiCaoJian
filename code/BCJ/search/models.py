from django.db import models

# Create your models here.
class Herbs(models.Model):
    # ['详情页面', '图像链接', '中药名', '别名', '英文名', '药用部位', '植物形态', '产地分布', '采收加工', '药材性状', '性 
# 味归经', '功效与作用', '临床应用', '药理研究', '化学成分', '使用禁忌']
    Herb_id = models.IntegerField(primary_key=True)
    Detail_page = models.CharField(max_length=256)
    Picture_url = models.CharField(max_length=256)
    Name = models.CharField(max_length=256)
    Subname = models.CharField(max_length=256)
    English_name = models.CharField(max_length=256)
    Medical_part = models.CharField(max_length=256)
    Plant_pose = models.CharField(max_length=256)
    Produce_place = models.CharField(max_length=256)
    Pick_reproduce = models.CharField(max_length=256)
    Herb_info = models.CharField(max_length=256)
    Taste = models.CharField(max_length=256)
    Function = models.CharField(max_length=256)
    Medical_function = models.CharField(max_length=256)
    Medical_search = models.CharField(max_length=256)
    Chemistry_component = models.CharField(max_length=256)
    Taboo = models.CharField(max_length=256)