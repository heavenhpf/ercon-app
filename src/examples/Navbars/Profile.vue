<template>
    <router-link :to="{ name: 'LogIn' }" class="px-0 nav-link font-weight-bold text-dark" @click="delCookies()">
        <i class="fa fa-user me-sm-2"></i>
        <span class="d-sm-inline d-none">Log Out</span>
    </router-link>
</template>

<script>
import { mapActions } from "pinia";
import d$auth from '@/stores/auth.d';

export default {
    name: "profile",
    methods: {
        ...mapActions(d$auth, ["a$logout"]),

        async delCookies() {
            try {
                await this.a$logout();
            } catch (e) {
                console.error(e);
            }
        },
    },
}
</script>
