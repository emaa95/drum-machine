import { useState, useEffect } from 'react'
import './App.css'
import { Switch, Typography } from '@mui/material';

function App() {
  
  const [displayText, setDisplayText] = useState('');
  const [volume, setVolume] = useState(1);
  const [power, setPower] = useState(true);
  const [selectedSoundGroup, setSelectedSoundGroup] = useState('heaterKit');

  const firstSoundsGroup = [
    {
      keyCode: 81,
      key: 'Q',
      id: 'Heater-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    {
      keyCode: 87,
      key: 'W',
      id: 'Heater-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    {
      keyCode: 69,
      key: 'E',
      id: 'Heater-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    {
      keyCode: 65,
      key: 'A',
      id: 'Heater-4',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    {
      keyCode: 83,
      key: 'S',
      id: 'Clap',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    {
      keyCode: 68,
      key: 'D',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    {
      keyCode: 90,
      key: 'Z',
      id: "Kick-n'-Hat",
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    {
      keyCode: 88,
      key: 'X',
      id: 'Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    {
      keyCode: 67,
      key: 'C',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ];

const secondSoundsGroup = [
    {
      keyCode: 81,
      key: 'Q',
      id: 'Chord-1',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      keyCode: 87,
      key: 'W',
      id: 'Chord-2',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      keyCode: 69,
      key: 'E',
      id: 'Chord-3',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      keyCode: 65,
      key: 'A',
      id: 'Shaker',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
    },
    {
      keyCode: 83,
      key: 'S',
      id: 'Open-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
    },
    {
      keyCode: 68,
      key: 'D',
      id: 'Closed-HH',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      keyCode: 90,
      key: 'Z',
      id: 'Punchy-Kick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      keyCode: 88,
      key: 'X',
      id: 'Side-Stick',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      keyCode: 67,
      key: 'C',
      id: 'Snare',
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
    }
  ];

  const soundsName = {
    heaterKit: "Heater Kit",
    smoothPianoKit: "Smooth Piano Kit"
  };
  
  const soundsGroup = {
    heaterKit: firstSoundsGroup,
    smoothPianoKit: secondSoundsGroup
  }

  const handleSoundGroupChange = () => {
    setSelectedSoundGroup((prevGroup) =>
      prevGroup === 'heaterKit' ? 'smoothPianoKit' : 'heaterKit'
    );
    setDisplayText(`${soundsName[selectedSoundGroup]}`);
  };

  const loadSound = (keyCode) => {
    try {
      const pad = soundsGroup[selectedSoundGroup].find((pad) => pad.keyCode === keyCode);
      if (power && pad) {
        const audio = new Audio(pad.url);
        audio.volume = volume;
        return audio;
      }
      return null;
    } catch (error) {
      console.error('Error al cargar el sonido:', error);
      return null;
    }
  };
  

  const playSound = (keyCode) => {
    try {
      const audio = loadSound(keyCode);
      if (audio) {
        audio.play();
      }
    } catch (error) {
      console.error('Error al reproducir el sonido:', error);
    }
  };


  const handleDrumPadClick = (drumPad) => {
    if (power) {
      playSound(drumPad.keyCode);
      setDisplayText(drumPad.id);
      console.log(drumPad.key);
    }
  };

  const handleKeyDown = (e) => {
    if (power) {
      const keyCode = e.keyCode;
      const pad = soundsGroup[selectedSoundGroup].find((pad) => pad.keyCode === keyCode);
      if (pad) {
        playSound(keyCode);
        setDisplayText(pad.id);
      } else {
        console.log("no se encuentra el pad")
      }
    }
  };
  
  const handlePowerButtonClick = () => {
    setPower(!power);
    setDisplayText(power ? 'Power Off' : 'Power On');
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume * 0.01);
    setDisplayText(`Volume: ${newVolume}`) // Ajusta el volumen a un rango de 0 a 1
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [power]);

  return (
    <div id="drum-machine">
      <div className="drum-pads">
        {soundsGroup[selectedSoundGroup].map(drumPad => (
          <div
            key={drumPad.keyCode}
            className="drum-pad"
            id={drumPad.key}
            onClick={() => handleDrumPadClick(drumPad)}
          >
            <audio className='clip' id={drumPad.key} src={drumPad.url}></audio>
            {console.log(document.querySelectorAll('audio'))}
            {drumPad.key}
          </div>
        ))}
      </div>

      <div id="display">
        <div id='button-power'>      
          <button onClick={handlePowerButtonClick}>{power ? 'Power Off' : 'Power On'}</button>
        </div>
        <div className='display-text'>
        {displayText}
        </div>
        <div className="volume-slider-container">
          <label htmlFor="volume-slider"></label>
          <input
            type="range"
            id="volume-slider"
            min="0"
            max="100"
            step="1"
            value={volume * 100}
            onChange={handleVolumeChange}
          />
        </div>
        <div id='switch-sounds'>
          <Typography variant="h4" >
              Bank
          </Typography>
          <Switch checked={selectedSoundGroup === 'smoothPianoKit'}
          onChange={handleSoundGroupChange}/>
        </div>
        </div>
    </div>
  )
}

export default App
