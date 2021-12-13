from django.conf import settings
from django.db import models
from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
from .models import Herbs

@registry.register_document
class HerbsDocument(Document):
    class Index:
        name = "herbs"
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}
    
    class Django:
        model = Herbs
        
        fields = [
            "Herb_id",
            "Detail_page", 
            "Picture_url" ,
            "Name" ,
            "Subname" ,
            "English_name", 
            "Medical_part" ,
            "Plant_pose" ,
            "Produce_place", 
            "Pick_reproduce", 
            "Herb_info" ,
            "Taste" ,
            "Function",
            "Medical_function", 
            "Medical_search" ,
            "Chemistry_component", 
            "Taboo"
        ]