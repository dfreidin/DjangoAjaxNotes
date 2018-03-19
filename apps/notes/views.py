# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect, HttpResponse
from django.core import serializers
from .models import *

# Create your views here.
def index(request):
    notes = Note.objects.all()
    return render(request, "notes/index.html", {"notes": notes})

def new(request):
    if request.method != "POST":
        return redirect(index)
    title = request.POST["title"]
    new_note = Note()
    new_note.title = title
    new_note.content = ""
    new_note.save()
    return render(request, "notes/new.html", {"note": new_note})

def update(request, id):
    if request.method != "POST":
        return redirect(index)
    print "update method"
    notes = Note.objects.filter(id=id)
    content = request.POST["content"]
    if len(notes) > 0:
        print "updating note {}".format(id)
        notes[0].content = content
        notes[0].save()
    return HttpResponse(content)

def delete(request, id):
    notes = Note.objects.filter(id=id)
    if len(notes) > 0:
        print "deleting note {}".format(id)
        notes[0].delete()
    return HttpResponse("")