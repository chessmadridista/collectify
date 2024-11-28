<script setup>
import IdeaCardDetails from '@/components/idea/IdeaCardDetails.vue';
import IdeaDialogDeleteIdea from '@/components/idea/IdeaDialogDeleteIdea.vue';
import IdeaDialogEditIdea from '@/components/idea/IdeaDialogEditIdea.vue';
import FeaturesCard from '@/components/features/FeaturesCard.vue';
import FeaturesDialogEditFeature from '@/components/features/FeaturesDialogEditFeature.vue';
import JournalsCard from '@/components/journals/JournalsCard.vue';
import JournalsDialogEditJournal from '@/components/journals/JournalsDialogEditJournal.vue';
import NotesCard from '@/components/notes/NotesCard.vue';
import NotesDialogEditJournal from '@/components/notes/NotesDialogEditJournal.vue';
</script>
<template>
    <IdeaCardDetails />
    <IdeaDialogEditIdea />
    <IdeaDialogDeleteIdea />
    <v-container>
        <v-row>
            <v-col cols="12" lg="6">
                <FeaturesCard />
            </v-col>
            <v-col cols="12" lg="6">
                <v-row>
                    <v-col cols="12">
                        <NotesCard />
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <JournalsCard />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
    <FeaturesDialogEditFeature />
    <JournalsDialogEditJournal />
    <NotesDialogEditJournal />
</template>