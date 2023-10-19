<template>
    <v-row align-items="normal">
        <v-col cols="12">
            <h2>Order</h2>
        </v-col>
        <v-col cols="5">
          <v-select
              v-model="order.field.product_id"
              :items="product.all"
              item-value="id"
              item-title="name"
              label="Product"
              variant="underlined"
          ></v-select>
        </v-col>
        <v-col cols="5">
          <v-text-field
              v-model="order.field.quantity"
              label="Quantity"
              variant="underlined"
          ></v-text-field>
        </v-col>
        <v-col cols="2" class="text-center">
          <v-btn color="blue"  @click="requestWarehous">
              Send
          </v-btn>
        </v-col>
    </v-row>

    <v-row>
        <v-divider :thickness="10" class="border-opacity-50"></v-divider>
        <v-data-table
            :headers="order.headers"
            :items="order.all"
        >
            <template v-slot:item.actions="{ item }">
                <v-btn size="small" class="me-3" color="primary" @click="getMaterialByProduct(item)">
                    Material
                </v-btn>
            </template>
        </v-data-table>
    </v-row>
</template>

<script>
    import {
        getProductAllApi
    } from '../../api/Product/index.js'

    import {
        requestWarehousApi
    } from '../../api/Warehous/index.js'

    export default {
        data() {
            return {
                order: {
                    all: [],
                    headers: [
                        { title: 'Name', align: 'start', sortable: false, key: 'material_name'},
                        { title: 'Quantity', align: 'end', sortable: false, key: 'qty'},
                        { title: 'price', align: 'end', sortable: false, key: 'price'},
                    ],
                    field: {
                        product_id: null,
                        quantity: null,
                    },
                    defaultField: {
                        product_id: null,
                        quantity: null,
                    }
                },
                product: {
                    all: []
                }
            }
        },

        methods: {
            async getProductAll() {
                this.product.all = await getProductAllApi();
            },
            async requestWarehous() {
                let response = await requestWarehousApi(this.order.field);
                this.order.all = response.result.product_materials
            },
        },

        mounted() {
            this.getProductAll()
        }

    }
</script>

