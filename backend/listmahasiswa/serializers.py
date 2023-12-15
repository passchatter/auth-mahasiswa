from rest_framework import serializers
from .models import listMahasiswa


class mahasiswaSerializers(serializers.ModelSerializer):
    class Meta:
        model = listMahasiswa
        fields = '__all__'