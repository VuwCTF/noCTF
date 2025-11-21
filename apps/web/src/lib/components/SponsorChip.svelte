<script lang="ts">
  let { tier }: { tier: "Bronze" | "Silver" | "Gold" | "Platinum" } = $props();
</script>

<div
  class={`badge py-2 font-semibold pop ${
    tier === "Bronze"
      ? "bg-gradient-to-r from-yellow-800 via-yellow-600 to-yellow-400 text-black"
      : tier === "Silver"
      ? "bg-gradient-to-r from-gray-400 via-gray-200 to-white text-black"
      : tier === "Gold"
      ? "bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-200 text-black"
      : tier === "Platinum"
      ? "bg-gradient-to-r from-blue-800 via-blue-600 to-blue-400 text-white"
      : ""
  }`}
>
  {tier} Sponsor
</div>