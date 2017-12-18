from graphene import relay, ObjectType, Schema, Field
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField
from django.contrib.auth.models import User
from graphene_django.rest_framework.mutation import SerializerMutation
import djoser.serializers


class User(DjangoObjectType):
    class Meta:
        model = User
        filter_fields = ['username']
        interfaces = (relay.Node, )


class CreateUserMutation(SerializerMutation):
    class Meta:
        serializer_class = djoser.serializers.UserCreateSerializer


class SetPasswordMutation(SerializerMutation):
    class Meta:
        serializer_class = djoser.serializers.SetPasswordSerializer


class Query(ObjectType):
    user = relay.Node.Field(User)
    current_user = Field(User)
    all_users = DjangoFilterConnectionField(User)

    def resolve_current_user(self, args):
        if not args.context.user.is_authenticated():
            return None
        return args.context.user


class Mutation(ObjectType):
    createUser = CreateUserMutation.Field()
    setPassword = SetPasswordMutation.Field()


schema = Schema(query=Query, mutation=Mutation)
