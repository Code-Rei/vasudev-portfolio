// Lightweight Web Audio API Synthesizer inspired by DhvanilPatel/swarm-cursors (Joel Califa's Swarm)
// 100% synthesized in-browser, zero external audio files or network requests.

const PENTATONIC_PITCHES = [
  52, // E3
  55, // G3
  57, // A3
  59, // B3
  62, // D4
  64, // E4
  67, // G4
  69, // A4
  71, // B4
  74, // D5
  76, // E5
];

class SwarmSoundEngine {
  constructor() {
    this.enabled = true;
    this.ctx = null;
    this.masterGain = null;
  }

  init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx({ latencyHint: 'interactive' });
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.enabled ? 0.35 : 0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    } catch (_) {}
  }

  toggleSound() {
    this.enabled = !this.enabled;
    if (this.ctx && this.masterGain) {
      if (this.ctx.state === 'suspended' && this.enabled) {
        this.ctx.resume().catch(() => {});
      }
      const t = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(t);
      this.masterGain.gain.setValueAtTime(this.enabled ? 0.35 : 0, t);
    }
    return this.enabled;
  }

  ensureRunning() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  // Pentatonic glass-piano note (panned to cursor's X coordinate)
  playGlassChime(stepIndex = 0, panX = 0) {
    if (!this.enabled) return;
    this.ensureRunning();
    if (!this.ctx || this.ctx.state !== 'running') return;

    try {
      const pitch = PENTATONIC_PITCHES[stepIndex % PENTATONIC_PITCHES.length];
      const freq = 440 * Math.pow(2, (pitch - 69) / 12);
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2.756, now); // Inharmonic partial for glass texture

      // Quick bell/glass envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.24, now + 0.006);
      gain.gain.exponentialRampToValueAtTime(0.0002, now + 0.7);

      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        const clampedPan = Math.max(-0.8, Math.min(0.8, panX));
        panner.pan.setValueAtTime(clampedPan, now);
        osc.connect(gain);
        oscHarmonic.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain);
      } else {
        osc.connect(gain);
        oscHarmonic.connect(gain);
        gain.connect(this.masterGain);
      }

      osc.start(now);
      oscHarmonic.start(now);
      osc.stop(now + 0.75);
      oscHarmonic.stop(now + 0.75);
    } catch (_) {}
  }

  // Crisp mechanical snap click (when dragging or snapping a box into grid)
  playSnapClick(panX = 0) {
    if (!this.enabled) return;
    this.ensureRunning();
    if (!this.ctx || this.ctx.state !== 'running') return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.022);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

      if (this.ctx.createStereoPanner) {
        const panner = this.ctx.createStereoPanner();
        panner.pan.setValueAtTime(Math.max(-0.8, Math.min(0.8, panX)), now);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(this.masterGain);
      } else {
        osc.connect(gain);
        gain.connect(this.masterGain);
      }

      osc.start(now);
      osc.stop(now + 0.035);
    } catch (_) {}
  }
}

export const swarmSound = new SwarmSoundEngine();
