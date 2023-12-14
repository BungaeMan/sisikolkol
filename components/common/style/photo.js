
export const liquorPath = (id) => {
    return id <= 20 ?
        `${process.env.REACT_APP_S3_ADDRESS}/${id}.png` :
        `${process.env.REACT_APP_S3_ADDRESS}/blankLogo.png`;
}

export const barPath = (id) => {
    return id <= 20 ?
        `${process.env.REACT_APP_S3_ADDRESS}/bar/${id}.jpeg` :
        `${process.env.REACT_APP_S3_ADDRESS}/blankLogo.png`;
}