<template>
    <a href="#" class="p-0 nav-link text-dark" :class="[showMenu ? 'show' : '']" id="dropdownMenuButton"
        data-bs-toggle="dropdown" aria-expanded="false" @click="showMenu = !showMenu">
        <i class="cursor-pointer fa fa-bell">
            <span
                class="position-absolute top-20 start-50 translate-middle p-1 bg-danger border border-light rounded-circle">
                <span class="visually-hidden">New alerts</span>
            </span>
        </i>
    </a>
    <ul class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4" :class="showMenu ? 'show' : ''"
        aria-labelledby="dropdownMenuButton" v-if="g$listNotification">
        <li class="mb-2" v-for="data in g$listNotification">
            <a class="dropdown-item border-radius-md" href="javascript:;">
                <div class="py-1 d-flex">
                    <div class="my-auto me-3" v-if="data.d_notification_object.entity_type === 1">
                        <i class="fas fa-cart-plus text-lg text-success cursor-pointer"></i>
                    </div>
                    <div class="my-auto me-3" v-if="data.d_notification_object.entity_type === 2">
                        <i class="fas fa-envelope-open text-lg text-info cursor-pointer"></i>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-1 text-sm font-weight-normal" v-if="data.d_notification_object.entity_type === 1">
                            <span class="font-weight-bold">New Purchase Order</span> from
                            {{ data.d_notification_object.d_notification_change[0].s_company.name }}
                        </h6>
                        <h6 class="mb-1 text-sm font-weight-normal" v-if="data.d_notification_object.entity_type === 2">
                            <span class="font-weight-bold">New Delivery Note</span> from
                            {{ data.d_notification_object.d_notification_change[0].s_company.name }}
                        </h6>
                        <p class="mb-0 text-xs text-secondary">
                            <i class="fa fa-clock me-1"></i>
                            {{ new Date(data.d_notification_object.created_at).toLocaleDateString("id-ID", { year: 'numeric', month: 'long', day: 'numeric', hour:'2-digit', minute: '2-digit' }) }}
                        </p>
                    </div>
                </div>
            </a>
        </li>
    </ul>
</template>

<script>
import d$notification from '../../stores/dashboard/notification';
import { mapActions, mapState } from 'pinia';

export default {
    name: "Notification",
    computed: {
        ...mapState(d$notification, ['g$listNotification']),
    },
    methods: {
        ...mapActions(d$notification, ['a$listNotification']),
    },
    async mounted() {
        await this.a$listNotification();
    },
}
</script>