// module.exports = {
// 	preset: "jest-puppeteer",
// 	// testRegex: './*\\.test\\.js$',
// 	testRegex: "./*.test.js$",
// 	setupFilesAfterEnv: ["./setupTests.js"]
// };


module.exports = {
    preset: "jest-puppeteer",
	// testRegex: './*\\.test\\.js$',
	testRegex: "./*.test.js$",
	setupFilesAfterEnv: ["./setupTests.js"],
    launch: {
      dumpio: true,
      headless: process.env.HEADLESS !== "false",
    },
    server: {
      command: "node server.js",
      port: 4444,
      launchTimeout: 10000,
      debug: true,
    },
  };
