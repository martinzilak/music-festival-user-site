<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="$t(title)" />

      <v-spacer />

      <v-toolbar-items>
        <v-select
          v-model="localLanguage"
          :items="languages"
          :label="$t('language')"
          prepend-icon="mdi-web"
          style="margin-top: 12px; width: 180px !important;"
          solo
          dense
          single-line
        />

        <v-btn
          text
          :to="localePath(account.to)"
          exact
        >
          <v-icon left>
            {{ account.icon }}
          </v-icon>
          {{ accountText }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer
      :fixed="fixed"
      app
    >
      <span>{{ $moment().format('YYYY') }} Žilák</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        fixed: false,
        items: [
          {
            icon: 'mdi-apps',
            title: 'news',
            to: '/'
          },
          {
            icon: 'mdi-microphone-variant',
            title: 'artists',
            to: '/artists'
          },
          {
            icon: 'mdi-speaker',
            title: 'performances',
            to: '/performances'
          },
          {
            icon: 'mdi-timetable',
            title: 'schedule',
            to: '/schedule'
          },
          {
            icon: 'mdi-map-legend',
            title: 'plan',
            to: '/plan'
          },
        ],
        account: {
          icon: 'mdi-account',
          title: 'account',
          to: '/login'
        },
        title: 'title'
      }
    },

    computed: {
      languages() {
        return [
          { text: this.$i18n.t('en'), value: 'en' },
          { text: this.$i18n.t('sk'), value: 'sk' }
        ];
      },

      localLanguage: {
        get() {
          return this.$store.getters.getLanguage;
        },
        set(newValue) {
          this.$store.dispatch('changeLanguage', newValue);
        }
      },

      accountText() {
        if (this.$store.getters.isUserLoggedIn) {
          return this.$store.getters.getUsername;
        }

        return this.$i18n.t(this.account.title);
      },
    },

    created () {
      if (this.$store.getters.isUserLoggedIn) {
        this.$i18n.setLocale(this.localLanguage);
      } else {
        this.localLanguage = this.$i18n.locale;
      }
    },
  }
</script>
