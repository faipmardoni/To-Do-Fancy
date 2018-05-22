function logOut() {
  localStorage.clear()
  window.location.reload(true)
}

const userId = localStorage.getItem('userId')

const app = new Vue({
  el: '#listTodo',
  data: {
    taskName: null,
    priority: null,
    reminder: null,
    name: null,
    note: null,
    todos: [],
    photo: null,
    specialDays: null,
  },
  created() {
    const token = localStorage.getItem('Token')
    if(token) {
      axios.get(`http://localhost:3000/users/${userId}`, {
        headers: {
          'auth': token,
        }
      })
        .then((result) => {
          console.log('result :', result);
          const user = result.data.user
          this.todos = user.todos
          this.photo = user.photo
          this.name = user.name
        }).catch((err) => {
          // alert(err.response.data.message)
          console.log('err :', err);
        });
      axios
        .get(`https://holidayapi.com/v1/holidays?key=e91ff89a-2be0-4401-8383-d45ccc50905e&country=US&year=2017`)
        .then(result => {
          this.specialDays = result.data.holidays
        })
        .catch(err => {
          alert(err.response.data.message)
          console.log('err :', err);
        })
    }else {
      window.location.href = 'index.html'
    }

  },
  methods: {
    addTask() {
      const token = localStorage.getItem('Token')
      let newTodo = {
        taskName: this.taskName,
        priority: this.priority,
        note: this.note,
        reminder: this.reminder,
      }
      let self = this
      axios
        .post('http://localhost:3000/todos/', newTodo, {
          headers: {
            'auth': token,
          }
        })
        .then(response => {
          self.todos.push(newTodo)
          alert('Success added task')
        })
        .catch(error => {
          alert(error.response.data.message)
          console.log('err :', error.response.data);
        })
    },
    setDate(date) {
      if (date) {
        return date.split('T')[0]
      }
    },
    deleteTodo(todo) {
      const token = localStorage.getItem('Token')      
      let self = this
      if (todo._id) {
        axios.delete(`http://localhost:3000/todos/${todo._id}`, {
          headers: {
            'auth': token,
          }
        })
          .then(response => {
            console.log('success delete task')
            const idx = self.todos.indexOf(todo);
            self.todos.splice(idx, 1)
          })
          .catch(error => {
            alert('please reload this page to delete this item')
            console.log('err :', err.response.data);
          })
      } else {
        window.location.reload(true)
      }
    },
    editTodo(taskId, taskName, status, reminder, todo) {
      const token = localStorage.getItem('Token')      
      let self = this
      if (taskId) {
        axios.put(`http://localhost:3000/todos/${taskId}`, { taskName, status, reminder }, {
          headers: {
            'auth': token,
          }
        })
          .then(response => {
            alert('success')            
            const idx = self.todos.indexOf(todo);
            self.todos[idx] = { taskName, status, reminder }
          })
          .catch(error => {
            console.log('err :', error);
          })
      } else {
        window.location.reload(true)
      }
    }
  }
})