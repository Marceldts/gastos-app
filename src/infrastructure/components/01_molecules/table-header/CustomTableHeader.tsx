import { CustomButton } from "../../00_atoms/button/CustomButton";
import { Title } from "../../00_atoms/title/Title";

export const CustomTableHeader = (props: { headerText: string; buttons: { text: string; onPress: (args?: any) => void }[] }) => {
    const { headerText, buttons } = props;

    return (
        <th>
            <Title text={headerText} />
            {buttons.map((button, index) => <CustomButton key={index} text={button.text} onPress={button.onPress} />)}
        </th>
    );
}
