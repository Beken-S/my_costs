<template>
  <v-app>
    <v-app-bar app flat >
      <v-container>
        <v-btn :to="{ name: 'dashboard', params: { page: 1 } }" plain :ripple="false" >
          Dashboard
        </v-btn>
        <v-btn :to="{ name: 'about' }" plain :ripple="false" >About</v-btn>
        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
