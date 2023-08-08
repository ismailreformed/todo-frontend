<template>
  <div>
    <v-data-table
    :headers="headers"
    :items="todos"
    sort-by="calories"
    class="elevation-4"
    hide-default-footer
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>My Todos</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                  >
                    <v-textarea
                      v-model="editedItem.text"
                      label="Your Todo Description"
                      rows="3"
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
     <v-btn
       @click="editItem(item)"
     >
       <v-icon
         small
         left
       >
         mdi-pencil
       </v-icon>
       Edit
     </v-btn>

      <v-btn
        @click="deleteItem(item)"
      >
        <v-icon
          small
          left
        >
          mdi-delete
        </v-icon>
        Delete
      </v-btn>

    </template>

    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>

    <v-snackbar
      v-model="snackbar"
      top
      centered
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { getAuthUser } from '../auth';

export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Id',
        value: 'id',
        sortable: true,
      },
      {
        text: 'Text',
        value: 'text',
        sortable: false,
      },
      {
        text: 'Actions',
        value: 'actions',
        sortable: false,
      }
    ],
    todos: [],
    editedIndex: -1,
    editedItem: {
      text: '',
      user_id: null,
    },
    defaultItem: {
      text: '',
      user_id: null,
    },
    snackbar: false,
    text: ``,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Todo' : 'Edit Todo'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.loading = true

      const authUser = getAuthUser()
      const user = JSON.parse(authUser)

      this.$http.get(`/todos?user_id=${user.id}`)
        .then(response => {
          this.todos = response.data.data
        })
        .finally(() => {
          this.loading = false
        })
    },

    editItem (item) {
      this.editedIndex = this.todos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.todos.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm () {
      this.$http.delete('/todos/' + this.editedItem.id)
        .then(() => {
          this.todos.splice(this.editedIndex, 1)
        })
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      const authUser = getAuthUser()
      const user = JSON.parse(authUser)
      const data = this.editedItem
      data.user_id = user.id

      if (this.editedIndex > -1) {
        this.$http.put('/todos/' + this.editedItem.id, data)
          .then((response) => {
            this.text = response.data.message
            this.snackbar = true
            Object.assign(this.todos[this.editedIndex], this.editedItem)
          })
          .finally(() => {
            this.close()
          })
      } else {
        this.$http.post('/todos', data)
          .then((response) => {
            this.todos.push(response.data.data)
            this.text = response.data.message
            this.snackbar = true
          })
        .finally(() => {
          this.close()
        })
      }
    },
  },
}
</script>
