<template>
  <v-container fluid>
    <v-app id="inspire">
      <v-navigation-drawer color="#263544" v-model="drawer" permanent>
        <v-list>
          <v-list-item
            title="Admin"
            subtitle="admin@gmail.com"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item :to="{name: 'app.dashboard'}" prepend-icon="mdi-folder" title="Dashboard"  value="dashboard"></v-list-item>
          <v-list-item :to="{name: 'app.material'}" prepend-icon="mdi-account-multiple" title="Material" value="material"></v-list-item>
          <v-list-item :to="{name: 'app.product'}" prepend-icon="mdi-account-multiple" title="Product" value="product"></v-list-item>
          <v-list-item :to="{name: 'app.warehous'}" prepend-icon="mdi-account-multiple" title="Warehous" value="warehous"></v-list-item>
          <v-list-item :to="{name: 'app.order'}" prepend-icon="mdi-account-multiple" title="Order" value="order"></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn block>
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-app-bar prominent>
        <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>GoodOne</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
      </v-app-bar>

      <v-main>
        <v-sheet :elevation="2" class="pa-5" rounded>
          <router-view />
        </v-sheet>
      </v-main>
    </v-app>
  </v-container>

</template>
<script>
  export default {
    data: () => ({
      drawer: true,
      group: null,
      items: [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ],
    }),

    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>
