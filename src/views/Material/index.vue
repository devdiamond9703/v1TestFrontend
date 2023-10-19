<template>
    <v-row>
        <v-col class="text-left">
            <h2>Materail List</h2>
        </v-col>
        <v-col class="text-right">
            <v-btn color="success" icon="mdi-plus" @click="addBtn" ></v-btn>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12">
            <v-data-table
                v-model:items-per-page="material.page"
                :headers="material.headers"
                :items="material.all"
            >
            </v-data-table>
        </v-col>
    </v-row>

    <v-row>
        <v-dialog v-model="material.dialog.add" width="700">
            <v-card>
                <v-card-title>
                    <h3>Add materail</h3>
                </v-card-title>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field
                            v-model="material.field.name"
                            label="Name"
                            variant="underlined"
                        ></v-text-field>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blur" variant="text" @click="material.dialog.add = false">
                        Close
                    </v-btn>
                    <v-btn color="blue" variant="text" @click="saveMaterial">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>

    import {
        getMaterialAllApi,
        saveMaterialApi
    } from '../../api/Material/index.js'

    export default {
        data() {
            return {
                material: {
                    page: 10,
                    all: [],
                    headers: [
                        { title: 'Name', align: 'start', sortable: false, key: 'name'},
                    ],
                    dialog: {
                        add: false
                    },
                    field: {
                        id: null,
                        name: null,
                    },
                    defaultField: {
                        id: null,
                        name: null,
                    },
                },
            }
        },

        methods: {
            async getMaterialAll() {
                this.material.all = await getMaterialAllApi();
            },

            addBtn() {
                this.material.field = { ...this.material.defaultField }
                this.material.dialog.add = true
            },

            async saveMaterial() {
                let response = await saveMaterialApi(this.material.field);
                if(response.status) {
                    this.getMaterialAll(),
                    this.material.dialog.add = false
                }
            }
        },

        mounted() {
            this.getMaterialAll()
        }

    }
</script>
