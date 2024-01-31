import { CustomTableRow } from "../../01_molecules/table-row/CustomTableRow";

export const CustomTableBody = (props: { data: any[]; }) => {
    const { data } = props;

    return (
        <tbody>
            {data.map((row, index) => <CustomTableRow key={index} data={row} />)}
        </tbody>
    );
}