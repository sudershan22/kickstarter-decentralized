const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
// const { interface, bytecode } = require('./compile');
const compiledFactory = require("./build/CampaignFactory.json");

const provider = new HDWalletProvider(
  "egg motion chair major before radar attract rally knee pair tool turtle",
  "https://rinkeby.infura.io/v3/2a3288c008cb483a9b90995f7449d478"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledFactory.interface)
  )
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: "1000000", from: accounts[0] });

//   console.log("Contract interface ", interface);
  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
