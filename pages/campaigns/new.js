import React, { Component } from "react";
import Layout from "../../components/layout";
import { Form,Button } from "semantic-ui-react";

class CampaignNew extends Component {
  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form>
            <Form.Field>
                <label>Mnimum Contribution</label>
                <input/>
            </Form.Field>
            <Button primary>Submit</Button>
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
