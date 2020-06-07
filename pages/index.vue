<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          {{ $t('title') }}
        </v-card-title>
        <v-card-text>
          {{ $t('titleText') }}
        </v-card-text>
      </v-card>

      <message
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import {getUrl, MESSAGES} from "../plugins/settings";
import Message from "../components/Message";

export default {
  name: "index",

  components: {
    Message,
  },

  data() {
    return {
      messages: [],
    };
  },

  async created() {
    const messages = await this.$axios.$get(getUrl(MESSAGES));
    this.messages = messages.sort((m, other) => this.$moment(m.datetime).isBefore(this.$moment(other.datetime)) ? -1 : 1);
  },
}
</script>
