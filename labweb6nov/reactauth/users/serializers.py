from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import re

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password_confirmation = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'full_name', 'major', 'role', 'password', 'password_confirmation')
        extra_kwargs = {
            'password': {'write_only': True, 'style': {'input_type': 'password'}},
            'username': {'read_only': True},
            'role': {'read_only': True},
        }

    def validate_email(self, value):
        email = value.lower()

        student_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@student\.prasetiyamulya\.ac\.id')
        instructor_pattern = re.compile(r'^[a-zA-Z0-9._%+-]+@prasetiyamulya\.ac\.id')

        if student_pattern.match(email) or instructor_pattern.match(email):
            if User.objects.filter(email=email).exists():
                raise serializers.ValidationError("Email is already in use.")
            return email
        
        raise serializers.ValidationError("Invalid email domain. Please use a valid Prasetiya Mulya email.")
    
    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirmation']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        # Remove password_confirmation before creating user
        validated_data.pop('password_confirmation', None)
        
        email = validated_data['email'].lower()
        username = email.split('@')[0]
        domain = email.split('@')[1]

        # Determine role based on email domain
        role = 'student' if domain == 'student.prasetiyamulya.ac.id' else 'instructor'

        # Create user with hashed password
        user = User.objects.create_user(
            email=email,
            username=username,
            full_name=validated_data['full_name'],
            major=validated_data.get('major', ''),  # PASTIKAN INI ADA
            role=role,
            password=validated_data['password']
        )

        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'  # Use email as login field
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims to token
        token['username'] = user.username
        token['full_name'] = user.full_name
        token['major'] = user.major if hasattr(user, 'major') else ''
        token['role'] = user.role if hasattr(user, 'role') else 'student'

        return token
        
    def validate(self, attrs):
        data = super().validate(attrs)

        # Add user information to response
        data.update({
            'email': self.user.email,
            'username': self.user.username,
            'full_name': self.user.full_name,
            'major': self.user.major if hasattr(self.user, 'major') else '',
            'role': self.user.role if hasattr(self.user, 'role') else 'student',
            'token': data['access'],
        })
        
        return data