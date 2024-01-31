import { CustomButton } from "../../00_atoms/button/CustomButton";
import { Title } from "../../00_atoms/title/Title";
import './CustomTableHeader.css';

export const CustomTableHeader = (props: { headerText: string; buttons: { text: string; onPress: (args?: any) => void }[] }) => {
    const { headerText, buttons } = props;

    return (
        <thead>
            <tr>
                <th colSpan={buttons.length + 1} className="custom-table-header">
                    <Title styasdasd={ } text={headerText} />
                    <section role="table-header-buttons">
                        {buttons.map((button, index) => <CustomButton key={index} text={button.text} onPress={button.onPress} />)}
                    </section>
                </th>
            </tr>
        </thead>
    );
}
