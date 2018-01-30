from django.core.management.base import BaseCommand
from core.graphql import Query
import graphene
import json


class Command(BaseCommand):
    help = 'Reload metadata'

    def handle(self, *args, **options):
        schema = graphene.Schema(Query)
        result = schema.execute('''
            {
                __schema {
                    types {
                        kind
                        name
                        possibleTypes {
                            name
                        }
                    }
                }
            }
        ''')
        schema_json = json.dumps(result.data, indent=2)
        self.stdout.write(self.style.SUCCESS(schema_json))
