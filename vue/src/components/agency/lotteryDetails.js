import LotteryCard from './lotteryCard.vue'
import NoneData from './noneData.vue'
import LotteryPopup from './lotteryPopup.vue'
import FootballPopup from './footballPopup.vue'

export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'betting'
    }
  },
  computed: {
    hasData () {
      return this.list.length > 0
    },
    popupType () {
      if (this.type === 'betting') {
        return <LotteryPopup
          value={this.popup}
          data={this.data}
          close={this.closePopup}
        />
      }
      if (this.type === 'football') {
        return <FootballPopup
          value={this.popup}
          orderId={this.data.orderId}
          close={this.closePopup}
        />
      }
      return null
    }
  },
  data () {
    return {
      popup: false,
      data: {
        orderId: ''
      }
    }
  },
  methods: {
    openPopup (data) {
      this.data = data
      this.popup = true
    },
    closePopup () {
      this.popup = false
    }
  },
  render () {
    if (this.hasData) {
      return (
        <div style="padding: 0 .25rem; margin-top: .4rem">
          {
            this.list.map(e => {
              return <LotteryCard
                data={e}
                key={e.oid}
                type={this.type}
                openDetails={this.type === 'betting' || this.type === 'football' ? this.openPopup : null}
              />
            })
          }
          { this.popup ? this.popupType : null }
        </div>
      )
    } else {
      return <NoneData />
    }
  }
}
