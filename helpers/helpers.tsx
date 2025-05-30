import { Post } from "@/lib/types/types";

export const getInitials = (name: string) => {
  const names = name.split(" ").map(capitalizeEachWord);
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};

export const capitalizeEachWord = (sentence: string) => {
  return sentence
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const countryList = [
  "Afghanistan",
  "Australia",
  "Bangladesh",
  "Bhutan",
  "Brunei",
  "Cambodia",
  "China",
  "Fiji",
  "India",
  "Indonesia",
  "Japan",
  "Kazakhstan",
  "Kiribati",
  "Kyrgyzstan",
  "Laos",
  "Malaysia",
  "Maldives",
  "Marshall Islands",
  "Micronesia",
  "Mongolia",
  "Myanmar (Burma)",
  "Nauru",
  "Nepal",
  "New Zealand",
  "North Korea",
  "Pakistan",
  "Palau",
  "Papua New Guinea",
  "Philippines",
  "Samoa",
  "Singapore",
  "Solomon Islands",
  "South Korea",
  "Sri Lanka",
  "Taiwan",
  "Tajikistan",
  "Thailand",
  "Timor-Leste",
  "Tonga",
  "Turkmenistan",
  "Tuvalu",
  "Uzbekistan",
  "Vanuatu",
  "Vietnam",
];

export function formatTime(timestamp: string) {
  const date = new Date(Number(timestamp));

  // Extracting day, month, year, hours, and minutes
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // +1 because months are 0-indexed
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Formatting to dd/mm/yyyy hh:mm
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">
        {hours}:{minutes}
      </span>
      <span className="font-regular">
        {day}/{month}/{year}
      </span>
    </div>
  );
}

export function extractImageUrlFromContent(content: string) {
  // Regular expression to match Markdown image syntax
  const regex = /!\[.*?\]\((.*?)\)/;
  const matches = content.match(regex);

  // If matches found, return the first captured group, which is the URL
  if (matches && matches[1]) {
    return matches[1];
  }

  // If no matches, return a default image or an empty string
  return "";
}

export function removeImageUrlFromContent(content: string) {
  // Regular expression to match Markdown image syntax
  const regex = /!\[.*?\]\(.*?\)/g;
  return content.replace(regex, "").trim();
}

export type CardCounts = {
  [key: string]: number;
};

export function countGiftCards(
  posts: Post[],
  setGiftCardCounts: React.Dispatch<React.SetStateAction<CardCounts>>,
  setTotalCards: React.Dispatch<React.SetStateAction<number>>,
  cardPaths: string[],
) {
  const counts: CardCounts = {};

  cardPaths.forEach((cardPath) => {
    counts[cardPath] = 0;
  });

  posts.forEach((post) => {
    cardPaths.forEach((cardPath) => {
      if (post.content.includes(cardPath)) {
        counts[cardPath]++;
      }
    });
  });

  setGiftCardCounts(counts);

  const total = Object.values(counts).reduce((acc, count) => acc + count, 0);
  setTotalCards(total);
}

export function topFansCount(authorNames: string[]) {
  const counts: Record<string, number> = {};
  authorNames.forEach((authorName: string) => {
    counts[authorName] = (counts[authorName] || 0) + 1;
  });

  let maxCount = 0;
  let topFans: string[] = [];

  for (const author in counts) {
    if (counts[author] > maxCount) {
      maxCount = counts[author];
      topFans = [author];
    } else if (counts[author] === maxCount) {
      topFans.push(author);
    }
  }

  return topFans;
}
