from django.db import models
from django.conf import settings

class listMahasiswa(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=200)
    nim = models.IntegerField()
    alamat = models.CharField(max_length=200)
    prody = models.CharField(max_length=200)
    jurusan = models.CharField(max_length=200)

    def __str__(self):
        return self.name