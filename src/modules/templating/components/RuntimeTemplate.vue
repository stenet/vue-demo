<script lang="ts">
import { defineComponent, getCurrentInstance, h, unref } from "vue";

export default defineComponent({
  props: {
    template: String,
    context: Object,
    components: Object
  },
  setup(props) {
    const instance = getCurrentInstance();

    const component = {
      template: props.template,
      setup: () => {
        return props.context;
      },
      components: props.components,
      provide: (instance?.parent as any)?.provides || {}
    };

    //damit Vue erkennt, dass aufgrund dieser Eigenschaften ein Re-Render notwendig ist
    for (const key in props.context) {
      unref(props.context[key])
    }

    return () => h(component, {});
  }
});
</script>