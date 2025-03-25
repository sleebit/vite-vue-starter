<template>
  <div class="max-w-2xl mx-auto my-6 space-y-8">
    <!-- Tabs for Global vs Project Settings -->
    <Tabs v-model="activeTab" class="mb-8">
      <TabsList class="border-b border-gray-300">
        <TabsTrigger value="global" class="px-4 py-2"
          >Global Settings</TabsTrigger
        >
        <TabsTrigger value="project" class="px-4 py-2"
          >Project Settings</TabsTrigger
        >
      </TabsList>

      <!-- Global Settings Tab -->
      <TabsContent value="global" class="space-y-6">
        <!-- Account Security -->
        <Card class="mb-6">
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription
              >Update your password and security settings.</CardDescription
            >
          </CardHeader>
          <CardContent>
            <form @submit.prevent="handleAccountSubmit" class="space-y-4">
              <div class="space-y-2">
                <Label for="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  v-model="accountData.currentPassword"
                />
              </div>
              <div class="space-y-2">
                <Label for="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  v-model="accountData.newPassword"
                />
              </div>
              <div class="space-y-2">
                <Label for="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  v-model="accountData.confirmPassword"
                />
              </div>
              <Button type="submit" :loading="$store.state.isLoading"
                >Update Password</Button
              >
            </form>
          </CardContent>
        </Card>

        <!-- Appearance & Language -->
        <Card class="mb-6">
          <CardHeader>
            <CardTitle>Appearance & Language</CardTitle>
            <CardDescription
              >Customize how the app looks and behaves.</CardDescription
            >
          </CardHeader>
          <CardContent class="space-y-6">
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <Label>Theme</Label>
                <p class="text-sm text-muted-foreground">
                  Select your preferred theme
                </p>
              </div>
              <Select v-model="preferences.theme" class="w-full sm:w-[180px]">
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <Label>Language</Label>
                <p class="text-sm text-muted-foreground">
                  Choose your preferred language
                </p>
              </div>
              <Select
                v-model="preferences.language"
                class="w-full sm:w-[180px]"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                  <SelectItem value="pt">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              :loading="$store.state.isLoading"
              @click="saveGlobalSettings"
            >
              Save Global Preferences
            </Button>
          </CardContent>
        </Card>

        <!-- Global Notifications -->
        <Card class="mb-6">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription
              >Choose how you want to be notified.</CardDescription
            >
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <Label for="emailNotif">Email Notifications</Label>
                  <p class="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch
                  id="emailNotif"
                  v-model="preferences.notifications.email"
                />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <Label for="pushNotif">Push Notifications</Label>
                  <p class="text-sm text-muted-foreground">
                    Get instant notifications in your browser
                  </p>
                </div>
                <Switch
                  id="pushNotif"
                  v-model="preferences.notifications.push"
                />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <Label for="smsNotif">SMS Notifications</Label>
                  <p class="text-sm text-muted-foreground">
                    Get important alerts via SMS
                  </p>
                </div>
                <Switch id="smsNotif" v-model="preferences.notifications.sms" />
              </div>
              <div
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <Label>Timezone</Label>
                  <p class="text-sm text-muted-foreground">
                    Your preferred timezone for notifications
                  </p>
                </div>
                <Select
                  v-model="preferences.timezone"
                  class="w-full sm:w-[180px]"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem
                      :value="Intl.DateTimeFormat().resolvedOptions().timeZone"
                      >System Default</SelectItem
                    >
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York"
                      >Eastern Time</SelectItem
                    >
                    <SelectItem value="America/Los_Angeles"
                      >Pacific Time</SelectItem
                    >
                    <SelectItem value="Asia/Dubai">Dubai</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Europe/Paris">Paris</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              variant="outline"
              :loading="$store.state.isLoading"
              @click="saveGlobalSettings"
            >
              Save Global Notification Preferences
            </Button>
          </CardContent>
        </Card>

        <!-- Danger Zone -->
        <Card class="mb-6">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription
              >Irreversible and destructive actions.</CardDescription
            >
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <p class="text-sm text-muted-foreground">
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <Button
                variant="destructive"
                class="bg-red-600 hover:bg-red-700"
                :loading="$store.state.isLoading"
                @click="handleDeleteAccount"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <!-- Project Settings Tab -->
      <TabsContent value="project" class="space-y-6">
        <!-- Project Notifications -->
        <Card class="mb-6">
          <CardHeader>
            <CardTitle>Project Notifications</CardTitle>
            <CardDescription
              >Set notification preferences for the project.</CardDescription
            >
          </CardHeader>
          <CardContent class="space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <Label for="projEmailNotif">Email Notifications</Label>
                  <p class="text-sm text-muted-foreground">
                    Receive project updates via email
                  </p>
                </div>
                <Switch
                  id="projEmailNotif"
                  v-model="projectSettings.notifications.email"
                />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <Label for="projPushNotif">Push Notifications</Label>
                  <p class="text-sm text-muted-foreground">
                    Get instant project notifications
                  </p>
                </div>
                <Switch
                  id="projPushNotif"
                  v-model="projectSettings.notifications.push"
                />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <Label for="projSmsNotif">SMS Notifications</Label>
                  <p class="text-sm text-muted-foreground">
                    Receive project alerts via SMS
                  </p>
                </div>
                <Switch
                  id="projSmsNotif"
                  v-model="projectSettings.notifications.sms"
                />
              </div>
            </div>
            <Button
              variant="outline"
              :loading="$store.state.isLoading"
              @click="saveProjectSettings"
            >
              Save Project Notification Preferences
            </Button>
          </CardContent>
        </Card>

        <!-- Additional Project Settings -->
        <Card class="mb-6">
          <CardHeader>
            <CardTitle>Additional Project Settings</CardTitle>
            <CardDescription>
              Customize extra settings for this project. This area can be
              tailored per project requirements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div class="space-y-4">
              <Label for="projectData">Custom Data</Label>
              <!-- Using a Textarea component for richer UI -->
              <Textarea
                id="projectData"
                v-model="projectSettings.data"
                placeholder="Enter additional project data"
              />
            </div>
            <Button
              variant="outline"
              class="mt-4"
              :loading="$store.state.isLoading"
              @click="saveProjectSettings"
            >
              Save Project Settings
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script>
import { setTheme, getTheme } from "@/utils/theme";
import { PROJECT_ID } from "@/utils/constants";
import { mapState } from "vuex";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export default {
  name: "Settings",
  components: {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    Button,
    Input,
    Label,
    Switch,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    Textarea,
  },
  data() {
    return {
      activeTab: "global",
      // Global settings for account
      preferences: {
        theme: getTheme(),
        language: "en",
        notifications: {
          email: true,
          push: true,
          sms: false,
          marketing: false,
        },
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      // Project-specific settings
      projectSettings: {
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        data: "",
      },
      accountData: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      originalGlobalSettings: {},
      originalProjectSettings: {},
    };
  },
  computed: {
    ...mapState("auth", ["user"]),
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        if (!newUser) {
          this.$router.push("/auth/login");
        } else {
          this.loadSettings();
        }
      },
    },
    "preferences.theme"(newTheme) {
      setTheme(newTheme);
    },
  },
  methods: {
    // Recursively get diff of two objects
    diffObjects(newObj, origObj) {
      const diff = {};
      for (const key in newObj) {
        if (
          typeof newObj[key] === "object" &&
          newObj[key] !== null &&
          !Array.isArray(newObj[key])
        ) {
          const nestedDiff = this.diffObjects(newObj[key], origObj[key] || {});
          if (Object.keys(nestedDiff).length > 0) {
            diff[key] = nestedDiff;
          }
        } else {
          if (newObj[key] !== origObj[key]) {
            diff[key] = newObj[key];
          }
        }
      }
      return diff;
    },
    loadSettings() {
      const user = this.user;
      if (user && user.settings) {
        // Load global settings from user object
        const settings = user.settings;
        this.preferences = {
          theme: getTheme(),
          language: settings.language || "en",
          notifications: {
            email: settings.notifications?.email ?? true,
            push: settings.notifications?.push ?? true,
            sms: settings.notifications?.sms ?? false,
            marketing: settings.notifications?.marketing ?? false,
          },
          timezone:
            settings.timezone ||
            Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
        // Deep clone for diffing later
        this.originalGlobalSettings = JSON.parse(
          JSON.stringify(this.preferences)
        );
      }
      // Load project settings from the user's project list using the fixed PROJECT_ID
      if (user && user.projects && user.projects.length) {
        const proj = user.projects.find(
          (p) => p.project.toString() === PROJECT_ID.toString()
        );
        if (proj && proj.settings) {
          this.projectSettings = {
            notifications: {
              email: proj.settings.notifications?.email ?? true,
              push: proj.settings.notifications?.push ?? true,
              sms: proj.settings.notifications?.sms ?? false,
            },
            data: proj.settings.data || "",
          };
          this.originalProjectSettings = JSON.parse(
            JSON.stringify(this.projectSettings)
          );
        }
      }
    },
    async handleAccountSubmit() {
      try {
        if (!this.accountData.currentPassword) {
          throw new Error("Current password is required");
        }
        if (!this.accountData.newPassword) {
          throw new Error("New password is required");
        }
        if (this.accountData.newPassword.length < 8) {
          throw new Error("Password must be at least 8 characters");
        }
        if (this.accountData.newPassword !== this.accountData.confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await this.$store.dispatch("auth/updatePassword", {
          currentPassword: this.accountData.currentPassword,
          newPassword: this.accountData.newPassword,
          confirmPassword: this.accountData.confirmPassword,
        });
        // Clear password fields after successful update
        this.accountData.currentPassword = "";
        this.accountData.newPassword = "";
        this.accountData.confirmPassword = "";
      } catch (error) {
        this.$store.commit(
          "SET_TOASTER_DATA",
          {
            type: "error",
            message: error?.response?.data?.message || error.message,
          },
          { root: true }
        );
      }
    },
    async saveGlobalSettings() {
      const changed = this.diffObjects(
        this.preferences,
        this.originalGlobalSettings
      );
      if (Object.keys(changed).length > 0) {
        await this.$store.dispatch("auth/updateGlobalSettings", changed);
        // Update original settings after successful update
        this.originalGlobalSettings = JSON.parse(
          JSON.stringify(this.preferences)
        );
      }
    },
    async saveProjectSettings() {
      const changed = this.diffObjects(
        this.projectSettings,
        this.originalProjectSettings
      );
      if (Object.keys(changed).length > 0) {
        await this.$store.dispatch("auth/updateProjectSettings", {
          ...changed,
        });
        this.originalProjectSettings = JSON.parse(
          JSON.stringify(this.projectSettings)
        );
      }
    },
    async handleDeleteAccount() {
      const confirmed = window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );
      if (confirmed) {
        await this.$store.dispatch("auth/deleteAccount");
        this.$router.push("/auth/login");
      }
    },
  },
};
</script>
