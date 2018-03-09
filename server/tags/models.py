from django.db import models


class Tag(models.Model):
    TAG_CHOICES = ((_, _) for _ in (
        'tag',
        'entity',
        'topic',
    ))
    name = models.CharField(max_length=255, db_index=True, verbose_name='tag')
    tag_type = models.CharField(max_length=255, db_index=True, choices=TAG_CHOICES, default='tag')
    hide = models.BooleanField(default=False)
    ENTITY_CHOICES = ((_, _) for _ in (
        'Anniversary',
        'City',
        'Company',
        'Continent',
        'Country',
        'Editor',
        'EmailAddress',
        'EntertainmentAwardEvent',
        'Facility',
        'FaxNumber',
        'Holiday',
        'IndustryTerm',
        'Journalist',
        'MarketIndex',
        'MedicalCondition',
        'MedicalTreatment',
        'Movie',
        'MusicAlbum',
        'MusicGroup',
        'NaturalFeature',
        'OperatingSystem',
        'Organization',
        'Person',
        'PharmaceuticalDrug',
        'PhoneNumber',
        'PoliticalEvent',
        'Position',
        'Product',
        'ProgrammingLanguage',
        'ProvinceOrState',
        'PublishedMedium',
        'RadioProgram',
        'RadioStation',
        'Region',
        'SportsEvent',
        'SportsGame',
        'SportsLeague',
        'Technology',
        'TVShow',
        'TVStation',
        'URL',
    ))
    entity_type = models.CharField(max_length=255, db_index=True, null=True, blank=True, choices=ENTITY_CHOICES)

    def __str__(self):
        return '[{}] {}'.format(self.tag_type, self.name)
