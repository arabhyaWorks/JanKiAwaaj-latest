import data from './constituency-data.json'; // Your JSON file

export interface Constituency {
  constituency_no: string;
  constituency_name: string;
  slug: string;
  vidhayak: string;
  party: string;
  party_color: string;
  district: string;
}

export const slugify = (name: string) =>
  name.toLowerCase().replace(/\s+/g, '-');

// Convert array to Record<string, Constituency>
export const constituencies: Record<string, Constituency> = Object.fromEntries(
  data.map((item) => [
    item.constituency_name,
    {
      constituency_no: item.constituency_no,
      constituency_name: item.constituency_name,
      slug: item.slug || slugify(item.constituency_name),
      vidhayak: item.vidhayak,
      party: item.party,
      party_color: item.party_color,
      district: item.district,
    },
  ])
);
