// AUDIO MANAGER - Kenyan Music & Sounds
import { getAllMatatuSongs, getSongByTimeOfDay } from '../data/matatuMusicReal';

class AudioManager {
  constructor() {
    this.currentMusic = null;
    this.musicVolume = 0.5;
    this.sfxVolume = 0.7;
    this.musicEnabled = true;
    this.sfxEnabled = true;
    
    // Sound effects (will work even without files - silent fallback)
    this.sfx = {
      horn: this.createAudio('/audio/sfx/horn.mp3'),
      engine: this.createAudio('/audio/sfx/engine.mp3'),
      conductor: this.createAudio('/audio/sfx/conductor-shout.mp3'),
      mpesa: this.createAudio('/audio/sfx/mpesa-beep.mp3'),
      police: this.createAudio('/audio/sfx/police-siren.mp3'),
      cash: this.createAudio('/audio/sfx/cash-collect.mp3'),
      collision: this.createAudio('/audio/sfx/crash.mp3'),
      pickup: this.createAudio('/audio/sfx/pickup.mp3')
    };
  }
  
  createAudio(src) {
    try {
      const audio = new Audio(src);
      audio.volume = this.sfxVolume;
      return audio;
    } catch (e) {
      console.log('Audio file not found:', src);
      return { play: () => {}, pause: () => {}, currentTime: 0 }; // Silent fallback
    }
  }
  
  playRandomMusic() {
    if (!this.musicEnabled) return;
    
    try {
      const song = getSongByTimeOfDay();
      if (song && song.file) {
        this.playMusic(song.file);
        console.log(`🎵 Now Playing: ${song.title} by ${song.artist}`);
      }
    } catch (e) {
      console.log('Music playlist not loaded yet');
    }
  }
  
  playMusic(src) {
    if (!this.musicEnabled) return;
    
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
    }
    
    try {
      this.currentMusic = new Audio(src);
      this.currentMusic.volume = this.musicVolume;
      this.currentMusic.loop = false;
      
      // Auto-play next song when current ends
      this.currentMusic.onended = () => {
        this.playRandomMusic();
      };
      
      this.currentMusic.play().catch(e => {
        console.log('Music autoplay blocked. Click to enable music.');
      });
    } catch (e) {
      console.log('Music file not found:', src);
    }
  }
  
  playSpecificSong(songId) {
    try {
      const allSongs = getAllMatatuSongs();
      const song = allSongs.find(s => s.id === songId);
      if (song) {
        this.playMusic(song.file);
        return song;
      }
    } catch (e) {
      console.log('Song not found:', songId);
    }
    return null;
  }
  
  stopMusic() {
    if (this.currentMusic) {
      this.currentMusic.pause();
      this.currentMusic.currentTime = 0;
    }
  }
  
  pauseMusic() {
    if (this.currentMusic) {
      this.currentMusic.pause();
    }
  }
  
  resumeMusic() {
    if (this.currentMusic && this.musicEnabled) {
      this.currentMusic.play().catch(e => console.log('Resume blocked'));
    }
  }
  
  playSFX(soundName) {
    if (!this.sfxEnabled) return;
    
    if (this.sfx[soundName]) {
      try {
        this.sfx[soundName].volume = this.sfxVolume;
        this.sfx[soundName].currentTime = 0;
        this.sfx[soundName].play().catch(e => {});
      } catch (e) {}
    }
  }
  
  setMusicVolume(volume) {
    this.musicVolume = volume;
    if (this.currentMusic) {
      this.currentMusic.volume = volume;
    }
  }
  
  setSFXVolume(volume) {
    this.sfxVolume = volume;
    Object.values(this.sfx).forEach(audio => {
      if (audio.volume !== undefined) {
        audio.volume = volume;
      }
    });
  }
  
  toggleMusic() {
    this.musicEnabled = !this.musicEnabled;
    if (!this.musicEnabled) {
      this.pauseMusic();
    } else {
      this.resumeMusic();
    }
    return this.musicEnabled;
  }
  
  toggleSFX() {
    this.sfxEnabled = !this.sfxEnabled;
    return this.sfxEnabled;
  }
  
  getCurrentSong() {
    return this.currentMusic ? {
      playing: !this.currentMusic.paused,
      currentTime: this.currentMusic.currentTime,
      duration: this.currentMusic.duration
    } : null;
  }
}

export default new AudioManager();
