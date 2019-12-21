<style lang="less">
.amountCell {
  .items {
    display: inline-block;
    padding-top: 5px;
    padding-bottom: 5px;
    display: flex;
  }
  .item {
    // float: left;
    word-break: normal;
    font-size: 14.5px;
    line-height: 1.3em;
    flex-grow: 10;
    width: calc(100vw - 14em);
    overflow: hidden;
    word-wrap: break-word;
    &:last-child,
    &:nth-child(2) {
      // width:6em;
      // float: right;
      flex: 1 0 6em;
      justify-content: flex-end;
      display: flex;
    }
    &:empty{
      flex-basis: 2em;
    }
  }
  border-bottom: 1px solid #ccc;
}
.amountCell:first-child {
  margin-top: 0.375rem;
}
.amountCell:last-child {
  border: none;
  margin-bottom: 0.375rem;
}
</style>

<template>
  <section class="amountCell mint-cell">
    <div class="mint-cell-wrapper items">
      <div class="mint-cell-text item">
        <slot name="left"></slot>
      </div>
      <div class="text_middle item">
        <slot name="middle"></slot>
      </div>
      <div class="flex_right item">
        <slot name="right"></slot>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'AmountCell'
}
</script>
