<template>
    <v-row>
        <v-col class="text-left">
            <h2>Warehous List</h2>
        </v-col>
        <v-col class="text-right">
            <v-btn color="success" icon="mdi-plus" @click="addBtn" ></v-btn>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12">
            <v-data-table
                v-model:items-per-page="warehous.page"
                :headers="warehous.headers"
                :items="warehous.all"
            >
            </v-data-table>
        </v-col>
    </v-row>

    <v-row>
        <v-dialog v-model="warehous.dialog.add" width="700">
            <v-card>
                <v-card-title>
                    <h3>Add warehous</h3>
                </v-card-title>
                <v-card-text>
                    <v-col cols="12">
                        <v-select
                            v-model="warehous.field.material_id"
                            :items="material.all"
                            item-value="id"
                            item-title="name"
                            label="Material"
                            variant="underlined"
                        ></v-select>
                        <v-text-field
                            v-model="warehous.field.remainder"
                            label="Quantity"
                            variant="underlined"
                        ></v-text-field>
                        <v-text-field
                            v-model="warehous.field.price"
                            label="Price"
                            variant="underlined"
                        ></v-text-field>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blur" variant="text" @click="warehous.dialog.add = false">
                        Close
                    </v-btn>
                    <v-btn color="blue" variant="text" @click="saveWarehous">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>

    import {
        getWarehousAllApi,
        saveWarehousApi
    } from '../../api/Warehous/index.js'

    import {
        getMaterialAllApi
    } from '../../api/Material/index.js'

    export default {
        data() {
            return {
                warehous: {
                    page: 10,
                    all: [],
                    headers: [
                        { title: 'Name', align: 'start', sortable: false, key: 'material_name'},
                        { title: 'Amount', align: 'start', sortable: false, key: 'remainder'},
                        { title: 'Price', align: 'start', sortable: false, key: 'price'},
                    ],
                    dialog: {
                        add: false
                    },
                    field: {
                        warehous_id: null,
                        material_name: null,
                        material_id: null,
                        remainder: null,
                        price: null,
                    },
                    defaultField: {
                        warehous_id: null,
                        material_name: null,
                        material_id: null,
                        remainder: null,
                        price: null,
                    }
                },

                material: {
                    all: [],
                }
            }
        },

        methods: {
            async getWarehousAll() {
                this.warehous.all = await getWarehousAllApi();
            },

            async addBtn() {
                this.warehous.field = { ...this.warehous.defaultField }
                this.warehous.dialog.add = true
                this.material.all = await getMaterialAllApi();
            },

            async saveWarehous() {
                let response = await saveWarehousApi(this.warehous.field);
                if(response.status) {
                    this.getWarehousAll(),
                    this.warehous.dialog.add = false
                }
            }
        },

        mounted() {
            this.getWarehousAll()
        }

    }
</script>
