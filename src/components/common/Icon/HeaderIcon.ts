import { Component, Prop, Vue } from 'vue-property-decorator';
import {Icon } from 'vant';
import template from './Icon.vue';

@Component({
  name: 'HeaderIcon',
  mixins: [template],
  components: {
   [Icon.name]: Icon,
  },
})
export default class FooterIcon extends Vue {
  @Prop() private name!: string;
  @Prop() private path!: string;

  private data() {
    return {
      isTouched: false,
    };
  }
}
