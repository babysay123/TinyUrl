<template>
  <Popup v-model="show" direction="center">
    <div class="footballPopup">
      <div class="footballPopup-title">
        投注信息
      </div>

      <div class="footballPopup-content">
        <div class="footballPopup-table-title footballPopup-list-item">
          <div>赛事编制</div>
          <div>主队 VS 客队</div>
          <div>注单信息</div>
        </div>

        <div
          class="footballPopup-list footballPopup-list-item"
          v-for="item in data"
          :key="item.id"
        >
          <div>
            {{ item.code }}
          </div>
          <div>
            <p>{{ item.teamHome }}</p>
            <p>VS</p>
            <p>{{ item.teamAway }}</p>
          </div>
          <div>
            <p>{{ item.oddSpf || '' }}</p>
            <p>{{ item.oddSpfR || '' }}</p>
          </div>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
import Popup from '../global/popup'
import { footballDetailsApi } from 'Plugins/api'
export default {
  components: { Popup },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    close: {
      type: Function
    },
    orderId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      data: []
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set () {
        this.close && this.close()
      }
    }
  },
  methods: {
    async getData () {
      const res = await footballDetailsApi({ orderId: this.orderId })
      this.data = res.data
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
.footballPopup {
  width: 90%;
  background: #fff;
  text-align: center;
  border-radius: 5px;
  overflow: hidden;
}

.footballPopup-title {
  line-height: 36px;
  background: #d81e06;
  color: #fff;
}

.footballPopup-table-title {
  line-height: 26px;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
}

.footballPopup-content {
  max-height: 320px;
  overflow-y: auto;
}

.footballPopup-list {
  border-bottom: 1px solid #ccc;
}

.footballPopup-list-item {
  display: flex;
  justify-content: center;
}

.footballPopup-list-item>div {
  flex: 1;
  width: calc(100% / 3);
  word-break: break-all;
  padding: 4px;
  line-height: 18px;
}

.footballPopup-list-item>div:nth-child(2) {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
</style>
