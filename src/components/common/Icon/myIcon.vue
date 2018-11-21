<template>
   <i class="icon"
   :class="[size, 'iconfont icon-' + type]"
   :style="{'color':'color'}">
   </i>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})
export default class Header extends Vue {
    @Prop() private type: object = {
        type: String,
        required: true,
    };
    @Prop() private size: object = {
        type: String,
        default: 'normal',
    };
    @Prop() private color: object = {
        type: String,
        default: '#000000',
    };
}
</script>


<style src="./style.scss" lang="scss" scoped>
</style>
