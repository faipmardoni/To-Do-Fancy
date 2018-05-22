let templatetodo = `<tr>
<td><input type="text" class="form-control" v-model="taskName"></td>
<td><input type="date" class="form-control" v-model="reminder"></td>
<td>{{apiHoliday(reminder)}}</td>
<td><input type="checkbox" v-model="status"></td>
<td><button class="btn btn-info" @click="modifyTask">Save</button> <button class="btn btn-danger" @click="deleteTask">Delete</button> </td></tr>`

// let templatetodo = ``

Vue.component('item', {
  template: templatetodo,
  props: ['todo', 'format', 'days'],
  data: function () {
    return {
      taskName: this.todo.taskName,
      status: this.todo.status,
      reminder: this.format,
      spesialDay: ''
    }
  },
  methods: {
    deleteTask() {
      this.$emit('deleted', this.todo)
    },
    modifyTask() {
      this.$emit('edited', this.todo._id, this.taskName, this.status, this.reminder, this.todo)
    },
    getApi() {
      axios
        .get(`https://holidayapi.com/v1/holidays?key=e91ff89a-2be0-4401-8383-d45ccc50905e&country=US&year=2017`)
        .then(result => {
          console.log('result :', result);
          this.spesialDay = result.data.holidays
        })
        .catch(err => {
          console.log('err :', err);
        })
    },
    apiHoliday(date) {
      if(date) {
        let newDate = new Date(date)
        let result = `${newDate.getFullYear() - 1}${date.substring(4)}`
        if (result) {
          if (this.days[result] == undefined || this.days[result] == null) {
            return this.spesialDay = 'NO'
          } else {
            return this.spesialDay = this.days[result][0].name
          }
        } else {
          return this.spesialDay = 'NO'
        }
      } else {
        return this.spesialDay = 'NO'
      }
    }
  }
})