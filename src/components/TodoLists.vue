<template>
  <div class="card">
    <v-data-table
      :headers="headers"
      :items="todos"
      class="card"
      hide-default-footer
    >
      <template #[`item.actions`]="{ item }">
        <v-btn
          :loading="btnLoading"
          color="primary"
          @click="removeTodo(item.id)"
          @click.prevent.stop="
              () => {
                return false;
              }
            "
        >
          Delete
        </v-btn>
      </template>
    </v-data-table>
  </div>

</template>

<script>
export default {
  data() {
    return {
      loading: false,
      btnLoading: false,
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
      todos: [
        {
          id: 1,
          text: 'this is a text'
        }
      ]
    }
  },

  created() {
    this.getTodos()
  },

  methods: {
    getTodos() {
      this.loading = true
      this.$http.get('/todos')
      .then(response => {
        this.todos = response.data.data
      })
      .finally(() => {
        this.loading = false
      })
    },

    removeTodo(todoId) {
      this.btnLoading = true
      this.$http.delete('/todos/' + todoId)
        .then(response => {
           const index = this.todos.findIndex(el => el.id === todoId)
           this.todos.splice(index, 1)
        })
        .finally(() => {
          this.btnLoading = false
        })
    },
  },
};
</script>
