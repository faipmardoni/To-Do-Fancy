// const token = localStorage.getItem('Token')
const app = new Vue({
  el: '#app',
  data: {
    taskName: '',
    priority: '',
    reminder: '',
    note: '',
  },
  methods: {
    addTask() {
      let newTodo = {
        taskName: this.taskName,
        priority: this.priority,
        note: this.note,
        reminder: this.reminder,
      }
      axios
        .post('http://127.0.0.1:3000/todos/', newTodo, {
          headers: {
            'auth': token,
          }
        })
        .then(response => {
          console.log('reponse :', response);
          alert('Success added task')
          window.location.reload(true)
        })
        .catch(error => {
          console.log('error :', error);
        })
    }
  }
})

const userId = localStorage.getItem('userId')
console.log('userId :', userId);
axios.get(`http://127.0.0.1:3000/users/${userId}`, {
  headers: {
    'auth': token,
  }
})
  .then(response => {
    console.log('response :', response);
    const { todos, photo, name } = response.data.user
    const app2 = new Vue({
      el: '#listTodo',
      data: {
        name,
        todos,
      },
      methods: {
        setDate(date) {
          console.log('date :', date);
          return date.split('T')[0]
        },
        deleteTodo(taskId) {
          axios.delete(`http://127.0.0.1:3000/todos/${taskId}`)
            .then(response => {
              window.location.reload(true)
            })
            .catch(error => {
              console.log('error :', error);
            })
        },
        editTodo(taskId, taskName, status, reminder) {
          axios.put(`http://127.0.0.1:3000/todos/${taskId}`, { taskName, status, reminder })
            .then(response => {
              window.location.reload(true)
            })
            .catch(error => {
              console.log('error :', error);
            })
        }
      },
    })
    const app3 = new Vue({
      el: '#app3',
      data: {
        photo,
        name
      },

    })
  })
  .catch(error => {
    console.log('error :', error);
  })

function logOut() {
  localStorage.clear()
  window.location.reload(true)
}