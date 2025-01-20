from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        if isinstance(request.resolver_match.func.view_class.permission_classes, list):
            if AllowAny in request.resolver_match.func.view_class.permission_classes:
                return None
        return super().authenticate(request)
