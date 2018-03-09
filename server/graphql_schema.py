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
    main_tags = DjangoFilterConnectionField(lambda: Tag)

    class Meta:
        model = core.models.Source
        filter_fields = ['name', 'country']
        interfaces = (relay.Node, )

    def resolve_text_count(self, args):
        return self.text_set.all().count()

    def resolve_main_tags(self, args, **kwargs):
        politics = tags.models.Tag.objects.get(name='Politics', tag_type='topic')
        return tags.models.Tag.objects \
            .filter(text__source=self, text__source__is_enabled=True, text__tags=politics) \
            .exclude(hide=True) \
            .exclude(tag_type='topic') \
            .exclude(entity_type='Country') \
            .exclude(entity_type='City') \
            .annotate(count=Count('text')) \
            .filter(count__gte=5).order_by('-count')


class Text(DjangoObjectType):

    class Meta:
        model = core.models.Text
        filter_fields = ['id', 'source', 'tags']
        interfaces = (relay.Node, )


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
        filter_fields = ['text__source', 'text__tags']
        interfaces = (relay.Node, )


class Query(ObjectType):
    source = relay.Node.Field(Source)
    tag = relay.Node.Field(Tag)
    all_tags = DjangoFilterConnectionField(Tag)
    all_sources = DjangoFilterConnectionField(Source)
    all_texts = DjangoFilterConnectionField(Text)
    all_sentiments = DjangoFilterConnectionField(SentimentReport)
    most_common_tags = DjangoFilterConnectionField(Tag)
    highlighted_tags = DjangoFilterConnectionField(Tag)
    debug = graphene.Field(DjangoDebug, name='__debug')

    def resolve_all_sources(self, obj, **kwargs):
        return core.models.Source.objects.filter(is_enabled=True)

    def resolve_all_tags(self, obj, **kwargs):
        return tags.models.Tag.objects \
            .filter(hide=False, text__source__is_enabled=True, text__source__country="IT") \
            .annotate(count_text=Count('text', distinct=True)) \
            .annotate(count_sources=Count('text__source__pk', distinct=True)) \
            .order_by('-count_text') \
            .filter(count_sources__gt=2)

    def resolve_highlighted_tags(self, obj, **kwargs):
        return tags.models.Tag.objects.exclude(highlightedtag=None) \
            .order_by('highlightedtag__order')

    def resolve_most_common_tags(self, obj, **kwargs):
        return tags.models.Tag.objects \
            .filter(hide=False, text__source__is_enabled=True, text__source__country="IT", tag_type='entity') \
            .exclude(entity_type='Country') \
            .exclude(entity_type='City') \
            .annotate(count_text=Count('text', distinct=True)) \
            .annotate(count_sources=Count('text__source__pk', distinct=True)) \
            .order_by('-count_text') \
            .filter(count_sources__gt=2)


schema = Schema(query=Query)
