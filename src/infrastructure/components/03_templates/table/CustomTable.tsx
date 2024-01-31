import { useEffect } from "react";
import { CustomTableHeader } from "../../01_molecules/table-header/CustomTableHeader";
import { CustomTableBody } from "../../02_organisms/table-body/CustomTableBody";

export const CustomTable = (props: { data: any; }) => {
    const { data } = props;
    const { header, body } = data;

    useEffect(() => {
        // console.log("data", data);
        // console.log("header", header);
        // console.log("body", body);
    }, []);

    return (
        <>
            <CustomTableHeader headerText={header.text} buttons={header.buttons} />
            <table>
                <CustomTableBody data={body} />
            </table>
        </>
    );
}