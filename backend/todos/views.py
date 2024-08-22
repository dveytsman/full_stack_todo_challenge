from rest_framework import generics
from .models import Todo, Quote
from .serializers import TodoSerializer, QuoteSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
import random

class TodoListCreate(generics.ListCreateAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class TodoRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer

class QuoteView(APIView):
    def get(self, request):
        quote = Quote.objects.first()
        serializer = QuoteSerializer(quote)
        return Response(serializer.data)


class RandomQuoteView(APIView):
    def get(self, request):
        quotes = Quote.objects.all()
        if quotes:
            quote = random.choice(quotes)
            serializer = QuoteSerializer(quote)
            return Response(serializer.data)
        return Response({"text": "No quotes available."})