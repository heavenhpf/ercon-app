<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-12">
                <div class="row">
                    <div class="pb-0 card-body text-start mb-4">
                        <h4 class="font-weight-bolder text-dark">List User</h4>
                    </div>
                    <div class="pb-0 row mb-lg-3 mb-2">
                        <div class="col-lg-8 col-md-9 mb-2">
                            <span>
                                <argon-button size="md me-2" color="primary">
                                    <span class="fa fa-plus fa-md me-2" />
                                    Tambah
                                </argon-button>
                            </span>
                        </div>
                        <div class="col-lg-4 col-md-3">
                            <span>
                                <div class="input-group">
                                    <span class="input-group-text text-body">
                                        <i class="fas fa-search" aria-hidden="true"></i>
                                    </span>
                                    <input type="text" class="form-control" :placeholder="
                                    'Cari..'
                                    " />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <user-table />
            </div>
        </div>
    </div>
</template>
  
<script>
import UserTable from "./components/UserTable.vue";
import ArgonButton from "@/components/ArgonButton.vue";

export default {
    name: "user",
    components: {
        UserTable,
        ArgonButton,
    },
    data() {
        return {
            stats: {
                titleColor: "opacity-7 text-white",
                descColor: "text-white",
                trip: {
                    title: "Today's Trip",
                    desc: "145 KM",
                    classIcon: "text-dark ni ni-money-coins",
                },
                health: {
                    title: "Battery Health",
                    desc: "99 %",
                    classIcon: "text-dark ni ni-controller ",
                },
                speed: {
                    title: "Average Speed",
                    desc: "56 Km/h",
                    classIcon: "text-dark ni ni-delivery-fast",
                },
                volume: {
                    title: "Music Volume",
                    desc: "15/100",
                    classIcon: "text-dark ni ni-note-03",
                },
            },
        };
    },
};
</script>  