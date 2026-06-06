import { useEffect, useState } from "react";
import type { RaidCatalog, RaidbotsReport } from "./types";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

function App() {
  const [catalog, setCatalog] = useState<RaidCatalog | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [reportUrl, setReportUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [reportResult, setReportResult] = useState<RaidbotsReport | null>(null);
  const [reportError, setReportError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCatalog() {
      try {
        const res = await fetch(
          new URL("/loot/raid-items", BACKEND_URL).toString(),
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch raid catalog: ${res.status}`);
        }
        const data = await res.json();
        setCatalog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    fetchCatalog();
  }, []);

  async function handleAnalyze() {
    const trimmed = reportUrl.trim();
    if (!trimmed) return;

    setAnalyzing(true);
    setReportResult(null);
    setReportError(null);

    try {
      const res = await fetch(
        new URL("/raidbots/reports", BACKEND_URL).toString(),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ raidbotsReportUrl: trimmed }),
        },
      );

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        const msg =
          body?.message ??
          body?.error ??
          `Request failed with status ${res.status}`;
        throw new Error(msg);
      }

      const data: RaidbotsReport = await res.json();
      setReportResult(data);
    } catch (err) {
      setReportError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setAnalyzing(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>GuildHub</h1>
          <p>
            Loot council frontend for raid item tracking and distribution
            decisions.
          </p>
        </div>
      </header>

      <main>
        {/* Raidbots report analyzer */}
        <section className="panel">
          <h2>Raidbots Report Analyzer</h2>
          <p>
            Paste a Raidbots Droptimizer report URL to analyze potential
            upgrades.
          </p>
          <div className="analyzer-row">
            <input
              type="text"
              className="analyzer-input"
              placeholder="https://www.raidbots.com/simbot/report/..."
              value={reportUrl}
              onChange={(e) => setReportUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
              disabled={analyzing}
            />
            <button
              className="analyzer-btn"
              onClick={handleAnalyze}
              disabled={analyzing}
            >
              {analyzing ? "Analyzing…" : "Analyze"}
            </button>
          </div>
          {reportError && <p className="error-message">{reportError}</p>}
          {reportResult && (
            <div className="report-result">
              <h3>Report for {reportResult.playerName}</h3>
              <p>
                <strong>DPS Mean:</strong>{" "}
                {reportResult.playerDpsMean.toFixed(0)}
                {reportResult.playerSpec && (
                  <>
                    {" "}
                    &middot; <strong>Spec:</strong> {reportResult.playerSpec}
                  </>
                )}
              </p>
              {reportResult.reportItems &&
              reportResult.reportItems.length > 0 ? (
                <>
                  <p>
                    <strong>Upgrades found:</strong>{" "}
                    {reportResult.reportItems.length}
                  </p>
                  <div className="upgrade-list">
                    {reportResult.reportItems.map((ri) => (
                      <div key={ri.id} className="card upgrade-item">
                        <strong>{ri.itemName}</strong>
                        <p>
                          Your DPS: {ri.playerDpsMean.toFixed(0)} &rarr;
                          Upgrade: {ri.upgradeDpsMean.toFixed(0)}
                        </p>
                        <p className="improvement">
                          +{ri.dpsImprovement.toFixed(0)} DPS improvement
                        </p>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <p>No upgrades identified in this report.</p>
              )}
            </div>
          )}
        </section>

        {/* Raid Loot Catalog */}
        <section className="panel">
          <h2>Raid Loot Catalog</h2>
          <p>
            Fetched from the backend route <code>/loot/raid-items</code>.
          </p>
          {loading && <p>Loading raid catalog...</p>}
          {error && <p className="error-message">{error}</p>}
          {catalog && (
            <div className="catalog-list">
              {Object.entries(catalog).map(([raidName, bosses]) => (
                <div key={raidName} className="panel">
                  <h3>{raidName}</h3>
                  {Object.entries(bosses).map(([bossName, difficulties]) => (
                    <div key={bossName} className="boss-block">
                      <h4>{bossName}</h4>
                      {Object.entries(difficulties).map(
                        ([difficulty, payload]) => (
                          <div key={difficulty} className="card">
                            <h5>{difficulty}</h5>
                            {payload.items.map((item) => (
                              <div key={item.id} className="item-block">
                                <strong>{item.name}</strong>
                                <p>Item Level: {item.ilvl}</p>
                                <p>Patch: {item.sourcePatch}</p>
                                <div className="priority-list">
                                  <strong>Player priorities:</strong>
                                  <ul>
                                    {item.playersPriority.map((player) => (
                                      <li key={player.id}>
                                        {player.displayName} — {player.role} (
                                        {player.priority})
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        ),
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
