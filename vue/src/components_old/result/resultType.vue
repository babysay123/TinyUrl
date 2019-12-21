<template>
  <!-- 快三骰子 -->
  <div v-if="type === 'touzi'" class="game-result" :style="`padding-left: ${lhcPadding}px`">
    <ResultNumber
      v-for="(n, index) in data"
      :key="index"
      :num="n"
      type="dice"
      :size="resultSize"
      :style="`margin-right: ${mr}px`"
    />
    <span :class="[ `dice-sum-${resultSize}` ]">和值：{{ numSum }}</span>
    <span v-if="ball" class="text-red" style="margin-left: 10px">{{ K3Parser.size }}</span>
    <span v-if="ball" class="text-red" style="margin-left: 10px">{{ K3Parser.oe }}</span>
  </div>

  <!-- 六合彩生肖 -->
  <div v-else-if="type === 'lhc' && ball" class="game-result" :style="`padding-left: ${lhcPadding}px`">
    <div class="game-result-line">
      <ResultNumber
        v-for="(n, index) in zodiacType.slice(0, 6)"
        :key="index"
        :num="n.num"
        :color="n.color"
        :size="resultSize"
        :style="`margin-right: ${ index !== 5 ? mr : 0 }px`"
      />
      <span :class="[ `num-symbol-${resultSize}` ]">+</span>
      <ResultNumber
        :num='zodiacType[6].num'
        :color='zodiacType[6].color'
        :size="resultSize"
      />
      <span class="lhc-parser">
        特码:
        <span class="text-red">{{ ZodiacEndParser.size }}</span>
        <span class="text-red">{{ ZodiacEndParser.oe }}</span>
        <span class="text-red" v-html="ZodiacEndParser.animal" />
      </span>
    </div>
    <div class="game-result-line">
      <ResultNumber
        v-for="(n, index) in zodiacType.slice(0, 6)"
        :key="index"
        :num='n.zodiac'
        :color="n.color"
        type="zodiac"
        :size="resultSize"
        :style="`margin-right: ${ index !== 5 ? mr : 0 }px`"
      />
      <span :class="[ `num-symbol-${resultSize}` ]"></span>
      <ResultNumber
        :num='zodiacType[6].zodiac'
        :color='zodiacType[6].color'
        type="zodiac"
        :size="resultSize"
      />
    </div>
  </div>

  <div v-else-if="type === 'lhc' && !ball" class="game-result" :style="`padding-left: ${lhcPadding}px`">
    <ResultNumber
      v-for="(n, index) in zodiacType.slice(0, 6)"
      :key="index"
      :num='n.num'
      :color="n.color"
      type="none"
      :size="resultSize"
      :style="`margin-right: ${ index !== 5 ? mr : 0 }px`"
    />
    <span :class="[ `num-symbol-${resultSize}` ]">+</span>
    <ResultNumber
      :num='zodiacType[6].num'
      :color='zodiacType[6].color'
      type="none"
      :size="resultSize"
    />
  </div>

  <!-- 幸运28 -->
  <div v-else-if="type === 'pcdd'" class="game-result" :style="`padding-left: ${lhcPadding}px`">
    <ResultNumber
      :num="data[0]"
      :size="resultSize"
      :type="ball ? 'common' : 'none'"
    />
    <span :class="[ `num-symbol-${resultSize}` ]">+</span>
    <ResultNumber
      :num="data[1]"
      :size="resultSize"
      :type="ball ? 'common' : 'none'"
    />
    <span :class="[ `num-symbol-${resultSize}` ]">+</span>
    <ResultNumber
      :num="data[2]"
      :size="resultSize"
      :type="ball ? 'common' : 'none'"
    />
    <span :class="[ `num-symbol-${resultSize}` ]">=</span>
    <ResultNumber
      :num="numSum"
      :size="resultSize"
      :type="ball ? 'common' : 'none'"
      :color="LuckParser.color"
    />
    <span v-if="ball" class="text-red luck-parser">
      <span :class="[ `text-${LuckParser.color}` ]">{{ LuckParser.text }}</span>
      <span>{{ LuckParser.size }}</span>
      <span>{{ LuckParser.oe }}</span>
    </span>
  </div>

  <!-- PK10 -->
  <div v-else-if="type === 'pk10'" class="game-result pk10-result" :style="`padding-left: ${lhcPadding}px`">
    <ResultNumber
      v-for="(n, index) in data"
      :key="index"
      :num="n"
      :size="resultSize"
      type="block"
      :style="`margin-right: ${mr}px`"
      :class="[ `block-bg-${+n - 1}` ]"
    />
  </div>

  <!-- 其他游戏普通排列 -->
  <div v-else-if="data.length == 3" class="game-result" :style="`padding-left: ${lhcPadding}px`">
    <ResultNumber
      v-for="(n, index) in data"
      :key="index"
      :num="n"
      :size="resultSize"
      :type="ball ? 'common' : 'none'"
      :style="`margin-right: ${mr}px`"
    />
    <span :class="[ `dice-sum-${resultSize}` ]">和值：{{ numSum }}</span>
    <span v-if="ball" class="text-red" style="margin-left: 10px">{{ state3D }}</span>
  </div>
  <div v-else class="game-result" :style="`padding-left: ${lhcPadding}px`">
    <ResultNumber
      v-for="(n, index) in data"
      :key="index"
      :num="n"
      :size="resultSize"
      :type="ball ? 'common' : 'none'"
      :style="`margin-right: ${mr}px`"
    />
  </div>
</template>

<script>
import ResultNumber from './resultNumber'
import { LuckParser, ZodiacParser, K3Parser, ZodiacEndParser } from 'Plugins/gameParser'
export default {
  components: { ResultNumber },
  props: {
    type: {
      type: String,
      default: 'quanquan'
      // touzi quanquan pcdd lhc
    },
    data: {
      type: Array,
      required: true
    },
    mr: {
      type: [ Number, String ],
      default: 5
    },
    ball: {
      type: Boolean,
      default: true
    },
    size: {
      type: String
    },
    padding: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    numSum () {
      // 结果总和
      return this.data.reduce((a, b) => +a + +b)
    },
    state3D () {
      if (this.data.length === 3) {
        var e = new Set(this.data).size
        switch (e) {
          case 1:
            return '豹子'
          case 2:
            return '组三'
          case 3:
            return '组六'
        }
      }
    },
    LuckParser () {
      // 幸运28结果解析
      return LuckParser(this.numSum)
    },
    zodiacType () {
      // 六合彩解析
      return this.data.map(e => {
        return { ...ZodiacParser(e), ...{ num: e } }
      })
    },
    ZodiacEndParser () {
      return ZodiacEndParser(this.zodiacType[this.zodiacType.length - 1])
    },
    K3Parser () {
      return K3Parser(this.numSum)
    },
    lhcPadding () {
      return this.type === 'lhc' || !this.padding ? 0 : 52
    },
    resultSize () {
      if (this.size) {
        return this.size
      }
      return document.body.clientWidth <= 320 ? 'sm' : 'md'
    }
  }
}
</script>
