<template>
  <v-list>
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @remove="removeTodo"
    />
  </v-list>
</template>

<script>
import TodoItem from './TodoItem.vue';

export default {
  components: {
    TodoItem,
  },

  data() {
    return {
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
      this.$http.get('/todos')
      .then(response => {
        this.todos = response.data.data
      })
    },

    removeTodo(todoId) {
      this.$emit('remove', todoId);
    },
  },
};
</script>
