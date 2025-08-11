import React from "react";
import { Title } from "@ui5/webcomponents-react";
import { Page, Bar, Button, Label } from '@ui5/webcomponents-react';
export default function Detail() {

  return (

    <Page
      footer={<Bar design="FloatingFooter"
        endContent={<><Button design="Positive">Accept</Button>
          <Button design="Negative">Decline</Button>
          <Button design="Transparent">Cancel</Button></>}
        startContent={<Button icon="home" title="Go Home" style={{ color: "white" }} />} />}
      header={<Bar endContent={<Button icon="settings" title="Go to Settings" />}
        startContent={<Button icon="home" title="Go Home" style={{ color: "white" }} />}>
        <Label>Title</Label></Bar>}
      style={{
        height: '500px'
      }}
    >
      <Title>Hello World!</Title>
    </Page>)

}
