import { CSSProperties, Fragment } from "react";

// PRNG deterministik (seed 42) — sama persis dengan project vanilla,
// supaya arah/rotasi acak kata konsisten tiap reload.
function makeRand(seedInit = 42) {
  let seed = seedInit;
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

type Lines = string[];

function renderLines(lines: Lines, render: (line: string, key: number) => React.ReactNode) {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {render(line, i)}
      {i < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

// .split-words — kata per kata, delay linear
export function SplitWords({ lines, step = 0.045 }: { lines: Lines; step?: number }) {
  let idx = 0;
  return (
    <>
      {renderLines(lines, (line) =>
        line
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map((w) => {
            const d = idx++ * step;
            return (
              <Fragment key={`${w}-${idx}`}>
                <span className="word" style={{ transitionDelay: `${d}s` }}>
                  {w}
                </span>{" "}
              </Fragment>
            );
          })
      )}
    </>
  );
}

// .tagline-split — sama dengan split-words, step 0.03
export function TaglineSplit({ text }: { text: string }) {
  return <SplitWords lines={[text]} step={0.03} />;
}

// .split-words-fancy — kata dengan arah/rotasi acak deterministik
export function SplitWordsFancy({
  lines,
  baseDelay = 0,
}: {
  lines: Lines;
  baseDelay?: number;
}) {
  const rand = makeRand(42);
  let idx = 0;
  return (
    <>
      {renderLines(lines, (line) =>
        line
          .trim()
          .split(/\s+/)
          .filter(Boolean)
          .map((w) => {
            const dir = rand() > 0.5 ? 1 : -1;
            const rot = (rand() * 10 + 4) * dir;
            const dy = 10 + rand() * 14;
            const dx = rand() * 10 - 5;
            const style = {
              "--fword-rot": `${rot}deg`,
              "--fword-dy": `${dy}px`,
              "--fword-dx": `${dx}px`,
              transitionDelay: `${baseDelay + idx * 0.035}s`,
            } as CSSProperties;
            idx++;
            return (
              <Fragment key={`${w}-${idx}`}>
                <span className="fword" style={style}>
                  {w}
                </span>{" "}
              </Fragment>
            );
          })
      )}
    </>
  );
}

// .split-chars-fancy — karakter Jepang per karakter, delay 0.012
export function SplitCharsFancy({ text }: { text: string }) {
  const chars = Array.from(text.trim().replace(/\s+/g, ""));
  return (
    <>
      {chars.map((ch, i) => (
        <span key={i} className="fchar" style={{ transitionDelay: `${i * 0.012}s` }}>
          {ch}
        </span>
      ))}
    </>
  );
}

// .split-chars-wave — kata dengan efek scale+blur naik dari bawah
export function SplitWave({ text }: { text: string }) {
  const words = text.trim().replace(/\s+/g, " ").split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="wword" style={{ transitionDelay: `${i * 0.05}s` }}>
            {w}
          </span>{" "}
        </Fragment>
      ))}
    </>
  );
}
