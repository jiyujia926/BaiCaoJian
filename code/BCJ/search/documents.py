from django.conf import settings
from django.db import models
from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from .models import Herbs
from .models import Books
from .models import Picture
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

@registry.register_document
class BooksDocument(Document):
    class Index:
        name = "books"
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}
    class Django:
        model = Books
        
        fields = [
           'Book_id',
           'Book_name',
           'Picture_url',
           'Book_tag',
           'Book_info',
           'Book_author',
           'Book_publishdate',
           'Book_publish'
        ]

@registry.register_document
class PicturesDocument(Document):
    class Index:
        name = "pictures"
        settings = {'number_of_shards': 1,
                    'number_of_replicas': 0}
    class Django:
        model = Picture
        
        fields = [
            'Name',
            'Url'
        ]