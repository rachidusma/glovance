const { match } = require("@formatjs/intl-localematcher");
const Negotiator = require("negotiator");

const negotiatorHeaders = { 'accept-language': 'en-US,en;q=0.9' };
let languages = new Negotiator({ headers: negotiatorHeaders }).languages();

console.log("languages:", languages);
const locales = ["en", "fr", "ar"];
console.log("match:", match(languages, locales, "en"));
