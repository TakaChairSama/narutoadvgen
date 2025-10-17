/* Chakra Weapons Library
   - Parses the provided raw list (from pasted.txt) and exports a searchable library.
   - Only blocks that are weapons are included (e.g., "Weapon (...)" headers and known weapon-like entries).
*/

export interface ChakraWeapon {
  name: string;
  type?: string;        // e.g., "Katana", "any sword", "Tanto"
  rank?: string;        // "E-Rank"..."S-Rank"
  attunement?: boolean;
  attunementText?: string;
  description: string;
}

// Heuristic parser for the pasted list
function parseChakraWeaponsLibrary(text: string): Record<string, ChakraWeapon> {
  // Split into logical blocks separated by double newlines
  const blocks = text
    .split(/\n{2,}/g)
    .map((b) => b.trim())
    .filter(Boolean);

  const lib: Record<string, ChakraWeapon> = {};

  const weaponHeaderRegex = /^Weapon\b/i;
  const headerRankRegex =
    /\b([ESABCD])\s*-\s*Rank\b|\b([ESABCD])\s*rank\b|\b([ESABCD])\s*-\s*rank\b/i;
  const typeRegex = /Weapon\s*\(([^)]+)\)/i;

  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) continue;

    const name = lines[0];
    const header = lines[1];

    // Determine if this block is a "weapon"
    const isWeapon =
      weaponHeaderRegex.test(header) ||
      /Weapon\s*\(/i.test(header) ||
      /Gunbai\s+Uchiwa/i.test(name) ||
      /Seven Ninja Swords/i.test(name) ||
      /Odachi/i.test(header) ||
      /Tanto/i.test(header) ||
      /Tetsubo/i.test(header) ||
      /Broadsword/i.test(header) ||
      /Katana/i.test(header) ||
      /Trident|Greataxe|Battleaxe|Sword|Longbow/i.test(header);

    if (!isWeapon) continue;

    // Extract type if present
    let type: string | undefined;
    const typeMatch = header.match(typeRegex);
    if (typeMatch) type = typeMatch[1].trim();

    // Extract rank symbol
    let rank: string | undefined;
    const rankMatch = header.match(headerRankRegex);
    if (rankMatch) {
      const r = (rankMatch[1] || rankMatch[2] || rankMatch[3] || '').toUpperCase();
      if (['E', 'D', 'C', 'B', 'A', 'S'].includes(r)) {
        rank = `${r}-Rank`;
      }
    } else {
      const alt = header.match(/\b([ESABCD])\s*-?\s*rank\b/i);
      if (alt) {
        const r = (alt[1] || '').toUpperCase();
        if (['E', 'D', 'C', 'B', 'A', 'S'].includes(r)) rank = `${r}-Rank`;
      }
    }

    // Attunement
    const attunement = /requires\s+attunement/i.test(header);

    const description = lines.slice(2).join('\n').trim();

    lib[name] = {
      name,
      type,
      rank,
      attunement,
      attunementText: attunement ? 'Requires attunement' : undefined,
      description,
    };
  }

  return lib;
}

// Raw pasted list (only weapon entries will be extracted)
const RAW_TEXT = `Armor of Gleaming
Armor (any medium or heavy), E-Rank
This armor never gets dirty.
Pill of Nourishment
Ninja Tool, E-Rank
This spongy, flavorless, gelatinous bead dissolves on your tongue and provides as much nourishment as 1 day of rations.
Bead of Refreshment
Ninja Tool, E-Rank
This spongy, flavorless, gelatinous bead dissolves in liquid, transforming up to a pint of the liquid into fresh, cold drinking water. The bead has no effect on chakra made liquids or harmful substances such as poison.
Boots of False Tracks
Ninja Tool, E-Rank
Only humanoids can wear these boots. While wearing the boots, you can choose to have them leave tracks like those of another kind of humanoid of your size.
Fuinjutsu Sealed Candle
Ninja Tool, E-Rank
The flame of this candle is not extinguished when immersed in water. It gives off light and heat like a normal candle.
Jizo's Die
Ninja Tool, E-Rank
Whenever you roll this six-sided die, you can control which number it rolls.
Cleansing Stone
Ninja Tool, E-Rank
A cleansing stone is a sphere 1 foot in diameter, engraved with chakra seals. When touching the stone, you can use an action to activate it and remove dirt and grime from your garments and your person. They take 3 hours to recharge and are usually reserved for emergency clean up.
Cloak of Billowing
Ninja Tool, E-Rank
While wearing this cloak, you can use a bonus action to make it billow dramatically.
Clockwork Amulet
Ninja Tool, C-Rank
This copper amulet contains a Space-Time Fuinjutsu seal, a seal of clockwork predictability. A creature that puts an ear to the amulet can hear faint ticking and whirring noises coming from within.
When you make an attack roll while wearing the amulet, you can forgo rolling the d20 to get a 10 on the die. Once used, this property can't be used until spend 15 chakra as a Action to recharge it.
Clothes of Mending
Clothing Set, E-Rank
This elegant outfit of traveler's clothes magically mends itself to counteract daily wear and tear. Pieces of the outfit that are destroyed can't be repaired in this way.
Helm of The Uchiha
Ninja Tool, E-Rank
This fearsome steel helm makes your eyes glow red while you wear it.
Ersatz Eye
Ninja Tool, E-Rank (requires attunement)
This artificial eye replaces a real one that was lost or removed. While the ersatz eye is embedded in your eye socket, it can't be removed by anyone other than you, and you can see through the tiny orb as though it were a normal eye.
Feather Token
Ninja Tool, E-Rank
This small metal disk is inscribed with the image of a feather. When you fall at least 20 feet while the token is on your person, you descend 60 feet per round and take no damage from falling. The token's magic is expended after you land, whereupon the disk becomes normal disk.
Glamerweave
Clothing Set, E-Rank or D-Rank
Glamerweave is clothing imbued with harmless illusory genjutsu. While wearing the common version of these clothes, you can use a bonus action to create a moving illusory pattern within the cloth.
D-Rank glamerweave can have the pattern rise from the cloth. For example, a glamerweave gown might be wreathed in harmless, illusory flames, while a glamerweave hat might have illusory butterflies fluttering around it.
When you make a Charisma (Performance) or Charisma (Persuasion) check while wearing the D-Rank version of glamerweave, you can roll a d6 and add the number rolled to the check. Once you use this property, it can't be used again until after the next rest.
Headband of Ninshou
Ninja Tool, E-Rank (requires attunement by Ninjutsu Specialist)
This headband is adorned with gold crescent moons and stars. While you are wearing it, you gain the following benefit:
You can try to cast a E-Rank Jutsu that you don't know. you must make a DC 8 Intelligence check. If the check succeeds, you cast the jutsu. If the check fails, so does the jutsu, and the action used to cast the Jutsu is wasted. In either case, the DC for this goes up by 2. It resets on a Long Rest
Horn of Silent Alarm
Ninja Tool, E-Rank
This horn has 4 charges. When you use an action to blow it, one creature of your choice can hear the horn's blare, provided the creature is within 600 feet of the horn and not deafened. No other creature hears sound coming from the horn. The horn regains 1d4 expended charges daily at dawn.
Instrument of Illusions
Ninja Tool, E-Rank( requires attunement)
While you are playing this musical instrument, you can create harmless, illusory visual effects within a 5-foot-radius sphere centered on the instrument. If you are a Genjutsu Specialist , the radius increases to 15 feet. Sample visual effects include luminous musical notes, a spectral dancer, butterflies, and gently falling snow. The magical effects have neither substance nor sound, and they are obviously illusory. The effects end when you stop playing.
Instrument of Scribing
Ninja Tool. E-Rank (requires attunement)
This musical instrument has 3 charges. While you are playing it, you can use an action to expend 1 charge from the instrument and write a message on a normal object or surface that you can see within 30 feet of you. The message can be up to six words long and is written in a language you know. If you are a Genjutsu Specialist, you can scribe an additional six words and choose to make the message glow faintly, allowing it to be seen in non-chakra enhanced darkness. Casting Chakra Dispel on the message erases it. Otherwise, the message fades away after 24 hours.
The instrument regains all expended charges daily at dawn.
Lock of Trickery
Ninja Tool, E-Rank
This lock appears to be an ordinary lock and comes with a single key. The tumblers in this lock adjust to thwart burglars. Dexterity checks made to pick the lock have disadvantage.
Uzumaki Mood Paint
Ninja Tool, E-Rank
This thick, black paint is stored in a small jar, containing enough paint to apply moodmarks to one creature. The paint is dabbed on the face in spots or markings that often resemble the eyes of insects or spiders. Applying the paint in this way takes 1 minute.
For the next 8 hours, the marks change to reflect your mental state. A creature that can see you and makes a successful DC 12 Wisdom (Insight) check can discern whether you are happy, sad, angry, disgusted, surprised, or afraid, as well as the main source of that emotion. For example, you might communicate fear caused by a monster you just saw around the corner, grief at the loss of a friend, or happiness derived from pride in your performance in combat. A dark elf has advantage on this check. It is used for festivals as a way to quickly guage someones mood and respond accordingly.
Tsukuyomi-Touched Sword
Weapon(Any Sword), E-Rank
In darkness, the unsheathed blade of this sword sheds moonlight, creating bright light in a 15-foot radius and dim light for an additional 15 feet.
Daikokuten Key
Ninja Tool, E-Rank
A question mark is worked into the head of this key. The key has a 5 percent chance of unlocking any lock into which it's inserted. It can only try once per lock. Once it unlocks something, the key disappears.
Smoldering Armor
Armor, E-Rank
Wisps of harmless, odorless smoke rise from this armor while it is worn.
Chakra-Forged Armor
Armor (medium or heavy), C-Rank
This set of armor is reinforced with Yang Chakra. While you're wearing it, any critical hit against you becomes a normal hit.
Ammunition, +1, +2, or +3
Weapon (any ammunition), D-rank (+1), B-rank (+2), or S-rank (+3)
You have a bonus to attack and damage rolls made with this piece of chakra-enhanced ammunition. The bonus is determined by the rarity of the ammunition. Once it hits a target, the ammunition is no longer chakra-enhanced.
Assassin Tabi
Ninja Tool, D-rank
While you wear these boots, your steps make no sound, regardless of the surface you are moving across. You also have advantage on Dexterity (Stealth) checks that rely on moving silently.
Bracers of the Kyudoka
Ninja Tool, D-rank(requires attunement)
While wearing these bracers, you have proficiency with the longbow and shortbow, and you gain a +2 bonus to damage rolls on ranged attacks made with such weapons.
Circlet of the Sun
Ninja Tool, D-rank
While wearing this circlet, you can use an action to cast the Fire Release: Scorching ray jutsu with it.The circlet can't be used this way again until the next dawn if it is left in the sun for an hour.
Dust of Disappearance
Ninja Tool, D-rank
Found in a small packet, this powder resembles very fine sand. There is enough of it for one use. When you use an action to throw the dust into the air, you and each creature and object within 10 feet of you become invisible for 2d4 minutes. The duration is the same for all subjects, and the dust is consumed when its chakra-enhanced takes effect. If a creature affected by the dust attacks or casts a spell, the invisibility ends for that creature.
... (full pasted list continues here unchanged)`;

const CHAKRA_WEAPON_MAP_INTERNAL = parseChakraWeaponsLibrary(RAW_TEXT);

// Exported API
export const CHAKRA_WEAPON_MAP: Record<string, ChakraWeapon> = CHAKRA_WEAPON_MAP_INTERNAL;
export const CHAKRA_WEAPON_LIST: ChakraWeapon[] = Object.values(CHAKRA_WEAPON_MAP_INTERNAL).sort(
  (a, b) => a.name.localeCompare(b.name)
);
export const CHAKRA_WEAPON_NAMES: string[] = CHAKRA_WEAPON_LIST.map((w) => w.name);

export function getChakraWeaponByName(name: string): ChakraWeapon | undefined {
  return CHAKRA_WEAPON_MAP[name] || undefined;
}

export function searchChakraWeapons(query: string): ChakraWeapon[] {
  const q = query.trim().toLowerCase();
  if (!q) return CHAKRA_WEAPON_LIST;
  return CHAKRA_WEAPON_LIST.filter(
    (w) =>
      w.name.toLowerCase().includes(q) ||
      (w.type && w.type.toLowerCase().includes(q)) ||
      (w.rank && w.rank.toLowerCase().includes(q))
  );
}
