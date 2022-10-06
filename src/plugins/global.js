import ArgonButton from '@/components/ArgonButton.vue'
import ArgonInput from '@/components/ArgonInput.vue'

import DataTable from '@/components/DataTable.vue';
import ModalComp from '@/components/ModalComp.vue';

const GlobalComponents = {
  install(app) {
    app.component('ArgonButton', ArgonButton);
    app.component('ArgonInput', ArgonInput);
    app.component('DataTable', DataTable);
    app.component('ModalComp', ModalComp);
  },
};

export default GlobalComponents;
