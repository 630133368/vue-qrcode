interface IQrCode {
    width: number;
    height: number;
    background: string;
    correctLevel: number;
    foreground: string;
    render: string;
    text: string;
    typeNumber: number;
    imgSrc: string;
    imgWidth: number;
    imgHeight: number;
    codeUrl: string;
    textConfig: {
        textHeight: number;
        fontSize: number;
        color: string;
    };
}

export default IQrCode;
