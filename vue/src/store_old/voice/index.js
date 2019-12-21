/*
 * @Author: your name
 * @Date: 2019-11-06 17:06:02
 * @LastEditTime: 2019-11-07 15:00:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \cp8h5\vue\src\store\voice\index.js
 */
import { Howl } from 'howler'
// import Storage from 'Plugins/utils/StorageUtil'
import Utils from 'Plugins/utils'
export default {
  state: {
    voice: true
  },
  getters: {
    voice: state => state.voice
  },
  mutations: {
    voice (state, type) {
      if (Utils.Storage.get('music').openVoice) {
        let list = [
          require('../../assets/images/voice/m_recharge_1.mp3'),
          require('../../assets/images/voice/m_recharge_2.mp3'),
          require('../../assets/images/voice/m_recharge_3.mp3')
        ]
        let voiceObj = {
          withdraw: require('../../assets/images/voice/m_tip.mp3'),
          promotion: require('../../assets/images/voice/m_vip.mp3'),
          discounts: require('../../assets/images/voice/m_activity.mp3'),
          room: require('../../assets/images/voice/m_chatRoom.mp3'),
          service: require('../../assets/images/voice/m_service.mp3'),
          generalize: require('../../assets/images/voice/m_spread.mp3')
        }
        let src = list[parseInt(Math.random() * 3)]
        // var tag = require('../../assets/images/voice/m_recharge_3.mp3')
        console.log('tag', '')
        var sound = null
        switch (type) {
          case 'recharge':
            sound = new Howl({
              src: [src]
            })
            break
          case 'withdraw':
            sound = new Howl({
              src: [voiceObj.withdraw]
            })
            break
          case 'promotion':
            sound = new Howl({
              src: [voiceObj.promotion]
            })
            break
          case 'discounts':
            sound = new Howl({
              src: [voiceObj.discounts]
            })
            break
          case 'room':
            sound = new Howl({
              src: [voiceObj.room]
            })
            break
          case 'service':
            sound = new Howl({
              src: [voiceObj.service]
            })
            break
          case 'generalize':
            sound = new Howl({
              src: [voiceObj.generalize]
            })
            break
        }
        sound.play()
      }
    }
  },
  actions: {

  }
}
