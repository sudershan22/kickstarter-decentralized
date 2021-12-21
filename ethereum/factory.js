import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface), '0x04fe0c099f841Aa404C0EF341eB9EdC54f9C6C7f'
);

export default instance;