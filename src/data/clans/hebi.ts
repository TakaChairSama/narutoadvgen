import { ClanFeature, ClanJutsu } from '../../types/naruto';

export const HEBI_FEATURES: ClanFeature[] = [
  {
    name: 'Serpentine Flexibility',
    description:
      'You can move through any space at least 6 inches wide without squeezing. You have advantage on checks and saves to escape grapples.',
    level: 1,
  },
  {
    name: 'Venomous Strike',
    description: 'Your unarmed strikes deal an additional 1d4 poison damage.',
    level: 3,
  },
  {
    name: 'Snake Transformation',
    description:
      'As a bonus action, you can transform into a snake for 1 minute, gaining advantage on Dexterity checks.',
    level: 7,
  },
];

export const HEBI_JUTSU: ClanJutsu[] = [
  {
    name: 'Striking Stance: Cobra',
    rank: 'D',
    chakraCost: 4,
    description:
      'Enter the coiling stance of a Cobra, ignoring temporary hit points with weapon and taijutsu attacks for 1 minute.',
    components: ['M'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: '1 Minute',
    keywords: ['Hijutsu', 'Bukijutsu'],
    effects: [
      'Weapon and taijutsu attacks made using a component weapon ignore temporary hit points, dealing direct damage.',
    ],
  },
  {
    name: 'Striking Stance: Python',
    rank: 'D',
    chakraCost: 5,
    description:
      'Enter the striking stance of a Python, dealing double damage with taijutsu attacks to creatures with AC bonuses or structures summoned by jutsu for 1 minute (max 2 times).',
    components: ['M', 'W (Broadsword, Kunai, Katana or Odachi)'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: '1 Minute',
    keywords: ['Hijutsu', 'Bukijutsu'],
    effects: [
      'Taijutsu attacks made using a component weapon deal double damage to creatures gaining a bonus to their AC or structures summoned by jutsu (max 2 times).',
    ],
  },
  {
    name: 'Striking Stance: Viper',
    rank: 'C',
    chakraCost: 7,
    description:
      'Enter the poisonous stance of a Viper, ignoring slashing resistance and damage reduction with weapon attacks and Hebi clan Bukijutsu for 1 minute.',
    components: ['W (Katana, Broadswords or Odachi)'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: 'Concentration, up to 1 minute',
    keywords: ['Hijutsu', 'Bukijutsu'],
    effects: [
      'Weapon attacks and Hebi clan Bukijutsu ignore slashing resistance and damage reduction, dealing direct damage.',
      'Component weapons can be used as components with Bukijutsu that requires Melee Piercing.',
    ],
  },
  {
    name: "Silver Cobra's Blessing",
    rank: 'A',
    chakraCost: 0,
    description:
      'Ingest a potent poison, reducing your Chakra to 0, gaining the Poisoned condition for 1 hour, and gaining several powerful effects for 1 minute. Special (Reduces current Chakra to 0)',
    components: ['HS', 'CM'],
    castingTime: '1 Bonus Action',
    range: 'Self',
    duration: 'Instant (Effects last 1 minute, then unconscious for 1 hour)',
    keywords: ['Hijutsu', 'Taijutsu'],
    effects: [
      'Gain the Poisoned condition for 1 hour (cannot be removed, resisted, or ignored).',
      'For 1 minute:',
      '  - Cannot suffer the effects of the Bruised, poisoned, weakened, or slowed condition.',
      '  - Taijutsu ability score increases by an amount equal to your Proficiency bonus.',
      '  - Can cast all Hebi clan jutsu at no cost.',
      '  - Hebi clan jutsu with the "Striking Stance:" prefix can be cast using an action, bonus action, or reaction.',
      '  - Can concentrate on up to 3 different Hebi Clan Jutsu, ignoring limitations on Striking Stances.',
      'After 1 minute, fall unconscious for 1 hour.',
      'Awake with 1 Chakra after 1 hour.',
    ],
  },
  {
    name: "Viper's Poisonous Wave",
    rank: 'B',
    chakraCost: 12,
    description:
      'Create a wave of poisonous Chakra, dealing 6d8 poison damage to creatures in a 10-foot wide, 30-foot long line.',
    components: ['HS', 'CM', 'W (Katana, Broadswords or Odachi)'],
    castingTime: '1 Action',
    range: 'Self (30 feet)',
    duration: 'Instant',
    keywords: ['Hijutsu', 'Bukijutsu'],
    effects: [
      'Creatures in a 10-foot wide, 30-foot long line must make a Dexterity saving throw.',
      'On a failed save, take 6d8 poison damage.',
      'On a successful save, take half damage.',
      'If the weapon is under the effects of Mamba’s Poisonous Blade or the Poison Potency Hebi Clan Feature, creatures make their save with a -2 penalty.',
      'If the weapon is under the effects of both Mamba’s Poisonous Blade and the Poison Potency Hebi Clan Feature, deal 6d12 poison damage instead.',
      "At Higher Ranks: For each rank above B-Rank, increase the cost by 3 and damage by 2d8 (or 2d10 with both Mamba's Poisonous Blade and Poison Potency).",
    ],
  },
];

export const HEBI_REQUIREMENTS = {
  abilityScores: {
    Dexterity: 13,
  },
  features: ['Must form pact with snake spirits'],
  restrictions: ['Must periodically shed skin'],
};
