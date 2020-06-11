<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            {{ item.name }}
        </v-expansion-panel-header>

        <v-expansion-panel-content>
            <p>
                {{ item.text }}
            </p>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
    export default {
        props: ['item'],
    }
</script>

<style scoped>

</style>