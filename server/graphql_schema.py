from graphene import relay, ObjectType, Schema
import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
import core.models
import tags.models
from django.db.models import Count


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
            .annotate(count=Count('text')) \
            .filter(count__gt=10).order_by('-count')


class Text(DjangoObjectType):

    class Meta:
        model = core.models.Text
        filter_fields = ['id', 'entities', 'source']
        interfaces = (relay.Node, )


class Entity(DjangoObjectType):
    count_text = graphene.Int()
    count_sources = graphene.Int()
    sources = DjangoFilterConnectionField(lambda: Source)

    class Meta:
        model = tags.models.Entity
        filter_fields = {
            'name': ['icontains'],
        }
        interfaces = (relay.Node, )

    def resolve_sources(self, params, **kwargs):
        return list(
            core.models.Source.objects.filter(text__entities=self)
                .annotate(count_entities=Count('text__entities'))
                .filter(count_entities__gt=5)
                .distinct()
        )


class Tag(DjangoObjectType):
    sources = DjangoFilterConnectionField(lambda: Source)

    class Meta:
        model = tags.models.Tag
        filter_fields = {
            'name': ['icontains']
        }
        interfaces = (relay.Node, )

    def resolve_sources(self, params, **kwargs):
        return list(
            core.models.Source.objects.filter(text__tags=self)
                .annotate(count_tags=Count('text__tags'))
                .filter(count_tags__gt=5)
                .distinct()
        )


class SentimentReport(DjangoObjectType):

    class Meta:
        model = core.models.SentimentReport
        filter_fields = ['text__source', 'text__entities', 'text__tags']
        interfaces = (relay.Node, )


class Query(ObjectType):
    source = relay.Node.Field(Source)
    entity = relay.Node.Field(Entity)
    tag = relay.Node.Field(Tag)
    all_entities = DjangoFilterConnectionField(Entity)
    all_tags = DjangoFilterConnectionField(Tag)
    all_sources = DjangoFilterConnectionField(Source)
    all_texts = DjangoFilterConnectionField(Text)
    all_sentiments = DjangoFilterConnectionField(SentimentReport)
    most_common_entities = DjangoFilterConnectionField(Entity)
    most_common_tags = DjangoFilterConnectionField(Tag)

    def resolve_most_common_entities(self, obj, **kwargs):
        return tags.models.Entity.objects \
            .annotate(count_text=Count('text', distinct=True)) \
            .annotate(count_sources=Count('text__source__pk', distinct=True)) \
            .order_by('-count_text') \
            .filter(count_sources__gt=3)

    def resolve_most_common_tags(self, obj, **kwargs):
        return tags.models.Tag.objects \
            .annotate(count_text=Count('text', distinct=True)) \
            .annotate(count_sources=Count('text__source__pk', distinct=True)) \
            .order_by('-count_text') \
            .filter(count_sources__gt=3)


schema = Schema(query=Query)
