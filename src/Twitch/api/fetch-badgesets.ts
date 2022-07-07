
interface ITwitchBadgeData {
  title: string;
  description: string;
  image_url_1x: string;
  image_url_2x: string;
  image_url_4x: string;
  click_action: string;
  click_url: string;
  [param: string]: string;
}

export type BadgeSets = { [key: string]: { versions: { [v: string]: ITwitchBadgeData } } };

interface ITwitchBadgeSets {
  badge_sets: BadgeSets;
}

async function fetch_internal(roomId: string | 'GLOBAL'): Promise<ITwitchBadgeSets> {
  let url: string =
    roomId === 'GLOBAL' ? 'https://badges.twitch.tv/v1/badges/global/display'
      : `https://badges.twitch.tv/v1/badges/channels/${roomId}/display`;

  try {
    const response = await fetch(url);
    if (response.status == 200) {
      const data = await response.json() as ITwitchBadgeSets;
      if (data && data.badge_sets) {
        return data;
      }
    }
    else {
      console.error(response);
    }
  }
  catch (ex) {
    console.error(ex);
  }
  return null;
}

export async function fetchBadgeSets(roomId: string): Promise<ITwitchBadgeSets> {
  let [globalObj, roomObj] = await Promise.all([
    fetch_internal('GLOBAL'),
    fetch_internal(roomId)
  ]);
  return { badge_sets: { ...globalObj.badge_sets, ...roomObj.badge_sets } };
}
