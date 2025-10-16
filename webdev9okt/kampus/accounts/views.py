from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from .forms import LoginForms


def login_view(request):
    if request.user.is_authenticated:
        return redirect("accounts:dashboard")

    form = LoginForms(request.POST or None)
    if request.method == "POST" and form.is_valid():
        user = authenticate(
            request,
            username=form.cleaned_data["username"],
            password=form.cleaned_data["password"]
        )
        if user:
            login(request, user)
            messages.success(request, "Berhasil masuk!")
            return redirect("accounts:dashboard")
        messages.error(request, "Username atau password salah.")
    return render(request, "accounts/login.html", {"form": form})


@login_required
def dashboard(request):
    role = getattr(getattr(request.user, "profile", None), "role", "MAHASISWA")
    return render(request, "accounts/dashboard.html", {"role": role})


@login_required
def logout_view(request):
    logout(request)
    messages.success(request, "Berhasil logout!")
    return redirect("accounts:login")
