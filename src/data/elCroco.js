// EL CROCO - THE LEGEND
export const EL_CROCO = {
  id: 'el_croco',
  name: 'EL CROCO',
  fullName: 'El Croco - The Untouchable',
  
  owner: {
    name: 'Kelvin Matheka Kyaka',
    tribe: 'Kamba',
    background: 'Businessman allegedly connected to powerful individuals',
    status: 'Urban legend + possible reality'
  },
  
  vehicle: {
    type: 'Private Van',
    model: 'Toyota Probox / Nissan Caravan variant',
    color: 'White',
    plateNumber: 'KCA Series (various stories)',
    distinguishing: 'Unmarked white van, no special features visible',
    year: 'Early 2000s era'
  },
  
  legend: {
    mainStory: 'A white van that allegedly had immunity from all traffic laws in Kenya. ' +
               'Police officers supposedly could not stop or fine this vehicle due to ' +
               'connections to high-ranking government officials.',
    
    famousIncident: 'Stories spread in early 2010s about a white van that could run red lights, ' +
                    'speed, overlap, and break any traffic rule without consequences. ' +
                    'Police would wave it through roadblocks.',
    
    origin: 'Name possibly derived from "crocodile" - dangerous, untouchable, above the food chain. ' +
            'Or from a specific vehicle registration code.',
    
    truthLevel: 'Mix of urban legend and possible truth. Some journalists investigated but ' +
                'found no conclusive evidence. However, the phrase entered Kenyan culture.',
    
    culturalImpact: 'Police officers started using "Hii gari ni El Croco?" as sarcastic phrase ' +
                    'when stopping violators, implying "You think you\'re above the law?"'
  },
  
  policeDialogues: [
    "Hii gari mnaendesha ivi kwani ni EL CROCO?!",
    "Hiyo pekee tu ndio tunaruhusu ibreak the laws!",
    "Unafikiri hii gari ni ya El Croco?!",
    "El Croco iko wapi? Hii ni gari ya kawaida!",
    "Kama si El Croco, fuata mimi station!",
    "Even El Croco angekaa hapa akipata hii speed!"
  ],
  
  gameImplementation: {
    appearance: 'Rare random spawn on road',
    behavior: 'Drives recklessly, ignores all traffic rules',
    policeReaction: 'Police ignore it completely',
    playerInteraction: 'If player collides, instant game over + special message',
    specialMessage: 'You hit El Croco! That\'s a death wish!',
    points: 0,
    frequency: 'Very rare (2% chance per game)'
  },
  
  mediaReferences: [
    'Multiple Kenyan blogs and forums discuss El Croco',
    'Social media memes about traffic laws',
    'Referenced in Kenyan comedy skits',
    'Used in traffic safety campaigns ironically'
  ],
  
  currentStatus: {
    reality: 'No confirmed current sightings',
    legacy: 'Phrase still used by police and in popular culture',
    symbolism: 'Represents perceived corruption and inequality in law enforcement'
  },
  
  visualRepresentation: {
    color: '#FFFFFF',
    style: 'Plain white van, no decorations',
    aura: 'Mysterious, slightly transparent effect',
    effect: 'Cars part way for it, police salute'
  }
};

export default EL_CROCO;
