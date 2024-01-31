import './CustomButton.css';

export const CustomButton = (props: { text: any; onPress: any; }) => {
    const { text, onPress } = props;

    return (
        <button className='custom-button' onClick={onPress}>{text}</button>
    );
}