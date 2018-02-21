from graphene import relay, ObjectType, Schema
import graphene
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
import core.models
import tags.models
from django.db.models import Count
from graphene_django.debug import DjangoDebug


class Source(DjangoObjectType):
    text_count = graphene.Int()
    main_entities = DjangoFilterConnectionField(lambda: Entity)

    class Meta:
        model = core.models.Source
        filter_fields = ['name', 'country']
        interfaces = (relay.Node, )

    def resolve_text_count(self, args):
        return self.text_set.all().count()

    def resolve_main_entities(self, args, **kwargs):
        return tags.models.Entity.objects \
            .filter(text__source=self, text__source__is_enabled=True) \
            .exclude(entity_type='Country') \
            .exclude(entity_type='City') \
            .annotate(count=Count('text')) \
            .filter(count__gte=5).order_by('-count')


class Text(DjangoObjectType):

    class Meta:
        model = core.models.Text
        filter_fields = ['id', 'entities', 'source', 'tags']
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
        return core.models.Source.objects \
            .filter(text__entities=self, is_enabled=True, country='IT') \
            .annotate(count_entities=Count('text__entities')) \
            .filter(count_entities__gt=5)


class Tag(DjangoObjectType):
    sources = DjangoFilterConnectionField(lambda: Source)

    class Meta:
        model = tags.models.Tag
        filter_fields = {
            'name': ['icontains']
        }
        interfaces = (relay.Node, )

    def resolve_sources(self, params, **kwargs):
        return core.models.Source.objects \
            .filter(text__tags=self, is_enabled=True, country='IT') \
            .annotate(count_tags=Count('text__tags')) \
            .filter(count_tags__gt=5)


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
    highlighted_entites = DjangoFilterConnectionField(Entity)
    debug = graphene.Field(DjangoDebug, name='__debug')

    def resolve_all_sources(self, obj, **kwargs):
        return core.models.Source.objects.filter(is_enabled=True)

    def resolve_highlighted_entites(self, obj, **kwargs):
        return tags.models.Entity.objects.exclude(highlightedentity=None) \
            .order_by('highlightedentity__order')

    def resolve_most_common_entities(self, obj, **kwargs):
        return tags.models.Entity.objects \
            .filter(text__source__is_enabled=True, text__source__country="IT") \
            .annotate(count_text=Count('text', distinct=True)) \
            .annotate(count_sources=Count('text__source__pk', distinct=True)) \
            .order_by('-count_text') \
            .filter(count_sources__gt=2)

    def resolve_most_common_tags(self, obj, **kwargs):
        return tags.models.Tag.objects \
            .filter(text__source__is_enabled=True, text__source__country="IT") \
            .annotate(count_text=Count('text', distinct=True)) \
            .annotate(count_sources=Count('text__source__pk', distinct=True)) \
            .order_by('-count_text') \
            .filter(count_sources__gt=2)


schema = Schema(query=Query)
