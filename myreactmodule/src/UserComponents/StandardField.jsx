import { Input, Link, Text, TextArea ,Select,Option} from "@ui5/webcomponents-react";
const StandardField = ({ editMode, value, inputType = "Text", onChange, selectOptions, ...rest }) => {
  if (editMode) {
    if (inputType === "TextArea") {
      return <TextArea value={value} style={{ width: '100%' }} type={inputType} onChange={onChange}  {...rest} />;
    }

    if (inputType === "Select") {
      return (
        <Select selectOptions={selectOptions || []} onChange={onChange}  value={value} {...rest}>
           {selectOptions && selectOptions.map(item=>{
            return ( <Option>
              {item}
            </Option>);
           })}
        </Select>
      )
    }

    return <Input value={value} style={{ width: '100%' }} type={inputType} onChange={onChange} {...rest} />;
  }
  if (inputType === "URL" || inputType === "Email") {
    return (
      <Link href={inputType === "Email" ? `mailto:${value}` : value} target="_blank" {...rest}>
        {value}
      </Link>
    );
  }
 
  return <Text {...rest}>{value}</Text>;
};
export default StandardField;