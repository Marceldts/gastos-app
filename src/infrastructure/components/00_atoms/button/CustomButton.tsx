export const CustomButton = (props: { text: any; onPress: any; }) => {
    const { text, onPress } = props;

    return (
        <button onClick={onPress}>{text}</button>
    );
}