export const allVenues = (currentLangData) => ({
  _id: "all",
  name: currentLangData.STATS.TRANSACTIONS_TABLE.text_select_venue,
});

export const periods = (currentLangData) => [
  {
    label: currentLangData.STATS.TRANSACTIONS_TABLE.last_three_months,
    slug: "quarterly",
  },
  {
    label: currentLangData.STATS.TRANSACTIONS_TABLE.last_month,
    slug: "monthly",
  },
  {
    label: currentLangData.STATS.TRANSACTIONS_TABLE.last_week,
    slug: "weekly",
  },
];

export const emptyStateData = [
  ["Venue 1", "$500", "$500", "$500", "$500", new Date().toLocaleDateString()],
  ["Venue 2", "$500", "$500", "$500", "$500", new Date().toLocaleDateString()],
  ["Venue 3", "$500", "$500", "$500", "$500", new Date().toLocaleDateString()],
];
