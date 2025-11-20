const COUNTRY_PHONE_CODES: Record<string, string> = {
    uae: "971",
    "united arab emirates": "971",
    ae: "971",
    pakistan: "92",
    pk: "92",
    india: "91",
    in: "91",
    "saudi arabia": "966",
    saudi: "966",
    ksa: "966",
    sa: "966",
    qatar: "974",
    qa: "974",
    kuwait: "965",
    kw: "965",
    bahrain: "973",
    bh: "973",
    oman: "968",
    om: "968",
    egypt: "20",
    eg: "20",
    jordan: "962",
    jo: "962",
    iraq: "964",
    iq: "964",
    lebanon: "961",
    lb: "961",
    turkey: "90",
    tr: "90",
    "united states": "1",
    usa: "1",
    us: "1",
    "united kingdom": "44",
    uk: "44",
    gb: "44",
};

export function getPhoneCodeByCountry(country?: string | null) {
    if (!country) return undefined;
    const normalized = country.trim().toLowerCase();
    return COUNTRY_PHONE_CODES[normalized];
}