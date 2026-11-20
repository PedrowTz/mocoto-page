import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IFOOD_URL } from "../links";
import "./Story.css";

gsap.registerPlugin(ScrollTrigger);

/* ==========================================================
   CENAS DA HISTÓRIA

   O palco fica preso na tela enquanto a pessoa rola: a cada
   cena muda a cor de fundo, o título gigante e o produto do
   centro. `accent` = índice da linha que recebe a cor de destaque.
   `side` = lado do texto; o produto vai para o lado oposto
   (no celular fica tudo centralizado: texto em cima, produto embaixo).
========================================================== */

const scenes = [
  {
    bg: "#e85c0d",
    ink: "#fff4e6",
    accentColor: "#ffc93c",
    side: "left",
    lines: ["MOCOTÓ", "DA ROSINHA", "SABOR QUE É RAIZ"],
    accent: 1,
    caption:
      "Mocotó caseiro, caprichado e preparado com aquele sabor que abraça.",
  },
  {
    bg: "#f8ead6",
    ink: "#2a1408",
    accentColor: "#e85c0d",
    side: "right",
    lines: ["FEITO NO", "CAPRICHO", "DA ROSINHA"],
    accent: 1,
    caption:
      "Ingredientes selecionados, temperados na medida certa e cozidos com tempo e carinho.",
  },
  {
    bg: "#a8240f",
    ink: "#fff4e6",
    accentColor: "#ffc93c",
    side: "left",
    lines: ["DO PANELÃO", "PRA SUA", "MESA"],
    accent: 2,
    caption:
      "Peça pelo iFood e receba em casa, ou retire no bairro João Paulo.",
  },
  {
    bg: "#f2b417",
    ink: "#2a1408",
    accentColor: "#a8310a",
    side: "right",
    lines: ["ACOMPANHA", "ARROZ E PIRÃO", "LIMÃO E FARINHA"],
    accent: 0,
    caption: "Todo pedido vem completo, do jeitinho que a família gosta.",
  },
];

/* Pose do produto em cada cena (o prato entra a partir da cena 3) */
const poses = [
  { rotation: -2, scale: 1, yPercent: 0 },
  { rotation: 2, scale: 1.1, yPercent: -3 },
  { rotation: -3, scale: 1, yPercent: 0 },
  { rotation: 4, scale: 1.08, yPercent: -3 },
];

const poseFor = (i, mobile) => ({
  ...poses[i],
  x: mobile ? 0 : scenes[i].side === "left" ? "21vw" : "-21vw",
});

/* ==========================================================
   PARTÍCULAS (azeitona e coentro tirados das fotos do prato)

   x / y = posição em % do palco, size = largura em px,
   depth = profundidade (0 fundo, 1 frente). Quanto mais perto,
   maior o movimento com o mouse/rolagem e mais desfocado.
   mobile: false = escondida em telas pequenas.
   As da frente (depth >= 0.6) ficam nas bordas para não cobrir o texto.
========================================================== */

const particles = [
  { img: "azeitona", x: 4, y: 16, size: 82, depth: 0.95 },
  { img: "coentro", x: 96, y: 34, size: 110, depth: 0.75 },
  { img: "azeitona", x: 86, y: 14, size: 56, depth: 0.7, mobile: false },
  { img: "coentro", x: 74, y: 28, size: 88, depth: 0.55 },
  { img: "azeitona", x: 95, y: 72, size: 104, depth: 1 },
  { img: "coentro", x: 2, y: 96, size: 124, depth: 0.95 },
  { img: "azeitona", x: 14, y: 74, size: 44, depth: 0.4 },
  { img: "coentro", x: 4, y: 52, size: 70, depth: 0.3 },
  { img: "azeitona", x: 50, y: 12, size: 30, depth: 0.25 },
  { img: "coentro", x: 40, y: 20, size: 58, depth: 0.45, mobile: false },
  { img: "azeitona", x: 30, y: 88, size: 38, depth: 0.5, mobile: false },
  { img: "coentro", x: 93, y: 90, size: 70, depth: 0.6, mobile: false },
  { img: "azeitona", x: 94, y: 50, size: 34, depth: 0.3, mobile: false },
  { img: "coentro", x: 57, y: 58, size: 48, depth: 0.2, mobile: false },
];

const FRONT_DEPTH = 0.6;

function Particle({ p }) {
  const blur = p.depth >= 0.9 ? 4 : p.depth <= 0.3 ? 1.5 : 0;

  return (
    <div
      className="particle"
      data-depth={p.depth}
      data-mobile={p.mobile === false ? "false" : "true"}
      style={{ left: `${p.x}%`, top: `${p.y}%`, "--size": p.size }}
    >
      <div className="particle-mouse">
        <img
          src={`/img/recortes/${p.img}.webp`}
          alt=""
          style={blur ? { filter: `blur(${blur}px)` } : undefined}
          draggable="false"
        />
      </div>
    </div>
  );
}

function Story() {
  const root = useRef(null);
  const timeline = useRef(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(root);
    const html = document.documentElement;

    const themeMeta = document.querySelector('meta[name="theme-color"]');

    // Header e barra do navegador do celular acompanham a cor da cena
    const paintHeader = (i) => {
      html.style.setProperty("--header-ink", scenes[i].ink);
      html.style.setProperty("--header-accent", scenes[i].accentColor);
      themeMeta?.setAttribute("content", scenes[i].bg);
    };

    paintHeader(0);
    document.body.classList.add("story-active");

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        finePointer: "(pointer: fine)",
        mobile: "(max-width: 860px)",
      },
      (context) => {
        const { motion, finePointer, mobile } = context.conditions;
        const q = gsap.utils.selector(root);
        const stage = q(".story-stage")[0];
        const product = q(".story-product")[0];

        gsap.set(product, poseFor(0, mobile));

        // Partículas flutuando sozinhas, sem depender de mouse ou rolagem
        if (motion) {
          q(".particle img").forEach((img) => {
            gsap.to(img, {
              y: "random(-16, 16)",
              rotation: "random(-25, 25)",
              duration: "random(2.6, 4.6)",
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
            });
          });

          gsap.to(q(".story-product-float"), {
            y: -14,
            duration: 2.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }

        // Mouse: partículas fogem em profundidade e o produto inclina em 3D
        let onMove;
        if (motion && finePointer) {
          const movers = q(".particle").map((el) => {
            const depth = Number(el.dataset.depth);
            const inner = el.querySelector(".particle-mouse");
            return {
              depth,
              x: gsap.quickTo(inner, "x", { duration: 0.9, ease: "power3" }),
              y: gsap.quickTo(inner, "y", { duration: 0.9, ease: "power3" }),
            };
          });

          const tilt = q(".story-product-tilt")[0];
          const tiltX = gsap.quickTo(tilt, "rotationY", { duration: 0.8, ease: "power3" });
          const tiltY = gsap.quickTo(tilt, "rotationX", { duration: 0.8, ease: "power3" });

          onMove = (e) => {
            const nx = (e.clientX / window.innerWidth) * 2 - 1;
            const ny = (e.clientY / window.innerHeight) * 2 - 1;
            movers.forEach((m) => {
              m.x(-nx * 70 * m.depth);
              m.y(-ny * 50 * m.depth);
            });
            tiltX(nx * 14);
            tiltY(-ny * 10);
          };

          window.addEventListener("pointermove", onMove);
        }

        // Sem animação (acessibilidade): fica só a primeira cena, estática
        if (!motion) {
          return () => {
            if (onMove) window.removeEventListener("pointermove", onMove);
          };
        }

        /* ---------- Linha do tempo controlada pela rolagem ---------- */

        const titles = q(".story-title");
        const captions = q(".story-caption");
        const pote = q(".story-pote")[0];
        const prato = q(".story-prato")[0];

        // As cenas 2+ começam escondidas no CSS; aqui elas ficam visíveis,
        // mas com as linhas "abaixo da máscara", prontas para subir
        gsap.set(titles.slice(1), { autoAlpha: 1 });
        titles.slice(1).forEach((t) =>
          gsap.set(t.querySelectorAll(".line-inner"), { yPercent: 160 })
        );

        const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
        timeline.current = tl;
        tl.addLabel("s0");

        scenes.forEach((scene, i) => {
          if (i === 0) return;

          const at = `t${i}`;
          tl.addLabel(at, "+=0.5");

          tl.to(titles[i - 1].querySelectorAll(".line-inner"), {
            yPercent: -160,
            stagger: 0.05,
            duration: 0.5,
            ease: "power3.in",
          }, at);

          tl.to(captions[i - 1], { autoAlpha: 0, y: -24, duration: 0.3 }, at);
          tl.to(stage, { backgroundColor: scene.bg, duration: 0.8 }, at);

          tl.fromTo(
            titles[i].querySelectorAll(".line-inner"),
            { yPercent: 160 },
            { yPercent: 0, stagger: 0.07, duration: 0.6, ease: "power3.out" },
            `${at}+=0.4`
          );

          tl.fromTo(
            captions[i],
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.4 },
            `${at}+=0.55`
          );

          tl.to(product, { ...poseFor(i, mobile), duration: 1 }, at);

          // Cena 3: o pote dá lugar ao prato servido
          if (i === 2) {
            tl.to(pote, { autoAlpha: 0, scale: 0.6, rotation: 25, duration: 0.6 }, at);
            tl.fromTo(
              prato,
              { autoAlpha: 0, scale: 0.6, rotation: -20 },
              { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.4)" },
              `${at}+=0.3`
            );
          }
          tl.addLabel(`s${i}`);
        });

        tl.to({}, { duration: 0.5 });

        // Rolagem contínua: partículas sobem em velocidades diferentes (parallax)
        q(".particle").forEach((el) => {
          const depth = Number(el.dataset.depth);
          tl.to(el, {
            y: -depth * window.innerHeight * 0.55,
            rotation: gsap.utils.random(-120, 120),
            ease: "none",
            duration: tl.duration(),
          }, 0);
        });

        const sceneTimes = scenes.map((_, i) => tl.labels[`s${i}`]);
        let current = 0;

        ScrollTrigger.create({
          animation: tl,
          trigger: root.current,
          start: "top top",
          end: () => `+=${window.innerHeight * scenes.length * 1.1}`,
          pin: stage,
          scrub: 0.8,
          snap: {
            snapTo: "labelsDirectional",
            duration: { min: 0.3, max: 0.9 },
            delay: 0.08,
            ease: "power2.inOut",
          },
          invalidateOnRefresh: true,
          onUpdate: () => {
            const t = tl.time();
            let idx = 0;
            sceneTimes.forEach((st, i) => {
              if (t >= st - 0.7) idx = i;
            });
            if (idx !== current) {
              current = idx;
              setActive(idx);
              paintHeader(idx);
            }
          },
          onToggle: (self) => {
            document.body.classList.toggle("story-active", self.isActive);
          },
        });

        return () => {
          if (onMove) window.removeEventListener("pointermove", onMove);
          timeline.current = null;
        };
      }
    );

    return () => {
      mm.revert();
      document.body.classList.remove("story-active");
    };
  }, []);

  const goTo = (i) => {
    const st = timeline.current?.scrollTrigger;
    if (!st) return;
    window.scrollTo({ top: st.labelToScroll(`s${i}`), behavior: "smooth" });
  };

  const back = particles.filter((p) => p.depth < FRONT_DEPTH);
  const front = particles.filter((p) => p.depth >= FRONT_DEPTH);

  return (
    <section className="story" id="inicio" ref={root}>
      <div className="story-stage">
        <div className="story-particles story-particles-back" aria-hidden="true">
          {back.map((p, i) => (
            <Particle p={p} key={`b${i}`} />
          ))}
        </div>

        <div className="story-titles">
          {scenes.map((scene, i) => {
            const Tag = i === 0 ? "h1" : "h2";
            return (
              <Tag
                className="story-title"
                data-side={scene.side}
                key={scene.lines.join()}
                style={{ color: scene.ink }}
                aria-hidden={i === active ? undefined : "true"}
              >
                {scene.lines.map((line, j) => (
                  <span
                    className="line"
                    key={line}
                    style={{
                      "--chars": line.length,
                      color: j === scene.accent ? scene.accentColor : undefined,
                    }}
                  >
                    <span className="line-inner">{line}</span>
                  </span>
                ))}
              </Tag>
            );
          })}
        </div>

        <div className="story-product">
          <div className="story-product-float">
            <div className="story-product-tilt">
              <img
                className="story-pote"
                src="/img/recortes/pote.webp"
                alt="Pote de Mocotó da Rosinha"
                draggable="false"
              />
              <img
                className="story-prato"
                src="/img/recortes/prato.webp"
                alt="Prato de mocotó servido"
                draggable="false"
              />
            </div>
          </div>
        </div>

        <div className="story-particles story-particles-front" aria-hidden="true">
          {front.map((p, i) => (
            <Particle p={p} key={`f${i}`} />
          ))}
        </div>

        <div className="story-captions">
          {scenes.map((scene, i) => (
            <div
              className="story-caption"
              data-side={scene.side}
              key={scene.caption}
              style={{ color: scene.ink }}
            >
              <p>{scene.caption}</p>

              {i === 0 && (
                <>
                  <div className="story-buttons">
                    <a
                      className="story-btn story-btn-primary"
                      href={IFOOD_URL}
                      target="_blank"
                      rel="noreferrer"
                    >
                      🛵 PEDIR PELO IFOOD <span>→</span>
                    </a>
                    <a className="story-btn story-btn-ghost" href="#tamanhos">
                      VER TAMANHOS
                    </a>
                  </div>
                  <small className="story-hours">
                    📅 Sábados e domingos · 11:00 às 15:00
                  </small>
                </>
              )}
            </div>
          ))}
        </div>

        <nav className="story-dots" aria-label="Cenas">
          {scenes.map((scene, i) => (
            <button
              key={scene.bg}
              className={i === active ? "is-active" : ""}
              style={{ "--dot": scene.ink }}
              onClick={() => goTo(i)}
              aria-label={`Ir para: ${scene.lines.join(" ")}`}
            />
          ))}
        </nav>

        <div className={`story-scroll-hint ${active === 0 ? "" : "is-hidden"}`}>
          <span className="mouse" />
          Role para descobrir
        </div>
      </div>
    </section>
  );
}

export default Story;
