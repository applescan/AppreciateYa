export const getInitials = (name: string) => {
    const names = name.split(' ').map(capitalizeEachWord);
    let initials = names[0].substring(0, 1).toUpperCase();

    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
};

export const capitalizeEachWord = (sentence: string) => {
    return sentence
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
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
    "Vietnam"
];

export function formatTime(timestamp: string) {
    const date = new Date(Number(timestamp));
  
    // Extracting day, month, and year
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-indexed
    const year = date.getFullYear();
  
    // Formatting to dd/mm/yyyy
    return `${day}/${month}/${year}`;
  }
  

