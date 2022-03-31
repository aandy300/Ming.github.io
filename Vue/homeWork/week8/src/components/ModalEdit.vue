<template>
<div class="modal fade" id="vertCentModal" tabindex="-1" aria-labelledby="basicModalLabel" aria-hidden="true" ref="modal">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="basicModalLabel">購買者資訊</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Vertically centered Modal content here
          {{inside_singleOrderDataTemp}}
      </div>
      <!-- 案扭曲 -->
      <div class="modal-footer"></div>
        <!-- <button type="button" class="btn btn-primary">Yes</button>
        <button type="button" class="btn btn-primary">No</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button> -->
      </div>
    </div>
  </div>
</template>

<script>

import Moadl from 'bootstrap/js/dist/modal'

export default {
    data(){
      return {
        newTemp: '',
        inside_singleOrderDataTemp: {}
      }
    },
    props: ['singleOrderDataTemp'],
    watch: {
        singleOrderDataTemp(){
            this.inside_singleOrderDataTemp = this.singleOrderDataTemp
            console.log('watch()', this.inside_singleOrderDataTemp)
        }
    },
    methods: {
        openModal(){
            this.modal.show()
        },
        closeModal(){
            this.modal.hide()
        }
    },
    mounted() {
        this.modal = new Moadl(this.$refs.modal)
    }
}
</script>
