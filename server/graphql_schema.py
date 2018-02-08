from graphene import relay, ObjectType, Schema
import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
import core.models
import tags.models
from django.db.models import Count, Avg


class Source(DjangoObjectType):
    text_count = graphene.Int()
    main_entities = DjangoFilterConnectionField(lambda: Entity)

    class Meta:
        model = core.models.Source
        filter_fields = ['name']
        interfaces = (relay.Node, )

    def resolve_text_count(self, args):
        return self.text_set.all().count()

    def resolve_main_entities(self, args, **kwargs):
        return tags.models.Entity.objects.filter(text__source=self) \
            .annotate(average=Avg('text__sentimentreport__compound')) \
            .annotate(count=Count('text')) \
            .filter(count__gt=10).order_by('-count')


class Text(DjangoObjectType):

    class Meta:
        model = core.models.Text
        filter_fields = ['id', 'entities', 'source']
        interfaces = (relay.Node, )


class Entity(DjangoObjectType):
    count = graphene.Int()
    average = graphene.Float()

    class Meta:
        model = tags.models.Entity
        filter_fields = ['name']
        interfaces = (relay.Node, )


class Tag(DjangoObjectType):

    class Meta:
        model = tags.models.Tag
        filter_fields = ['name']
        interfaces = (relay.Node, )


class SentimentReport(DjangoObjectType):

    class Meta:
        model = core.models.SentimentReport
        filter_fields = ['text__source', 'text__entities']
        interfaces = (relay.Node, )


class Query(ObjectType):
    source = relay.Node.Field(Source)
    all_sources = DjangoFilterConnectionField(Source)
    all_texts = DjangoFilterConnectionField(Text)
    all_sentiments = DjangoFilterConnectionField(SentimentReport)
    # entity = relay.Node.Field(Entity)


schema = Schema(query=Query)
