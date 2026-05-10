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
        onloaderror: (id, err) => {
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
        onplayerror: (id, err) => console.warn("Erro no play de destrave:", err)
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
}

export const soundManager = new SoundManager();
