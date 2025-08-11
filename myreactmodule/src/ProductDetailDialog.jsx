import { Bar, Dialog, Icon, Title, Button, Text, FormItem, RatingIndicator, FormGroup } from "@ui5/webcomponents-react";
import { Form } from "@ui5/webcomponents-react";
import { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";

function ProductDetailDialog({ openState, data, setOpenState }) {
  return <>
    <Dialog
      style={{ width: "900px" }}
      open={openState}
      className="headerPartNoPadding footerPartNoPadding"
      footer={<Bar design="Footer" endContent={<Button onClick={function _a() { setOpenState(false) }}>Close</Button>} />}
      header={<Bar endContent={<Icon name="settings" />}><Title>Product Details</Title></Bar>}
      headerText="Product Details"
      onAfterClose={function _a() { setOpenState(false) }}
      onAfterOpen={function _a() { }}
      onBeforeClose={function _a() { }}
      onBeforeOpen={function _a() { }}
    >
      <Form

        backgroundDesign="Transparent"
        columnsL={2}
        columnsM={2}
        columnsS={1}
        columnsXL={2}
        labelSpanL={4}
        labelSpanM={3}
        labelSpanS={12}
        labelSpanXL={4}
        style={{
          alignItems: 'center'
        }}

      >
        <FormGroup>
          <FormItem label="Id">
            <Text>
              {data.id}
            </Text>
          </FormItem>
          <FormItem label="Title">
            <Text>
              {data.title}
            </Text>
          </FormItem>
          <FormItem label="Description">
            <Text>
              {data.description}
            </Text>
          </FormItem>
          <FormItem label="Stock">
            <Text>
              {data.stock}
            </Text>
          </FormItem>
        </FormGroup>
        <FormGroup>
          <FormItem label="Price">
            <Text>
              {data.price}
            </Text>
          </FormItem>
          <FormItem label="Discount ">
            <Text>
              {data.discountPercentage}
            </Text>
          </FormItem>

          <FormItem label="Brand">
            <Text>
              {data.brand}
            </Text>
          </FormItem>

        

          <FormItem label="Category">

            <Text>
              {data.category}
            </Text>
          </FormItem>
          <FormItem label="Rating">
            <RatingIndicator style={{ width: '10rem' }} value={data.rating} disabled="true" />

          </FormItem>
        </FormGroup>

      </Form>
      <Title>Images</Title>
      {data.images &&
        <SimpleImageSlider
          bgColor="Transparent"
          autoPlay="true"
          width={590}
          height={200}
          images={data.images}
          showNavs={true}
        />}
    </Dialog>
  </>
}
export default ProductDetailDialog;