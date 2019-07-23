<template>
  <div>
    <b-modal ref="TaskModal"
             ok-only
             ok-title="Add"
             @ok="createTask"
             ok-variant="success"
             title="Create New Task"
    >
      <b-row class="margin-bottom-5">
        <b-col cols="2">
          <label class="typo__label">Title</label>
        </b-col>
        <b-col>
          <input class="form-control" v-model="taskData.title"
                 :class="{ required: (!taskData.title) }"
                 placeholder="Enter task title">
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="2">
          <label class="typo__label">Project</label>
        </b-col>
        <b-col>
          <multiselect v-model="taskData.project" :max-height="200"
                       placeholder="Choose project" label="name" track-by="id"
                       :options="projects" :allow-empty="false"
                       :show-labels="false" :multiple="false"
                       :close-on-select="true"></multiselect>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script>
  import {
    setNotifyData,
    cleanFilters
  } from '../../helpers/commonHelpers';
  import Multiselect from 'vue-multiselect';
  import {mapState} from "vuex";

  export default {
    components: {
      Multiselect
    },
    data() {
      return {
        taskData: {
          project: '',
          title: ''
        }
      }
    },
    methods: {
      createTask(e) {
        if (!this.taskData.title || !this.taskData.project) {
          e.preventDefault();
          this.$notify(setNotifyData('Error', 'Please enter task title', 'error'));
        }
        else {
          const savedObject = {
          title: this.taskData.title,
          status: 'active',
          project: this.taskData.project ? this.taskData.project.name : null
        };
          this.$store.commit('tasks/addTask', savedObject);
          this.$notify(setNotifyData('Success', 'Task has been created!', 'success'));
        }
      }
    },
    computed: {
      ...mapState('tasks', ['projects'])
    },
    beforeMount() {
      this.$store.dispatch('tasks/getProjects');
    },
    mounted() {
      this.$root.$on('openTaskModal', () => {
        if (this.$refs['TaskModal']) {
          cleanFilters(this.taskData);
          this.$refs['TaskModal'].show();
        }
      })
    },
    beforeDestroy() {
      this.$root.$off('openTaskModal');
    }
  }
</script>

<style scoped>

</style>
