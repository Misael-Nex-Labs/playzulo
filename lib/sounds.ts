import { Howl, Howler } from "howler";

class SoundManager {
  private popSound: Howl | null = null;
  private successSound: Howl | null = null;

  private init() {
    if (typeof window === "undefined") return;

    if (!this.popSound) {
      this.popSound = new Howl({
        // Agora o código procura o arquivo que VOCÊ colocar na pasta public/sounds/
        src: ["/sounds/pop.mp3"],
        volume: 0.7,
        preload: true,
        onload: () => console.log("✅ Seu arquivo pop.mp3 foi carregado com sucesso!"),
        onloaderror: () => {
          console.warn("📂 Aguardando o arquivo /public/sounds/pop.mp3 ser adicionado...");
        }
      });
    }

    if (!this.successSound) {
      this.successSound = new Howl({
        src: ["/sounds/success.mp3"],
        volume: 0.5,
        preload: true,
        onload: () => console.log("✅ Seu arquivo success.mp3 foi carregado!"),
      });
    }
  }

  /**
   * Força o desbloqueio do áudio no navegador.
   * Deve ser chamado em um evento de clique do usuário.
   */
  public unlock() {
    try {
      this.init();
      console.log("🔓 Tentando destravar áudio...");
      
      if (Howler.ctx && Howler.ctx.state === "suspended") {
        Howler.ctx.resume().catch(e => console.warn("Erro ao resumir context:", e));
      }

      // Toca um som silencioso
      const silence = new Howl({
        src: ['data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='],
        onplay: () => console.log("🔊 Áudio destravado!"),
        onplayerror: () => console.warn("Erro no play de destrave")
      });
      silence.play();
    } catch (e) {
      console.error("Falha crítica no unlock de áudio:", e);
    }
  }

  public playPop() {
    this.init();
    
    // Disparamos o play sem await para latência zero
    if (this.popSound && this.popSound.state() === "loaded") {
      // Garantimos que o som comece do início absoluto
      this.popSound.stop(); 
      this.popSound.play();
    } else {
      console.log("🫧 (Som de Pop solicitado, mas arquivo não carregado)");
    }

    // Acordamos o contexto em background para o próximo clique
    const ctx = Howler.ctx;
    if (ctx && ctx.state === "suspended") {
      ctx.resume();
    }
  }

  public async playSuccess() {
    this.init();
    if (this.successSound && this.successSound.state() === "loaded") {
      this.successSound.play();
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (Howler.ctx) {
      if (Howler.ctx.state === "suspended") {
        Howler.ctx.resume().catch(() => {});
      }
      return Howler.ctx as AudioContext;
    }
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.fallbackCtx) {
      this.fallbackCtx = new AudioCtx();
    }
    if (this.fallbackCtx.state === "suspended") {
      this.fallbackCtx.resume().catch(() => {});
    }
    return this.fallbackCtx;
  }

  private fallbackCtx: AudioContext | null = null;

  /**
   * Toca uma nota suave de marimba/kalimba em baixa/média frequência (escala pentatônica zen)
   */
  public playStarChime(starIndex = 0) {
    this.init();
    const rates = [0.85, 0.92, 1.0, 1.08, 1.15, 1.22, 0.96, 1.12];
    const rate = rates[starIndex % rates.length];

    if (this.popSound && this.popSound.state() === "loaded") {
      const id = this.popSound.play();
      this.popSound.rate(rate, id);
    }

    const ctx = this.getAudioContext();
    if (!ctx) return;

    // Frequências suaves pentatônicas em oitava média-baixa (C3 a A4, sem agudos estridentes)
    const pentatonicFreqs = [196.0, 220.0, 261.63, 293.66, 329.63, 392.0, 440.0, 246.94];
    const freq = pentatonicFreqs[starIndex % pentatonicFreqs.length];
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Harmônico suave de madeira/kalimba uma oitava abaixo
    subOsc.type = "triangle";
    subOsc.frequency.setValueAtTime(freq * 0.5, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.16, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.85);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + 0.9);
    subOsc.stop(now + 0.9);
  }

  /**
   * Toca um som único e acolhedor para cada número (1 a 10), com timbres graves/médios suaves
   * de marimba, xilofone de madeira e hang drum.
   */
  public playNumberSound(num: number) {
    this.init();

    // Varia levemente o tom do som de madeira base
    if (this.popSound && this.popSound.state() === "loaded") {
      const rate = 0.78 + (num % 10) * 0.045;
      const id = this.popSound.play();
      this.popSound.rate(rate, id);
    }

    const ctx = this.getAudioContext();
    if (!ctx) return;

    // Desenho sonoro distinto por número (sempre em frequências baixas/médias: 146Hz a 392Hz)
    const patterns: Record<number, { notes: number[]; wave: OscillatorType; spacing: number; duration: number }> = {
      1: { notes: [196.0], wave: "sine", spacing: 0.12, duration: 0.65 }, // G3 - Toque único profundo de marimba
      2: { notes: [196.0, 261.63], wave: "triangle", spacing: 0.14, duration: 0.55 }, // G3 -> C4 - Duplo bloco de madeira
      3: { notes: [196.0, 246.94, 293.66], wave: "sine", spacing: 0.11, duration: 0.55 }, // Tríade suave ascendente
      4: { notes: [220.0, 261.63, 293.66, 329.63], wave: "triangle", spacing: 0.1, duration: 0.5 }, // Quatro passos de xilofone
      5: { notes: [174.61, 220.0, 261.63], wave: "sine", spacing: 0.06, duration: 0.75 }, // Acorde aveludado de hang drum
      6: { notes: [261.63, 293.66, 329.63, 261.63, 329.63, 392.0], wave: "sine", spacing: 0.08, duration: 0.45 }, // Balanço rítmico suave
      7: { notes: [196.0, 220.0, 261.63, 293.66, 329.63], wave: "triangle", spacing: 0.09, duration: 0.6 }, // Brisa melódica pentatônica
      8: { notes: [329.63, 293.66, 261.63, 220.0, 261.63, 329.63], wave: "sine", spacing: 0.08, duration: 0.5 }, // Cascata de madeira
      9: { notes: [196.0, 246.94, 293.66, 369.99], wave: "triangle", spacing: 0.09, duration: 0.7 }, // Acorde quente de kalimba
      10: { notes: [196.0, 261.63, 329.63, 392.0], wave: "sine", spacing: 0.1, duration: 0.85 }, // Celebração suave de sino grave
    };

    const config = patterns[num] || patterns[1];
    const now = ctx.currentTime;

    config.notes.forEach((freq, idx) => {
      const startTime = now + idx * config.spacing;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = config.wave;
      osc.frequency.setValueAtTime(freq, startTime);

      // Filtro passa-baixa para garantir som abafado/orgânico de madeira
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(650, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.exponentialRampToValueAtTime(0.14, startTime + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + config.duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + config.duration + 0.05);
    });
  }
}

export const soundManager = new SoundManager();

