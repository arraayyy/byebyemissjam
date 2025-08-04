interface CustomWindow extends Window {
  AudioContext: typeof AudioContext;
  webkitAudioContext: typeof AudioContext;
}

class SoundEffects {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private enabled: boolean = true;

  constructor() {
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      const w = window as unknown as CustomWindow;
      this.audioContext = new (w.AudioContext || w.webkitAudioContext)();
      if (this.audioContext) {
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
        this.gainNode.gain.value = 0.3;
      }
    } catch {
      console.warn('Web Audio API not supported');
    }
  }

  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine') {
    if (!this.audioContext || !this.gainNode || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const envelope = this.audioContext.createGain();

    oscillator.connect(envelope);
    envelope.connect(this.gainNode);

    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    oscillator.type = type;

    envelope.gain.setValueAtTime(0, this.audioContext.currentTime);
    envelope.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.01);
    envelope.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  hover() {
    this.createTone(800, 0.1, 'square');
  }

  click() {
    this.createTone(1200, 0.15, 'square');
    setTimeout(() => this.createTone(800, 0.1, 'square'), 50);
  }

  achievementUnlock() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((note, index) => {
      setTimeout(() => this.createTone(note, 0.2, 'triangle'), index * 100);
    });
  }

  // shellOpen: () => {
  //   // new Audio('/music/crystal-shatter.mp3').play();
  // },

  cardSelect() {
    this.createTone(1000, 0.2, 'triangle');
    setTimeout(() => this.createTone(1200, 0.15, 'sine'), 100);
  }

  memoryUnlock() {
    this.createTone(659, 0.3, 'triangle');
    setTimeout(() => this.createTone(784, 0.2, 'sine'), 150);
  }

  buttonPress() {
    this.createTone(440, 0.1, 'square');
  }

  error() {
    this.createTone(220, 0.5, 'sawtooth');
  }

  success() {
    const melody = [523, 659, 784];
    melody.forEach((note, index) => {
      setTimeout(() => this.createTone(note, 0.2, 'triangle'), index * 150);
    });
  }

  setVolume(volume: number) {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  playOceanAmbient() {
    if (!this.audioContext || !this.enabled) return;

    const createWave = () => {
      const frequency = 60 + Math.random() * 40;
      const duration = 2 + Math.random() * 3;
      this.createTone(frequency, duration, 'sine');
      
      setTimeout(createWave, 1000 + Math.random() * 2000);
    };

    createWave();
  }
}

export const soundEffects = new SoundEffects();