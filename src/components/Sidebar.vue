<template>
  <SidebarProvider>
    <Sidebar :variant="variant">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" as-child>
              <a class="cursor-pointer" @click="$router.push('/')">
                <div
                  class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
                >
                  <Command class="size-4" />
                </div>
                <div class="grid flex-1 text-left text-sm leading-tight">
                  <span class="truncate font-semibold">
                    {{ currentProject?.project?.name || "App" }}
                  </span>
                  <!-- <span class="truncate text-xs">Enterprise</span> -->
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain :items="navMain" />
        <!-- <NavProjects :projects="projects" /> -->
        <NavSecondary class="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          v-if="user"
          :user="{
            name: user.name || user.email,
            email: user.email,
            image: user.image,
          }"
        />
      </SidebarFooter>
    </Sidebar>

    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2">
        <div class="flex w-full items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 h-4" />
          <Breadcrumb class="w-full">
            <BreadcrumbList class="flex items-center gap-1">
              <!-- Home link always visible -->
              <BreadcrumbItem class="flex items-center">
                <BreadcrumbLink
                  @click="navigateToHome"
                  class="group flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-muted"
                >
                  <Home
                    class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                  />
                  <span class="text-sm font-medium">Dashboard</span>
                </BreadcrumbLink>
              </BreadcrumbItem>

              <!-- Dynamic breadcrumbs -->
              <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
                <template v-if="shouldShowCrumb(index)">
                  <!-- Separator with dots for skipped items -->
                  <BreadcrumbItem v-if="showDots(index)" class="px-1">
                    <span class="flex items-center gap-0.5">
                      <span
                        class="h-1 w-1 rounded-full bg-muted-foreground/50"
                      ></span>
                      <span
                        class="h-1 w-1 rounded-full bg-muted-foreground/50"
                      ></span>
                      <span
                        class="h-1 w-1 rounded-full bg-muted-foreground/50"
                      ></span>
                    </span>
                  </BreadcrumbItem>

                  <!-- Regular crumb -->
                  <BreadcrumbItem class="flex items-center">
                    <ChevronRight
                      class="h-4 w-4 text-muted-foreground/50"
                      :class="{ hidden: index === 0 }"
                    />
                    <BreadcrumbLink
                      v-if="index < breadcrumbs.length - 1"
                      @click="navigateTo(crumb.path)"
                      class="group flex items-center gap-1.5 rounded-md px-2 py-1 hover:bg-muted"
                    >
                      <component
                        :is="getRouteIcon(crumb.path)"
                        class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                      />
                      <span class="text-sm font-medium">
                        {{ crumb.name || formatRouteName(crumb.path) }}
                      </span>
                    </BreadcrumbLink>
                    <div
                      v-else
                      class="flex items-center gap-1.5 rounded-md px-2 py-1 text-muted-foreground"
                    >
                      <component
                        :is="getRouteIcon(crumb.path)"
                        class="h-4 w-4"
                      />
                      <span class="text-sm font-medium">
                        {{ crumb.name || formatRouteName(crumb.path) }}
                      </span>
                    </div>
                  </BreadcrumbItem>
                </template>
              </template>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <slot />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>

<script setup>
import NavMain from "@/components/NavMain.vue";
import NavProjects from "@/components/NavProjects.vue";
import NavSecondary from "@/components/NavSecondary.vue";
import NavUser from "@/components/NavUser.vue";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import {
  BookOpen,
  Bot,
  ChevronRight,
  Frame,
  Home,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-vue-next";
import Command from "./ui/command/Command.vue";
</script>

<script>
import { mapState } from "vuex";

export default {
  props: {
    variant: {
      type: String,
      default: "inset",
    },
  },
  data() {
    return {
      projects: [
        {
          name: "Design Engineering",
          url: "/projects/design-engineering",
          icon: Frame,
        },
        {
          name: "AI Research",
          url: "/projects/ai-research",
          icon: Bot,
        },
        {
          name: "Analytics",
          url: "/projects/analytics",
          icon: PieChart,
        },
      ],
      navMain: [
        {
          title: "Dashboard",
          url: "/",
          icon: SquareTerminal,
          isActive: true,
          // items: [
          //   {
          //     title: "History",
          //     url: "/dashboard/history",
          //   },
          //   {
          //     title: "Starred",
          //     url: "/dashboard/starred",
          //   },
          //   {
          //     title: "Settings",
          //     url: "/dashboard/settings",
          //   },
          // ],
        },
        {
          title: "Workflows",
          url: "/workflows",
          icon: Bot,
          // items: [
          //   {
          //     title: "Genesis",
          //     url: "/models/genesis",
          //   },
          //   {
          //     title: "Explorer",
          //     url: "/models/explorer",
          //   },
          //   {
          //     title: "Quantum",
          //     url: "/models/quantum",
          //   },
          // ],
        },
      ],
    };
  },
  computed: {
    ...mapState("auth", ["user", "currentProject"]),
    breadcrumbs() {
      // Filter out routes without names or paths
      return this.$route.matched
        .filter((route) => route.path && route.path !== "/")
        .map((route) => ({
          name: route.name,
          path: route.path,
        }));
    },
    isMobile() {
      return this.windowWidth < 768;
    },
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },

  methods: {
    handleResize() {
      this.windowWidth = window.innerWidth;
    },

    getRouteIcon(path) {
      const routeIcons = {
        "/": SquareTerminal,
        "/models": Bot,
        "/models/genesis": Bot,
        "/models/explorer": Map,
        "/models/quantum": PieChart,
        "/profile": User,
        "/settings": Settings2,
        default: BookOpen,
      };
      return routeIcons[path] || routeIcons.default;
    },

    shouldShowCrumb(index) {
      // Always show first and last items
      if (index === 0 || index === this.breadcrumbs.length - 1) return true;

      // On mobile, only show the last item
      if (this.isMobile) return false;

      // On desktop, show all items
      return true;
    },

    showDots(index) {
      // Show dots only on mobile when we have hidden items
      return (
        this.isMobile &&
        index === this.breadcrumbs.length - 1 &&
        this.breadcrumbs.length > 2
      );
    },

    formatRouteName(path) {
      // Remove slashes and capitalize each word
      return (
        path
          .split("/")
          .filter(Boolean)
          .pop()
          ?.split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ") || "Home"
      );
    },

    navigateToHome() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },

    navigateTo(path) {
      if (this.$route.path !== path) {
        this.$router.push(path);
      }
    },

    async handleLogout() {
      try {
        await this.$store.dispatch("auth/logout");
        this.$router.push("/auth");
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>
