import { siteConfig } from "./config/siteConfig";
import { Background } from "./components/Background";
import { Header } from "./components/Header";
import { LinkCard } from "./components/LinkCard";
import { Footer } from "./components/Footer";
import { ShareButton } from "./components/ShareButton";

function App() {
  return (
    <div className="relative min-h-dvh">
      <Background />
      <ShareButton />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-xl flex-col px-4 py-10 sm:px-6 sm:py-14">
        <Header />

        <main className="mt-8 flex-1">
          <ul className="flex flex-col gap-3.5">
            {siteConfig.links.map((link, index) => (
              <li
                key={`${link.title}-${link.url}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(index * 70, 500)}ms` }}
              >
                <LinkCard link={link} />
              </li>
            ))}
          </ul>

          {siteConfig.links.length === 0 && (
            <p className="mt-10 text-center text-sm text-brand-muted">
              Noch keine Links eingetragen. Füge welche in{" "}
              <code className="rounded bg-brand-surface px-1.5 py-0.5">
                src/config/siteConfig.ts
              </code>{" "}
              hinzu.
            </p>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
