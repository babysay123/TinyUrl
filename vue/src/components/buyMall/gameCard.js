/*
 * @Author: your name
 * @Date: 2019-09-16 14:07:14
 * @LastEditTime: 2019-11-10 16:20:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\components\buyMall\gameCard.js
 */
import AnimationCard from './animationCard.vue'

import { mapGetters } from 'vuex'
export default {
  props: {
    // :style="isGameTitle ? 'padding-top: 0;' : ''"
    isGameTitle: {
      type: Boolean
    },
    tile: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'all'
    },
    // 新增通过name来分类彩种
    typeName: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters([ 'allGames' ]),
    filterData () {
      // 解析全部彩种为数据用于循环渲染 并且过滤游戏类型
      const source = Object.values(Object.values(this.allGames)[0])
      if (this.type === 'all') {
        return source
      } else {
        // 追加通过lotteryClassName来分类彩种，
        return source.filter(e => {
          if (this.type !== '') {
            return e.type === this.type
          } else {
            const arr = this.typeName.split('|')
            return arr.some(val => {
              return e.lotteryClassName.includes(val)
            })
          }
        })
      }
    }
  },
  render () {
    return (
      <div class={[ this.tile && 'buyMall-tile-container', 'buyMall-container', this.isGameTitle && 'full' ]}>
        { this.filterData.map((e, i) => <AnimationCard key={i} data={e} tile={this.tile} />) }
      </div>
    )
  }
}
