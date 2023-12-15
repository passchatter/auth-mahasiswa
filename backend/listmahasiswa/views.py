from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import listMahasiswa
from .serializers import mahasiswaSerializers

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mahasiswa_list(request):
    current_user = request.user
    mahasiswa = listMahasiswa.objects.filter(user=current_user)
    serializer = mahasiswaSerializers(mahasiswa, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def detail_mahasiswa(request, pk):
    current_user = request.user
    
    try:
        # Mendapatkan objek Mahasiswa berdasarkan ID dan user yang terkait
        mahasiswa = listMahasiswa.objects.get(id=pk, user=current_user)
    except listMahasiswa.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Serialisasi data mahasiswa
    serializer = mahasiswaSerializers(mahasiswa)
    
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_mahasiswa(request):
    current_user = request.user

    # Mendapatkan data dari permintaan POST
    data = request.data

    # Menambahkan nilai user berdasarkan pengguna yang saat ini masuk
    data['user'] = current_user.id

    # Membuat instance baru dari model listMahasiswa
    serializer = mahasiswaSerializers(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT', 'PATCH'])
@permission_classes([IsAuthenticated])
def update_mahasiswa(request, pk):
    current_user = request.user

    try:
        # Mencari objek mahasiswa berdasarkan ID
        mahasiswa = listMahasiswa.objects.get(id=pk, user=current_user)
    except listMahasiswa.DoesNotExist:
        return Response(data={"message": "Mahasiswa tidak ditemukan"}, status=status.HTTP_404_NOT_FOUND)

    # Mendapatkan data dari permintaan
    data = request.data

    # Memperbarui instance yang ada dengan data baru
    serializer = mahasiswaSerializers(mahasiswa, data=data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_mahasiswa(request, pk):
    current_user = request.user
    
    try:
        # Mendapatkan objek Mahasiswa yang ingin dihapus
        mahasiswa = listMahasiswa.objects.get(id=pk, user=current_user)
    except listMahasiswa.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Hapus Mahasiswa
    mahasiswa.delete()
    
    return Response(status=status.HTTP_204_NO_CONTENT)
