import api from "$lib/api/index.svelte";
import { toasts } from "$lib/stores/toast";

interface Stats {
    points: number;
    pointGoal: number;
    stretchFactor: number;
}

class StatsState {
  stats?: Stats = $state();
  isInitialised: boolean = $state(false);

  constructor() {
    this.refresh();
  }

  async refresh() {
    try {
      const r = await api.GET("/points");
      if (r.data) {
        this.stats = r.data.data;
      }
    } catch (error) {
      toasts.error(`Unknown error: ${error}. Please try refreshing the page.`);
      console.error(`Unknown error: ${error}`);
    }
  }
}

const statsState = new StatsState();
export default statsState;
