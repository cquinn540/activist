from django.contrib import admin

from .models import (
    Group,
    GroupEvent,
    GroupImage,
    GroupMember,
    GroupResource,
    GroupText,
    GroupTopic,
    Organization,
    OrganizationApplication,
    OrganizationEvent,
    OrganizationGroup,
    OrganizationImage,
    OrganizationMember,
    OrganizationResource,
    OrganizationTask,
    OrganizationText,
    OrganizationTopic,
    StatusType,
)

# MARK: Bridge Tables

admin.site.register(GroupEvent)
admin.site.register(GroupImage)
admin.site.register(GroupMember)
admin.site.register(GroupResource)
admin.site.register(GroupText)
admin.site.register(GroupTopic)

admin.site.register(OrganizationApplication)
admin.site.register(OrganizationEvent)
admin.site.register(OrganizationGroup)
admin.site.register(OrganizationImage)
admin.site.register(OrganizationMember)
admin.site.register(OrganizationResource)
admin.site.register(OrganizationTask)
admin.site.register(OrganizationText)
admin.site.register(OrganizationTopic)

admin.site.register(StatusType)

# MARK: Methods


class GroupAdmin(admin.ModelAdmin):
    list_display = ["group_name", "name"]


class OrganizationAdmin(admin.ModelAdmin):
    list_display = ["org_name", "name"]


admin.site.register(Group, GroupAdmin)
admin.site.register(Organization, OrganizationAdmin)
