const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const campaignpath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(campaignpath, "utf8");
const output = solc.compile(source, 1).contracts;
console.log(campaignpath);
fs.ensureDirSync(buildPath);

console.log(output);
for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
