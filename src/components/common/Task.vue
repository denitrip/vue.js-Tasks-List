<template>
  <b-row class="margin-top-5 margin-bottom-5 pos-center">
    <b-col cols="4">
      <div class='ui centered card'>
        <div class="form-group">
          <div class="ui form">
            <b-row class="margin-top-5">
              <b-col cols="2">
                <label>Title</label>
              </b-col>
              <b-col cols="8">
                <input class="form-control" v-model="taskTitle" :disabled="true">
              </b-col>
              <b-col cols="2">
                <img v-if="taskStatus" src="../../assets/icons/done_button_icon.svg" title="Complete task"
                     @click="completeTask">
                <img v-if="!taskStatus" src="../../assets/icons/delete_button_icon.svg" title="Delete task"
                     @click="deleteTask">
              </b-col>
            </b-row>
            <b-row>
              <b-col cols="2">
                <label>Project</label>
              </b-col>
              <b-col cols="8">
                <input class="form-control" v-model="projectName" :disabled="true">
              </b-col>
            </b-row>
          </div>
        </div>
        <div class="ui bottom attached green basic button" v-if="!taskStatus">
          Completed
        </div>
        <div class="ui bottom attached red basic button" v-if="taskStatus">
          Pending
        </div>
      </div>
    </b-col>
  </b-row>
</template>

<script>

  import Vue from 'vue';
  import {
    serverUrl
  } from '../../config/config.js'
  import {
    setNotifyData,
  } from '../../helpers/commonHelpers';

  export default {
    props: ['id', 'title', 'project', 'status'],
    data() {
      return {
        rowData: [],
      }
    },
    methods: {
      completeTask() {
        this.$http.put(`${serverUrl}/api/tasks/${this.id}`, {status: 'completed'}).then(()=>{
          this.$root.$emit('reloadTasks');
          this.$notify(setNotifyData('Success', 'Task has been completed!', 'success'));
        }).catch((error) => {
          console.log(error);
          this.$notify(setNotifyData('Warning', 'Task has not been completed!', 'Warning'));
        });
      },
      deleteTask() {
        this.$http.delete(`${serverUrl}/api/tasks/${this.id}`, {status: 'completed'}).then(()=>{
          this.$root.$emit('reloadTasks');
          this.$notify(setNotifyData('Success', 'Task has been deleted!', 'success'));
        }).catch((error) => {
          console.log(error);
          this.$notify(setNotifyData('Warning', 'Task has not been deleted!', 'Warning'));
        });
      }
    },
    computed: {
      taskTitle() {
        return this.title || ``
      },
      projectName() {
        return this.project || ``
      },
      taskStatus() {
        return this.status === 'active'
      }
    },
    beforeMount() {
    },
    components: {}
  }
</script>

<style scoped>

  img {
    width: 70%;
  }

</style>
