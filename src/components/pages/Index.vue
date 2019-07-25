<template>
  <div>
      <div class="row tasks">
        <div class="col-md-2 offset-5">
          <h2>Active tasks</h2>
        </div>
        <div clas="col-md-2">
          <button type="button" class="btn btn-success" @click="createTask">+</button>
        </div>
      </div>
      <div class="row tasks">
        <div class="col-md-2 offset-5">
          <input v-model="searchData" class="form-control" placeholder="search by title..." @input="search" />
        </div>
      </div>
    <div v-for="task in filteredTasks">
      <task
        :id="task.id"
        :status="task.status"
        :title="task.title"
        :project="task.project"
      ></task>
    </div>
    <task-modal></task-modal>
  </div>
</template>

<script>

  import Vue from 'vue';
  import {mapState} from "vuex";
  import Task from '../common/Task';
  import TaskModal from '../modals/TaskModal';

  export default {
    data() {
      return {
        filteredTasks: [],
        searchData: ''
      }
    },
    components: {
      Task,
      TaskModal
    },
    methods: {
      createTask() {
        this.$root.$emit('openTaskModal');
      },
      search() {
        this.filteredTasks = this.tasks.filter(e => e.title.toLowerCase().includes(this.searchData.toLowerCase()))
      },
      setDefaults() {
        this.filteredTasks = this.tasks;
      },
      loadTasks() {
        this.$store.dispatch('tasks/getTasks');
      }
    },
    computed: {
      ...mapState('tasks', ['tasks'])
    },
    watch: {
      tasks: function () {
        this.setDefaults();
        this.search();
      }
    },
    beforeMount() {
      this.setDefaults();
      this.loadTasks();
    },
    mounted() {
      this.$root.$on('reloadTasks', () => {
        this.loadTasks();
      })
    },
    beforeDestroy() {
      this.$root.$off('reloadTasks');
    }

  }
</script>

<style scoped>

  .tasks {
    align: center;
  }

</style>
