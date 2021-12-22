import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface), '0x606D590D35382823C97caC2d0D049072d029b200'
);

export default instance;