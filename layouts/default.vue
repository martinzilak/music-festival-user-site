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
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>
              {{ item.icon }}
            </v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />

      <v-spacer />

      <v-btn
        text
        :to="login.to"
        exact
      >
        <v-icon left>
          {{login.icon}}
        </v-icon>
        {{login.title}}
      </v-btn>
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
      <span>&copy; 2019</span>
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
            title: 'Welcome',
            to: '/'
          },
          {
            icon: 'mdi-microphone-variant',
            title: 'Artists',
            to: '/artists'
          },
          {
            icon: 'mdi-speaker',
            title: 'Performances',
            to: '/performances'
          },
          {
            icon: 'mdi-map-legend',
            title: 'Plan',
            to: '/plan'
          },
        ],
        login: {
          icon: 'mdi-account',
          title: 'Account',
          to: '/login'
        },
        title: 'Music Festival User Site'
      }
    },
  }
</script>
