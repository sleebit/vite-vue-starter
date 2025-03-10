<template>
  <Sidebar v-if="shouldShowSidebar">
    <RouterView />
  </Sidebar>
  <RouterView v-else />

  <Toaster
    class="pointer-events-auto"
    theme="dark"
    position="top-right"
    richColors
    closeButton
    :expand="true"
  />
</template>

<script setup>
import Sidebar from "@/components/Sidebar.vue";
import { Toaster } from "@/components/ui/sonner";
</script>

<script>
import { mapState } from "vuex";
import { toast } from "vue-sonner";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      TOKENS: (state) => state.auth.TOKENS,
      TOASTER_DATA: (state) => state.auth.TOASTER_DATA,
    }),
    shouldShowSidebar() {
      const hiddenRoutes = ["/auth/login", "/auth/register", "/auth"];
      return !hiddenRoutes.includes(this.$route.path);
    },
  },
  watch: {
    TOASTER_DATA() {
      if (this.TOASTER_DATA) {
        const { type, message, ...options } = this.TOASTER_DATA;

        switch (type) {
          case "success":
            toast.success(message, options);
            break;
          case "error":
            toast.error(message, options);
            break;
          case "warning":
            toast.warning(message, options);
            break;
          case "info":
            toast.info(message, options);
            break;
          default:
            toast(message, options);
        }

        // Reset toast data
        setTimeout(() => {
          this.$store.dispatch("auth/showNotification", null);
        }, 100);
      }
    },
  },
  mounted() {
    // this.$store.dispatch("auth/showNotification", {
    //   type: "success",
    //   message: "Hey",
    //   description: "This is a toast message",
    //   action: {
    //     label: "Close",
    //     onClick: () => {
    //       this.$store.dispatch("auth/showNotification", null);
    //     },
    //   },
    // });
  },
  methods: {},
};
</script>
