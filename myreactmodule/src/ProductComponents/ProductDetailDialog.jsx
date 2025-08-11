import { Bar, Dialog, Icon, Title, Button, Text, FormItem, RatingIndicator, FormGroup,Label } from "@ui5/webcomponents-react";
import { Form } from "@ui5/webcomponents-react";
//import { useEffect, useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";

function ProductDetailDialog({ openState, data, setOpenState }) {
  return <>
    <Dialog
      style={{ width: "90vw" }}
      open={openState}
      className="headerPartNoPadding footerPartNoPadding"
      footer={<Bar design="Footer" endContent={<Button onClick={function _a() { setOpenState(false) }}>Close</Button>} />}
      header={<Bar><Title>Product Details</Title></Bar>}
      headerText="Product Details"
      onAfterClose={function _a() { setOpenState(false) }}
      onAfterOpen={function _a() { }}
      onBeforeClose={function _a() { }}
      onBeforeOpen={function _a() { }}
    >
      <div>

     
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
          <FormItem label="Id" labelContent={<Label>Id</Label>}>
            <Text>
              {data.id}
            </Text>
          </FormItem>
          <FormItem label="Title" labelContent={<Label>Title</Label>}>
            <Text>
              {data.title}
            </Text>
          </FormItem>
          <FormItem label="Description" labelContent={<Label>Description</Label>}>
            <Text>
              {data.description}
            </Text>
          </FormItem>
          <FormItem label="Stock" labelContent={<Label>Stock</Label>}>
            <Text>
              {data.stock}
            </Text>
          </FormItem>
        </FormGroup>
        <FormGroup>
          <FormItem label="Price" labelContent={<Label>Price</Label>}>
            <Text>
              {data.price}
            </Text>
          </FormItem>
          <FormItem label="Discount " labelContent={<Label>Discount</Label>}>
            <Text>
              {data.discountPercentage}
            </Text>
          </FormItem>

          <FormItem label="Brand" labelContent={<Label>Brand</Label>}>
            <Text>
              {data.brand}
            </Text>
          </FormItem>

        

          <FormItem label="Category" labelContent={<Label>Category</Label>}>

            <Text>
              {data.category}
            </Text>
          </FormItem>
          <FormItem label="Rating" labelContent={<Label>Rating</Label>}>
            <RatingIndicator style={{ width: '10rem' }} value={data.rating} disabled="true" />

          </FormItem>
        </FormGroup>

      </Form>
      <Title>Images</Title>
      {data.images &&
        <SimpleImageSlider
          bgColor="Transparent"
          autoPlay="true"
          style={{maxWidth:"550px"}}
          width="350px"
          height="170px"
          images={data.images}
          showNavs={true}
        />}
         </div>
    </Dialog>
  </>
}
export default ProductDetailDialog;