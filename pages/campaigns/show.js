import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
import Layout from "../../components/layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();

    return {
      address: props.query.address,
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4],
    };
  }

  renderCards() {
    const {
      balance,
      manager,
      minimumContribution,
      requestsCount,
      approversCount,
    } = this.props;

    const items = [
      {
        header: manager,
        meta: "Address of the Manager",
        description:
          "The manager created this campaign and can create request to withdraw the money",
        style: { overflowWrap: "break-word" },
      },
      {
        header: minimumContribution,
        meta: "Minimum Contribution (Wei)",
        description:
          "You must contribute at least this much Wei to become a approver",
      },
      {
        header: requestsCount,
        meta: "Number of Requests",
        description:
          "A requeest tries to wothdraw money from the contract. Requests must be approved by the approvers.",
      },
      {
        header: approversCount,
        meta: "Number of Approvers",
        description:
          "Number of poeple who have already donated to this campaign.",
      },
      {
        header: web3.utils.fromWei(balance, "ether"),
        meta: "Campaign Balance (ether)",
        description: "Balance is how much money has left to spend.",
      },
    ];
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
          <Grid.Column width={6}>
            <ContributeForm address={this.props.address}/>
          </Grid.Column>
        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
