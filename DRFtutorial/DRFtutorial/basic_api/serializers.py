from rest_framework import serializers
from .models import DRFPost

class DRFPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = DRFPost
        fields = ['id', 'name', 'author', 'rating', 'uploaded', 'cover']  
        read_only_fields = ['id', 'uploaded']