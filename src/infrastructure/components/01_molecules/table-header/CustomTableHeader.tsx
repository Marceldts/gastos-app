import { CustomButton } from "../../00_atoms/button/CustomButton";
import { Title } from "../../00_atoms/title/Title";
import './CustomTableHeader.css';

interface CustomTableHeaderProps {
    headerText: string;
    buttons: { text: string; onPress: (args?: any) => void }[];
    className?: string;
}

export const CustomTableHeader = (props: CustomTableHeaderProps) => {
    const { headerText, buttons, className } = props;

    return (
        <thead>
            <tr>
                <th colSpan={2} className={`custom-table-header ${className ?? ''}`}>
                    <Title text={headerText} />
                </th>
                <th colSpan={1} role="table-header-buttons">
                    <section>
                        {buttons.map((button, index) => <CustomButton key={index} text={button.text} onPress={button.onPress} />)}
                    </section>
                </th>
            </tr>
        </thead>
    );
}
