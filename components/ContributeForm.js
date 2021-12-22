import { Router } from "../routes";
import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

class ContributeForm extends Component {
  state = {
    value: "",
    errorMsg: "",
    loading: false,
  };
  onSubmit = async (event) => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);
    this.setState({ loading: true, errorMsg: "" });
    try {
      const accounts = await web3.eth.getAccounts();

      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether"),
      });
      Router.replaceRouter(`/campaigns/${this.props.address}`);
    } catch (err) {
      //   console.log(JSON.stringify(err));
      this.setState({ errorMsg: err.Error });
    }
    this.setState({ loading: false, value: "" });
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.property}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
            label="ether"
            placeholder="Enter value.."
            labelPosition="right"
          />
        </Form.Field>
        <Message error header="Error!!!" content={this.state.errorMsg} />
        <Button
          primary
          loading={this.state.loading}
          disabled={this.state.loading}
        >
          Contribute!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
