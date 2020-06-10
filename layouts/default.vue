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
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
      />

      <v-toolbar-title>
        {{ formattedTitle }}
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-select
          v-model="localLanguage"
          :items="languages"
          :label="$t('language')"
          :prepend-icon="$device.isMobile ? '' : 'mdi-web'"
          :style="`margin-top: 12px; width: ${$device.isMobile ? 75 : 180}px !important;`"
          solo
          dense
          single-line
        />

        <v-btn
          text
          :to="localePath(account.to)"
          exact
        >
          <v-icon>
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
        fixed: false,
        items: [
          {
            icon: 'mdi-apps',
            title: 'news',
            to: '/'
          },
          {
            icon: 'mdi-account-supervisor',
            title: 'artists',
            to: '/artists'
          },
          {
            icon: 'mdi-iframe-array',
            title: 'stages',
            to: '/stages'
          },
          {
            icon: 'mdi-microphone-variant',
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
      drawer: {
        get() {
          return this.$store.getters.getDrawer;
        },
        set(newValue) {
          this.$store.dispatch('setDrawer', newValue)
        }
      },

      formattedTitle() {
        if (this.$device.isMobile) {
          return `${this.$t(this.title).toString().split(' ').map(i => i.charAt(0)).join('')}`.toUpperCase();
        } else {
          return `${this.$t(this.title)}`;
        }
      },

      languages() {
        return [
          { text: this.$device.isMobile ? 'En' : this.$i18n.t('en'), value: 'en' },
          { text: this.$device.isMobile ? 'Sk' : this.$i18n.t('sk'), value: 'sk' }
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
        if (this.$device.isMobile) {
          return null;
        }

        if (this.$store.getters.isUserLoggedIn) {
          return this.$store.getters.getUsername;
        }

        return this.$i18n.t(this.account.title);
      },
    },

    async created () {
      this.$store.dispatch('setDrawer', !this.$device.isMobile);
      await this.$store.dispatch('checkLoginStatus');

      if (this.$store.getters.isUserLoggedIn) {
        this.$i18n.setLocale(this.localLanguage);
      } else {
        this.localLanguage = this.$i18n.locale;
      }
    },
  }
</script>
