from django.conf.urls import include, url
from django.contrib import admin

import som.views

views = som.views

urlpatterns = [
    url(r'^$', views.som, name='som'),
    url(r'^poll/', views.poll, name='poll'),
    url(r'^getTextInput/', views.getTextInput, name='getTextInput'),
    url(r'^getImageInput/', views.getImageInput, name='getImageInput'),
    url(r'^getDoodleInput/', views.getDoodleInput, name='getDoodleInput'),
    url(r'^searchImage/', views.searchImage, name='searchImage'),
    url(r'^deleteNode/', views.deleteNode, name='deleteNode'),

    url(r'^focus', views.focus, name='focus'),

    url(r'^newSession/', views.newSession, name='newSession'),
    url(r'^graph/', views.graph, name='graph'),
    url(r'^som/', views.index, name='index'),
]
