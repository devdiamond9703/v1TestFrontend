<template>
    <v-row>
        <v-col class="text-left">
            <h2>Product List</h2>
        </v-col>
        <v-col class="text-right">
            <v-btn color="success" icon="mdi-plus" @click="product.dialog.add = true" ></v-btn>
        </v-col>
    </v-row>

    <v-row>
        <v-col cols="12">
            <v-data-table
                v-model:items-per-page="product.page"
                :headers="product.headers"
                :items="product.all"
            >
                <template v-slot:item.actions="{ item }">
                    <v-btn size="small" class="me-3" color="primary" @click="getMaterialByProduct(item)">
                        Material
                    </v-btn>
                </template>
            </v-data-table>
        </v-col>
    </v-row>

    <v-row>
        <v-dialog v-model="product.dialog.add" width="700">
            <v-card>
                <v-card-title>
                    <h3>Add product</h3>
                </v-card-title>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field
                            v-model="product.field.name"
                            label="Name"
                            variant="underlined"
                        ></v-text-field>
                        <v-text-field
                            v-model="product.field.code"
                            label="Code"
                            variant="underlined"
                        ></v-text-field>
                    </v-col>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blur" variant="text" @click="product.dialog.add = false">
                        Close
                    </v-btn>
                    <v-btn color="blue" variant="text" @click="saveProduct">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>

    <v-row>
        <v-dialog v-model="materialsByProduct.dialog.add" width="700">
            <v-card>
                <v-card-title>
                    <h3>Add material</h3>
                </v-card-title>
                <v-card-text>
                    <v-col cols="12">
                        <v-text-field
                            v-model="materialsByProduct.productField.name"
                            label="Name"
                            variant="underlined"
                            readonly
                        ></v-text-field>
                        <v-select
                            v-model="materialsByProduct.field.material_id"
                            :items="material.all"
                            item-value="id"
                            item-title="name"
                            label="Material"
                            variant="underlined"
                        ></v-select>
                        <v-text-field
                            v-model="materialsByProduct.field.quantity"
                            label="Quantity"
                            variant="underlined"
                        ></v-text-field>
                        <div class="text-right">
                            <v-btn color="blue-darken-1"  @click="saveMaterialByProduct">
                                Save
                            </v-btn>
                        </div>
                    </v-col>
                    <v-row>

                    <v-col cols="12">
                        <v-divider :thickness="10" class="border-opacity-50"></v-divider>
                        <v-data-table
                            v-model:items-per-page="productMaterial.page"
                            :headers="productMaterial.headers"
                            :items="productMaterial.all"
                        >
                        </v-data-table>
                    </v-col>
                </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blur" variant="text" @click="productMaterial.dialog.add = false">
                        Close
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
    import {
        getProductAllApi,
        saveProductApi,
        getMaterialByProductApi,
        saveMaterialByProductApi

    } from '../../api/Product/index.js'

    import {
        getMaterialAllApi
    } from '../../api/Material/index.js'

    export default {
        data() {
            return {
                product: {
                    page: 10,
                    all: [],
                    headers: [
                        { title: 'Name', align: 'start', sortable: false, key: 'name'},
                        { title: 'Code', align: 'end', sortable: false, key: 'code'},
                        { title: 'Action', align: 'end', sortable: false, key: 'actions'},
                    ],
                    dialog: {
                        add: false
                    },
                    field: {
                        id: null,
                        name: null,
                        code:null,
                    },
                },
                materialsByProduct: {
                    all: [],
                    headers: [
                        { title: 'Name',  sortable: false, key: 'name'},
                    ],
                    dialog: {
                        add: false
                    },
                    productField: {
                      id: null,
                      name: null,
                    },
                    field: {
                        id: null,
                        product_id: null,
                        material_id: null,
                        quantity: null,
                    },
                },
                material: {
                    all: []
                },
                productMaterial: {
                    all: [],
                    headers: [
                        { title: 'Name', align: 'start', sortable: false, key: 'material_name'},
                        { title: 'Quantity', align: 'end', sortable: false, key: 'quantity'},
                    ],
                    field: {
                        product_material_id: null,
                        material_name: null,
                        quantity: null
                    }
                }
            }
        },

        methods: {
            async getProductAll() {
                this.product.all = await getProductAllApi();
            },
            async saveProduct() {
                let response = await saveProductApi(this.product.field);
                if(response.status) {
                    this.getProductsAll(),
                    this.product.dialog.add = false
                }
            },

            async getMaterialByProduct(item) {
                this.materialsByProduct.dialog.add = true
                this.materialsByProduct.field.product_id = item.id
                this.materialsByProduct.productField.name = item.name
                this.material.all = await getMaterialAllApi();
                this.productMaterial.all = await getMaterialByProductApi(item.id);
            },

            async saveMaterialByProduct() {
                let response = await saveMaterialByProductApi(this.materialsByProduct.field);
                if(response.status) {
                    this.productMaterial.all = await getMaterialByProductApi(this.materialsByProduct.field.product_id);
                }
            }
        },

        mounted() {
            this.getProductAll()
        }

    }
</script>
