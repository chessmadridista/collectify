<script setup>
import CollectionCardDetails from '@/components/collection/CollectionCardDetails.vue';
import CollectionDialogDeleteCollection from '@/components/collection/CollectionDialogDeleteCollection.vue';
import CollectionDialogEditCollection from '@/components/collection/CollectionDialogEditCollection.vue';
import LinksCard from '@/components/links/LinksCard.vue';
import LinksDialogEditLink from '@/components/links/LinksDialogEditLink.vue';
</script>
<template>
    <CollectionCardDetails />
    <CollectionDialogEditCollection />
    <CollectionDialogDeleteCollection />
    <LinksCard />
    <LinksDialogEditLink />
</template>