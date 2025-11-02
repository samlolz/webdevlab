# basic_api/models.py
from django.db import models

# List rating choices
Grade = [
    ('excellent', 'Excellent'),  # Changed: value harus string untuk choices
    ('average', 'Average'),
    ('bad', 'Bad')
]

class DRFPost(models.Model):
    name = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    uploaded = models.DateTimeField(auto_now_add=True)
    rating = models.CharField(choices=Grade, default='average', max_length=50)
    
    # NEW: Field untuk upload cover buku
    cover = models.ImageField(
        upload_to='book_covers/',  # Folder penyimpanan
        null=True,                  # Boleh kosong
        blank=True,                 # Opsional di form
        help_text='Upload cover buku (JPG, PNG, max 5MB)'
    )

    class Meta:
        ordering = ['-uploaded']  # Changed: sort terbaru dulu (descending)

    def __str__(self):
        return self.name