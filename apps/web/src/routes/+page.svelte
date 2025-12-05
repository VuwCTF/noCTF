<script lang="ts">
  import DifficultyChip from "$lib/components/challenges/DifficultyChip.svelte";
  import SponsorChip from "$lib/components/SponsorChip.svelte";
  import configState from "$lib/state/config.svelte";
  import { onMount } from "svelte";
  onMount(() => {
    const startDate = new Date(1764968400000).getTime();
    const endDate = new Date(1765080000000).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      let distance = startDate - now;

      if (distance < 0) {
        if (now >= endDate) {
          document.getElementById("clock-header")!.innerHTML = (configState.siteConfig?.name || "VuwCTF 2025") + " has ended";
          clearInterval(interval);
          return;
        }
        distance = endDate - now;
        document.getElementById("clock-header")!.innerHTML = (configState.siteConfig?.name || "VuwCTF 2025") + " ends in";
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days")!.innerText = String(days).padStart(2, '0');
      document.getElementById("hours")!.innerText = String(hours).padStart(2, '0');
      document.getElementById("minutes")!.innerText = String(minutes).padStart(2, '0');
      document.getElementById("seconds")!.innerText = String(seconds).padStart(2, '0');
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
  });
</script>

<div class="h-20 flex justify-center items-end">
  <div class="center font-mono font-extrabold">
    <p id="clock-header" class="center text-5xl font-mono font-extrabold">
      {configState.siteConfig?.name || "VuwCTF 2025"} starts in
    </p>
  </div>
</div>
<div id="countdown-timer" class="mt-4 flex justify-center items-center">
  <div class="mx-5 text-center">
    <p id="days" class="text-6xl font-extrabold">00</p>
    <p class="text-xl font-semibold">days</p>
  </div>
  <div class="mx-5 text-center">
    <p id="hours" class="text-6xl font-extrabold">00</p>
    <p class="text-xl font-semibold">hours</p>
  </div>
  <div class="mx-5 text-center">
    <p id="minutes" class="text-6xl font-extrabold">00</p>
    <p class="text-xl font-semibold">minutes</p>
  </div>
  <div class="mx-5 text-center">
    <p id="seconds" class="text-6xl font-extrabold">00</p>
    <p class="text-xl font-semibold">seconds</p>
  </div>
</div>
<div class="m-auto article">
  <div style="width:fit-content" class="mt-10 m-auto center text-2xl font-bold">
    Welcome to VuwCTF 2025!
  </div>
  <div style="width:fit-content" class="mt-3 m-auto center text-m">
    Ticket support for <DifficultyChip difficulty="easy" /> challenges is available
    in our
    <a style="text-decoration:underline" href="https://discord.gg/AjMZVkwSx9"
      >Discord server</a
    > in #ticket-support. Please also direct any pertinent issues there.
  </div>
  <div style="width:fit-content" class="mt-3 m-auto center text-m">
    The top three placing teams in both the Tertiary and Secondary divisions
    will recieve $200, $120, and $60 NZD respectively, after verification of
    academic status. In addition, the first and second placing teams in both
    divisions will recieve 3 PentesterLab Pro 1 month subscriptions. Prize
    eligible teams may not consist of more than three participants. For more
    information on prize eligibility, please see the <a
      style="text-decoration: underline"
      href="/rules">rules page</a
    >.
  </div>
</div>
<div class="m-auto article">
  <div style="width:fit-content" class="mt-10 m-auto center text-2xl font-bold">
    Sponsors
  </div>
  <div style="width:fit-content" class="mt-3 m-auto center text-m">
    We're grateful for the support of our sponsors, without whom this event
    would not be possible.
  </div>

  <div
    style="grid-template-columns: 40% 60%"
    class="m-auto center text-m sponsor-grid silver"
  >
    <a href="https://carapace.nz" style="justify-self: center;">
      <img src="/sponsors/carapace.png" alt="Carapace logo" /></a
    >
    <div
      style="grid-column-start: 1; grid-row-start: 2; width: fit-content"
      class="m-auto mt-3"
    >
      <SponsorChip tier="Silver" />
    </div>
    <div style="grid-column-start: 2; grid-row: 1 / 2; padding: 20px">
      Carapace is a specialist security testing consultancy. We recognise the
      need to support and foster the next generation of amazing talent in this
      sector, so we're proud to sponsor VUWCTF 2025.
    </div>
  </div>

  <div class="m-auto center text-m sponsor-grid bronze">
    <a href="https://pentesterlab.com"
      ><img
        src="/sponsors/pentesterlab.png"
        alt="PentesterLab logo"
        style="grid-column-start: 1; grid-row-start: 1; padding: 10px; justify-self: center"
      /></a
    >
    <div
      style="grid-column-start: 1; grid-row-start: 2; width: fit-content; justify-self: center"
      class="m-auto mt-3"
    >
      <SponsorChip tier="Bronze" />
    </div>
  </div>
</div>

<style>
  .sponsor-grid {
    display: grid;
    margin-bottom: 0.5rem;
  }

  .silver img {
    max-height: 11rem;
    grid-column-start: 1;
    grid-row-start: 1 / 1;
    padding: 20px;
    padding-bottom: 0;
    justify-self: center;
  }

  .silver {
    /* width: fit-content; */
    grid-template-rows: auto 50px;
  }

  .bronze {
    width: 30%;
    grid-template-rows: 60px 50px;
  }

  .article {
    max-width: min(60vw, 900px);
    margin-bottom: 2rem;
  }

  @media (max-width: 1000px) {
    .sponsor-grid {
      display: block;
      width: auto;
      margin-bottom: 1.5rem;
    }

    .sponsor-grid img {
      max-width: 400px;
      margin: auto;
    }

    .silver {
      & img {
        padding-bottom: 15px;
      }
      & .mt-3 {
        margin-top: 0;
      }
    }

    .bronze img {
      max-width: 300px;
      width: 60vw;
    }

    .text-5xl {
      font-size: 1.8rem;
    }

    .text-6xl {
      font-size: 2rem;
    }
    .text-xl {
      font-size: 1rem;
    }

    .mx-5 {
      width: 80px;
      margin: 0.5rem;
    }

    .article {
      max-width: 85%;
    }
  }
</style>
