from django.urls import path
from . import views

urlpatterns = [
    # Path untuk mahasiswa_list
    path('mahasiswa/', views.mahasiswa_list, name='mahasiswa_list'),
    path('mahasiswa/add/', views.add_mahasiswa , name='mahasiswa_add'),
    path('mahasiswa/update/<int:pk>/', views.update_mahasiswa , name='mahasiswa_update'),
    path('mahasiswa/delete/<int:pk>/', views.delete_mahasiswa , name='mahasiswa_delete'),
    path('mahasiswa/detail/<int:pk>/', views.detail_mahasiswa , name='mahasiswa_detail'),
    # ...path lainnya
]
