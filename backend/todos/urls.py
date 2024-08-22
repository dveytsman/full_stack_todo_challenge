# todos/urls.py

from django.urls import path
from .views import TodoListCreate, TodoRetrieveUpdateDestroy, QuoteView, RandomQuoteView

urlpatterns = [
    path('todos/', TodoListCreate.as_view(), name='todo-list-create'),
    path('todos/<int:pk>/', TodoRetrieveUpdateDestroy.as_view(), name='todo-detail'),
    path('quote/', QuoteView.as_view(), name='quote'),
    path('randquote/', RandomQuoteView.as_view(), name='random-quote'),

]
