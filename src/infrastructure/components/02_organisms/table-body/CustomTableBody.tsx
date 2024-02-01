import { CustomTableRow } from "../../01_molecules/table-row/CustomTableRow";

interface CustomTableBodyProps {
    data: any[];
    className?: string;
}

export const CustomTableBody = (props: CustomTableBodyProps) => {
    const { data, className } = props;

    return (
        <tbody className={className}>
            {data?.map((row, index) => <CustomTableRow key={index} data={row} />)}
        </tbody>
    );
}