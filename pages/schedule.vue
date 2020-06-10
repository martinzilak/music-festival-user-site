<template>
    <v-layout>
        <v-flex>
            <v-container fluid>
                <v-switch
                    v-model="favoritesOnly"
                    :label="$t('favoritesOnly')"
                    :color="favoriteColor"
                />
                <v-calendar
                    ref="calendar"
                    :events="favoritesOnly ? events.filter(e => isFavorite(e.performance)) : events"
                    :event-color="getEventColor"
                    :event-name="formatEventName"
                    :day-format="formatDayHeader"
                    :weekday-format="formatWeekdayHeader"
                    :interval-format="formatIntervalText"
                    :start="start"
                    :end="end"
                    dark
                    event-overlap-mode="column"
                    type="custom-daily"
                    first-interval="11"
                    interval-count="14"
                    @click:event="eventClicked"
                />
            </v-container>
        </v-flex>
    </v-layout>
</template>

<script>
    import Performance from "../components/Performance";
    import {getUrl, PERFORMANCES} from "../plugins/settings";

    const DATE_FORMAT = 'YYYY-MM-DD';
    const TIME_FORMAT = 'YYYY-MM-DD HH:mm';
    const STAGE_COLORS = {
        0: 'green',
        1: 'blue',
        2: 'yellow',
        3: 'brown',
        4: 'orange',
        fallback: 'grey',
    };
    const FAVORITE_COLOR = 'red';

    export default {
        name: "schedule",

        components: {
            Performance,
        },

        data() {
            return {
                schedule: {},
                events: [],
                start: this.$moment().format(DATE_FORMAT),
                end: this.$moment().format(DATE_FORMAT),
                favoriteColor: FAVORITE_COLOR,
                favoritesOnly: false,
            }
        },

        computed: {
            isLoggedIn() {
                return this.$store.getters.isUserLoggedIn;
            }
        },

        async created() {
            const performances = await this.$axios.$get(getUrl(PERFORMANCES));

            this.events = performances.map(p => ({
                name: p.artist.name,
                stage: p.stage.name,
                stageId: p.stage.id,
                start: this.$moment(p.start).format(TIME_FORMAT),
                end: this.$moment(p.end).format(TIME_FORMAT),
                performance: p,
                color: this.isFavorite(p) ? FAVORITE_COLOR : STAGE_COLORS[p.stage.id % 5] ?? STAGE_COLORS.fallback,
            }));

            const dateRange = performances.reduce((result, p) => ({
                start: this.$moment(p.start).isBefore(result.start) ? this.$moment(p.start) : result.start,
                end: this.$moment(p.end).isAfter(result.end) ? this.$moment(p.end) : result.end,
            }), {start: this.$moment().add(1, 'year'), end: this.$moment().subtract(1, 'year')});
            this.start = dateRange.start.format(DATE_FORMAT);
            this.end = dateRange.end.format(DATE_FORMAT);
        },

        mounted () {
            this.$refs.calendar.checkChange();
        },

        methods: {
            getEventColor(event) {
                return event.color;
            },

            formatDayHeader(day) {
                return this.$d(this.$moment(day.date).toDate());
            },

            formatWeekdayHeader(day) {
                return this.$d(this.$moment(day.date).toDate(), 'weekday');
            },

            formatIntervalText(day) {
                return this.$d(this.$moment(day).toDate(), 'time');
            },

            formatEventName({ input }) {
                return `
                    <h2>${input.name}</h2>
                    <br />
                    <h3>${input.stage}</h3>
                    <h3>
                        ${this.$d(this.$moment(input.start), 'time')} - ${this.$d(this.$moment(input.end), 'time')}
                    </h3>
                `;
            },

            eventClicked({ nativeEvent, event }) {
                if (this.isLoggedIn) {
                    this.isFavorite(event.performance) ? this.unsetFavorite(event) : this.setFavorite(event);
                }
                nativeEvent.stopPropagation();
            },

            isFavorite(performance) {
                return this.$store.getters.isFavorite(performance);
            },

            setFavorite(event) {
                this.$store.dispatch('addFavorite', event.performance);
                event.color = FAVORITE_COLOR;
            },

            unsetFavorite(event) {
                this.$store.dispatch('removeFavorite', event.performance);
                event.color = STAGE_COLORS[event.stageId % 5] ?? STAGE_COLORS.fallback;
            },
        },
    }
</script>

<style scoped>

</style>