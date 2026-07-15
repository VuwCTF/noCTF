<script lang="ts">
  import DifficultyChip from "$lib/components/challenges/DifficultyChip.svelte";
  import SponsorChip from "$lib/components/SponsorChip.svelte";
  import configState from "$lib/state/config.svelte";
  import statsState from "$lib/state/stats.svelte";
  import { onMount } from "svelte";
  let currentTheme: string = "dark";

  onMount(() => {
    const storedTheme = localStorage.getItem("theme");
    currentTheme = storedTheme || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);

    const startDate = new Date(1785535200000).getTime();
    const endDate = new Date(1785646800000).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      let distance = startDate - now;

      if (distance < 0) {
        if (now >= endDate) {
          document.getElementById("clock-header")!.innerHTML =
            (configState.siteConfig?.name || "VuwCTF 2026") + " has ended";
          clearInterval(interval);
          return;
        }
        distance = endDate - now;
        document.getElementById("clock-header")!.innerHTML =
          (configState.siteConfig?.name || "VuwCTF 2026") + " ends in";
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("days")!.innerText = String(days).padStart(
        2,
        "0",
      );
      document.getElementById("hours")!.innerText = String(hours).padStart(
        2,
        "0",
      );
      document.getElementById("minutes")!.innerText = String(minutes).padStart(
        2,
        "0",
      );
      document.getElementById("seconds")!.innerText = String(seconds).padStart(
        2,
        "0",
      );
    };

    updateCountdown();
    var interval = setInterval(updateCountdown, 1000);
  });
</script>

<div
  style="height: {((statsState.stats?.points || 0) /
    (statsState.stats?.pointGoal || 100_000)) *
    400 +
    100}px;"
  class="h-80 flex justify-center"
>
  <img
    src="vuwse.svg"
    alt="A cartoonish drawing of a moose with antlers that spell Vuw and back markings that spell CTF"
  />
</div>

<div class="flex justify-center relative">
  <div class="h-10 mt-4 center progress-container">
    <div
      class="progress-bar"
      style="transform:translate3d(-{100 -
        ((statsState.stats?.points || 0) * 100) /
          (statsState.stats?.pointGoal || 100_000)}%, 0, 0);"
    ></div>
  </div>
  <p class="progress-text center">
    {statsState.stats?.points || 0}/{statsState.stats?.pointGoal || 100_000} points
  </p>
</div>

<div class="h-20 flex justify-center items-end">
  <div class="center font-mono font-extrabold">
    <p id="clock-header" class="center text-5xl font-mono font-extrabold">
      {configState.siteConfig?.name || "VuwCTF 2026"} starts in
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
    Welcome to VuwCTF 2026!
  </div>
  <div style="width:fit-content" class="mt-3 m-auto center text-m">
    Ticket support for <DifficultyChip difficulty="easy" /> challenges is available
    in our
    <a style="text-decoration:underline" href="https://discord.gg/hZKXMEpb69"
      >Discord server</a
    > in #ticket-support. Please also direct any pertinent issues there.
  </div>
  <div style="width:fit-content" class="mt-3 m-auto center text-m">
    The top three placing teams in both the Tertiary and Secondary divisions
    will recieve $400, $240, and $120 NZD respectively, after verification of
    academic status. Prize eligible teams may not consist of more than three
    participants. For more information on prize eligibility, please see the <a
      style="text-decoration: underline"
      href="/rules">rules page</a
    >.
  </div>
  <div style="width:fit-content" class="mt-3 m-auto center text-m">
    We'd also like to thank the DownUnderCTF / noCTF team for their support and
    for their software. Without their work this CTF would look a lot worse and
    would have drained a lot more of our sanity.
  </div>
</div>
<div class="m-auto article">
  <div style="width:fit-content" class="mt-10 m-auto center text-2xl font-bold">
    Sponsors
  </div>
  <div style="width:fit-content" class="mt-3 m-auto center text-m mb-8">
    We're grateful for the support of our sponsors, without whom this event
    would not be possible.
  </div>

  <div class="flex flex-col mb-8" style="align-items: center">
    <a href="https://catalystcloud.nz" class="mb-4" style="width: 70%;">
      <img src="/sponsors/catalyst-cloud.png" alt="Catalyst Cloud logo" /></a
    >
    <SponsorChip tier="Infra" />
  </div>

  <div class="flex flex-col mb-8" style="align-items: center">
    <div class="flex flex-row justify-center" style="align-items: center">
      <a href="https://yp.ieee.org/" class="m-4" style="width: 35%;">
        <img
          src={currentTheme === "dark" ? "/sponsors/ieee-yp-white.png" : "/sponsors/ieee-yp.png"}
          alt="IEEE Young Professionals logo"
        /></a
      >
      <a href="https://www.ieeefoundation.org" class="m-4" style="width: 35%;">
        <img
          src="/sponsors/ieee-foundation.png"
          alt="IEEE Foundation logo"
          width="100%"
        /></a
      >
    </div>
    <SponsorChip tier="Gold" />
  </div>

  <div class="flex flex-col mb-8" style="align-items: center">
    <a href="https://www.pakiki.co.nz/" class="mb-4" style="width: 50%;">
      <img src="/sponsors/pakiki.png" alt="Pākiki logo" /></a
    >
    <SponsorChip tier="Gold" />
  </div>

  <div class="flex flex-col mb-8" style="align-items: center">
    <a
      href="https://www.kordia.co.nz/cyber-security/advise"
      class="mb-4"
      style="width: 50%;"
    >
      <img
        src="/sponsors/aura-transparent.png"
        alt="Aura Information Security logo"
      /></a
    >
    <SponsorChip tier="Gold" />
    <p style="width:fit-content" class="mt-3 m-auto center text-m">
      Aura Information Security is a New Zealand cybersecurity consultancy
      founded in 2006, now part of the state-owned Kordia Group. They offer
      independent advisory, assurance, compliance and technical testing services
      to help organisations understand and reduce cyber risk. Their work covers
      five main areas: cybersecurity strategy and leadership advice for
      executives and boards; penetration testing and technical assurance across
      applications, infrastructure and cloud platforms; incident preparedness
      through response planning and scenario-based exercises. Aura combines deep
      technical expertise with broad enterprise-scale capability, so there's no
      need to choose between a narrow specialist and a generalist firm. Every
      piece of work is tailored to the specific environment and risk profile
      rather than relying on generic reports or off-the-shelf frameworks. Being
      part of a State-Owned Enterprise means data stays in New Zealand,
      consultants are vetted employees rather than contractors, and the
      organisation is Five-Eyes safe, important for anything touching data
      sovereignty. Aura has offices in Wellington, Auckland, Christchurch and
      Melbourne, holds CREST and government panel accreditations, and has been
      recognised as New Zealand's Best Security Company in 2017, 2018 and 2024.
    </p>
  </div>

  <div class="flex flex-col mb-8" style="align-items: center">
    <a href="https://catalystcloud.nz" class="mb-4" style="width: 30%;">
      <img src="/sponsors/carapace.png" alt="Carapace logo" /></a
    >
    <SponsorChip tier="Silver" />
  </div>
</div>

<style>
  .article {
    max-width: min(60vw, 900px);
    margin-bottom: 2rem;
  }

  @media (max-width: 1000px) {
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
