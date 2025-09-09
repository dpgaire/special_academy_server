
const apiKey = process.env.IMGBB_API_KEY;

if (!apiKey) {
  throw new Error("Missing ImgBB API key. Please set the IMGBB_API_KEY environment variable.");
}

module.exports = { apiKey };
