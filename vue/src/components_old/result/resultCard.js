import ResultType from './resultType.vue'

export default {
  props: {
    data: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'list'
    }
  },
  render () {
    if (this.type === 'list') {
      return (
        <div class="resultList">
          {
            this.data.map(e => {
              return (
                <div
                  class="resultList-card-list"
                  key={e.lotteryId}
                  onClick={() => {
                    this.$router.push({ path: '/resultDetails', query: { name: e.name, lotteryId: e.lotteryId } })
                  }}
                >
                  <div class="resultList-card-base">
                    <img class="resultList-card-icon" src={`/mobile/images/index/${e.icon}.png`} />
                    <div class="resultList-card-info">
                      <div class="resultList-card-info-title">
                        <p>{e.name}</p>
                        <span class="text-gray">{e.time}</span>
                      </div>
                      <div class="resultList-card-info-issue">
                        <span class="text-gray">第{e.issue}期</span>
                      </div>
                    </div>
                  </div>
                  <ResultType padding type={e.type} data={e.number.split(',')} />
                </div>
              )
            })
          }
        </div>
      )
    } else {
      return (
        <div class="resultList">
          {
            this.data.map((e, i) => {
              return (
                <div class="resultList-card" key={i}>
                  <div class="resultList-card-info">
                    <div class="resultList-card-info-issue">
                      <span class="text-gray">第{e.issue}期</span>
                      <span class="text-gray">{e.time}</span>
                    </div>
                    <ResultType type={e.type} data={e.number.split(',')} />
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    }
  }
}
