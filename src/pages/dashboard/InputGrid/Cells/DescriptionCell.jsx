import FieldArrayInput from "@/components/FieldArray/FieldArrayInput";
import { useFormikContext } from "formik"
import { useContext } from "react";
import { NavigationContext } from "react-input-grid";

const DescriptionCell = ({ index }) => {
    const { values, handleChange } = useFormikContext();
    const handleKeyPress = useContext(NavigationContext)
    return (
        <FieldArrayInput
            name={`articles.${index}.description`}
            placeholder="---"
            onKeyDown={handleKeyPress}
            onChange={handleChange}
            value={values.articles[index].description}
        />
    )
}

export default DescriptionCell