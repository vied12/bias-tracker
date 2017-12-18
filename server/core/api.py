from drf_haystack.viewsets import HaystackViewSet
from . import models
from . import serializers
from drf_haystack.mixins import FacetMixin
from drf_haystack.filters import HaystackFilter
from drf_haystack.filters import HaystackAutocompleteFilter
from rest_framework.pagination import PageNumberPagination
from haystack.query import SQ


class GlobalSearchView(FacetMixin, HaystackViewSet):

    # `index_models` is an optional list of which models you would like to include
    # in the search result. You might have several models indexed, and this provides
    # a way to filter out those of no interest for this particular view.
    # (Translates to `SearchQuerySet().models(*index_models)` behind the scenes.
    index_models = [
        # entities
        models.Track,
        models.Person,
        models.Group,
        models.Instrument,
        models.Style,
        models.Event,
    ]
    serializer_class = serializers.AggregateSerializer
    facet_serializer_class = serializers.FacetSerializer  # See example above!
    facet_query_params_text = 'params'

    class MyOrderingFilter(HaystackFilter):
        def filter_queryset(self, request, queryset, view):
            qs = super(GlobalSearchView.MyOrderingFilter, self).filter_queryset(request, queryset, view)
            # filter entities without post
            qs = qs.filter(SQ(nb_posts__gt=0) | SQ(type='Post'))
            # filter standard post
            qs = qs.exclude(post_type='standard')
            # filter standard post
            qs = qs.exclude(post_type='image')
            # order filter
            params = self.get_request_filters(request)
            if 'order' in params:
                qs = qs.order_by(params['order'])
            else:
                qs = qs.order_by('-updated')
            return qs

    filter_backends = (MyOrderingFilter, )


class MapResultsView(HaystackViewSet):

    class CustomPageNumberPagination(PageNumberPagination):
        page_size = 1000

    pagination_class = CustomPageNumberPagination
    serializer_class = serializers.MapResultsSerializer

    class MyOrderingFilter(HaystackFilter):
        def apply_filters(self, queryset, applicable_filters=None, applicable_exclusions=None):
            qs = super(MapResultsView.MyOrderingFilter, self).apply_filters(
                queryset, applicable_filters, applicable_exclusions
            )
            return qs.filter(lat__gt=-1000)

    filter_backends = (MyOrderingFilter, )


class AutocompleteView(HaystackViewSet):

    # `index_models` is an optional list of which models you would like to include
    # in the search result. You might have several models indexed, and this provides
    # a way to filter out those of no interest for this particular view.
    # (Translates to `SearchQuerySet().models(*index_models)` behind the scenes.
    index_models = [
        # entities
        models.Track,
        models.Person,
        models.Group,
        models.Instrument,
        models.Style,
        models.Event,
    ]

    class CustomPageNumberPagination(PageNumberPagination):
        page_size = 4

    pagination_class = CustomPageNumberPagination
    filter_backends = (HaystackAutocompleteFilter, )
    serializer_class = serializers.AutocompleteSerializer
