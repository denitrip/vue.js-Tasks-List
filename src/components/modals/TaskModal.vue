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
      <!--    :class="{ required: (!taskData.title) }"-->
          <input class="form-control" v-model="taskData.title"
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
  import {
    serverUrl
  } from '../../config/config.js';
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
          const params = {
          title: this.taskData.title,
          status: 'active',
          project: this.taskData.project ? this.taskData.project.name : null
        };
          this.$http.post(`${serverUrl}/api/tasks`, {params}).then(()=>{
            this.$root.$emit('reloadTasks');
            this.$notify(setNotifyData('Success', 'Task has been created!', 'success'));
          }).catch((error) => {
            console.log(error);
            this.$notify(setNotifyData('Warning', 'Task has not been created!', 'Warning'));
          });
        }
      }
    },
    computed: {
      ...mapState('tasks', ['projects'])
    },
    mounted() {
      this.$root.$on('openTaskModal', () => {
        if (this.$refs['TaskModal']) {
          cleanFilters(this.taskData);
          this.$store.dispatch('tasks/getProjects');
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
