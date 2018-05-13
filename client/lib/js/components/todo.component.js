let templatetodo = `<tr>
<td><input type="text" class="form-control" v-model="taskName"></td>
<td><input type="date" class="form-control" v-model="reminder"></td>
<td><input type="checkbox" v-model="status"></td>
<td><button class="btn btn-info" @click="modifyTask">Save</button> <button class="btn btn-danger" @click="deleteTask">Delete</button> </td></tr>`

// let templatetodo = ``

Vue.component('item', {
  template: templatetodo,
  props: ['todo', 'format'],
  data: function () {
    return {
      taskName: this.todo.taskName,
      status: this.todo.status,
      reminder: this.format,
    }
  },
  methods: {
    deleteTask() {
      this.$emit('deleted', this.todo._id)
    },
    modifyTask() {
      this.$emit('edited', this.todo._id, this.taskName, this.status, this.reminder)
    }
  }
})