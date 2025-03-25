<template>
  <div class="container mx-auto px-4 py-16">
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-4xl font-bold">Payment History</h1>
        <p class="text-muted-foreground mt-2">View all your past transactions</p>
      </div>
      <Button variant="outline" @click="$router.push('/pricing')">
        <ArrowLeft class="h-4 w-4 mr-2" />
        Back to Plans
      </Button>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <Loader2 class="h-8 w-8 animate-spin text-primary" />
      <span class="ml-3 text-lg">Loading payment history...</span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="max-w-lg mx-auto text-center py-12">
      <AlertCircle class="h-12 w-12 text-destructive mx-auto mb-4" />
      <h3 class="text-lg font-semibold mb-2">Failed to Load History</h3>
      <p class="text-muted-foreground mb-6">{{ error }}</p>
      <Button @click="retryLoading">Try Again</Button>
    </div>

    <!-- No Payments -->
    <div
      v-else-if="!paymentHistory.length"
      class="max-w-lg mx-auto text-center py-12"
    >
      <Receipt class="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 class="text-lg font-semibold mb-2">No Payment History</h3>
      <p class="text-muted-foreground mb-6">
        You haven't made any payments yet.
      </p>
      <Button @click="$router.push('/pricing')">View Plans</Button>
    </div>

    <!-- Payment History Table -->
    <div v-else class="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="payment in paymentHistory"
            :key="payment.id"
            class="hover:bg-muted/50"
          >
            <TableCell>
              {{ new Date(payment.createdAt).toLocaleDateString() }}
            </TableCell>
            <TableCell>{{ payment.planName }}</TableCell>
            <TableCell>
              {{ payment.amount }} {{ payment.currency }}
            </TableCell>
            <TableCell>
              <Badge
                :variant="
                  payment.status === 'success'
                    ? 'success'
                    : payment.status === 'failed'
                    ? 'destructive'
                    : 'secondary'
                "
              >
                {{ payment.status }}
              </Badge>
            </TableCell>
            <TableCell class="font-mono">{{ payment.paymentId }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Receipt,
} from "lucide-vue-next";
</script>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("payments", ["paymentHistory", "isLoading", "error"]),
    ...mapState("auth", ["user"]),
  },
  methods: {
    async retryLoading() {
      this.$store.commit("payments/SET_ERROR", null);
      await this.$store.dispatch("payments/getPaymentHistory");
    },
  },
  async mounted() {
    if (!this.user) {
      this.$router.push("/auth/login");
      return;
    }
    await this.$store.dispatch("payments/getPaymentHistory");
  },
};
</script>
