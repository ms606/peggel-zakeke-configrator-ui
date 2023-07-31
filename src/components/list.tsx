import styled from "styled-components";

export const List = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    margin-bottom: 24px; 
    border-radius: 5px;
    white-space: nowrap;
    justify-content: center;
    background-color: #ededed;
    height: 30px;
    @media screen and (max-width: 568px) {
        width: 100vw;
        transform-origin: 50% 50% 0px;
        transform: translate3d(-186.507px, 0px, 0px) scale(1, 1);
        position: relative;
        left: 60vw;
        }

`;

    
export const ListItem = styled.li<{ selected?: boolean }>`
    display: flex;
    flex-direction: column;    
    font: 300 1.1rem/1.5 'Inter';
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0px 10px;
    border: 1px #DDD none;
    cursor: pointer;
    margin: 0 10px;
    border-radius: ${props => props.selected ? '19px 19px 38px 0px' : '0px'};
    width: 152px;
    height: ${props => props.selected ? '47px' : '30px'};
    border-color: ${props => props.selected ? 'black' : '#DDD'};
    white-space: nowrap;
    background-color: ${props => props.selected && '#f6fafd'};
    &:hover {
        background-color: #ffd966;
        border-radius: 19px 19px 38px 0px;
        height: 47px;

    }
`;

export const ListItemColor = styled.li<{ selected?: boolean, selectedColor?: any}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0px 10px;
    cursor: pointer;
    margin: 0 11px;
    border-radius: 100%;
    width: 36px;
    height: 36px;
    white-space: nowrap;  
    font-size: 12px;  
    border-color: ${props => props.selected ? 'black' : '#DDD'};

    &:hover {
        background-color: #D8D8D8;
    };
    
    &:before {
        content: '';
        position: absolute;
        bottom: 20%;
        /* Additional styling for the :before pseudo-element can be added here */
    };

    &:after {
    content: "${props => { return props.selected ? props.selectedColor : ''
                        }}";
    position: absolute;
    bottom: 20%;
    // transform: translateY(38px);
    /* Additional styling for the :before pseudo-element can be added here */
    }
    
    
    @media screen and (max-width: 568px) {
    &:after {
      bottom: -65%;  
    }
    }


    `;

export const ListItemImage = styled.img<{ selected?: any }>`
    width: 40px;
    height: 40px;
    object-fit: contain;
    margin: 0px 11px;
    border-radius: 100%;
    border: 1px solid rgb(229, 229, 229);
`

// top: 0px;
//     border: none;
//     outline: none;
//     
//     overflow: hidden;
//     position: relative;
//     width: 40px;
//     height: 40px;
//     background-color: transparent;
