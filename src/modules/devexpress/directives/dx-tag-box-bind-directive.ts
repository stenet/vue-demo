import { Directive } from "vue";
import { registerDxInitialized } from "../index";

export default <Directive>{
  beforeMount(el, binding) {
    const keyExpr = binding.value.keyExpr;
    
    const getData = (): any[] => {
      return binding.value.data || [];
    };
    
    registerDxInitialized<DevExpress.ui.dxTagBox>(el, (init) => {
      const updateDataFromComponent = (newValues: any[]) => {
        if (!newValues) {
          newValues = [];
        }
        
        const data = getData();
        let newData = [...data];
        if (newValues.length === newData.length) {
          return;
        }
        
        const idsInData = newData.map(c => c[keyExpr]);

        const idsToDelete = idsInData.filter(c => !newValues.includes(c));
        for (const idToDelete of idsToDelete) {
          newData = newData.filter(c => c[keyExpr] != idToDelete);
        }

        const idsToInsert = newValues.filter(c => !idsInData.includes(c));
        for (const idToInsert of idsToInsert) {
          const obj: any = {};
          obj[keyExpr] = idToInsert;
          newData.push(obj);
        }

        data.splice(0, data.length, ...newData);        
      };
      const updateDataToComponent = (newData: any[]) => {
        newData = (newData || []);
        const values = (init.component.option("value") || []);

        if (newData.length == values.length) {
          return;
        }

        const newValues = (newData || [])
          .map(c => c[keyExpr]);

        init.component.option("value", newValues);
      };
      
      init.component.on("valueChanged", (ev: DevExpress.ui.dxTagBox.ValueChangedEvent) => {
        if (!ev.event) {
          return;
        }
        
        updateDataFromComponent(ev.value);
      });
      updateDataToComponent(getData());
    });
  }
};