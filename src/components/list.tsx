import styled from "styled-components";

export const List = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    // margin-bottom: 24px; 
    border-radius: 5px;
    white-space: nowrap;
    justify-content: center;
    height: 3em;
    background-color: #ddd;
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
    font: 500 1rem/3 'Inter';
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0px 10px;
    border: 1px #DDD none;
    cursor: pointer;
    margin: 0 10px;
    // border-radius: ${props => props.selected ? '19px 19px 38px 0px' : '0px'};
    width: 12em;
    height: ${props => props.selected ? '3em' : '3em'};
    border-color: ${props => props.selected ? 'black' : '#DDD'};
    white-space: nowrap;
   // background-color: ${props => props.selected && '#fff'};
    &:hover {
        background-color: #f3f45;        
    }
    &:after {
        content:${props => props.selected && 'aaa'}; 
        width:  ${props => props.selected && '20px'}; 
        height: ${props => props.selected && '10px'}; 
       // background-color: ${props => props.selected && '#fff'}; 
        position: absolute;        
        }       
    &:after {
        z-index: 4444;
        content:''; 
        width: 12em;
        height: '10px'; 
       // background-color: '#fff';
        top: 3%;
        border-radius: 64px 61px 12px 0px;
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
    width: 5.5em;
    height: 5.1em;
    white-space: nowrap;  
    font-size: 12px;  
    background-color: #fff;
    border-color: ${props => props.selected ? 'black' : '#DDD'};

    &:hover {
      
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
    bottom: -1%;    
    }
    
    @media screen and (max-width: 568px) {
    &:after {
      bottom: -65%;        
      }
    }`;

export const ListItemImage = styled.img<{ selected?: any }>`
    width: 4.7em;
    height: 80px;
    object-fit: contain;
    margin: 0px 11px;
    border-radius: 22%;
    border: 1px solid rgb(229, 229, 229);
    background-color: #fff; 
    box-shadow: ${props => props.selected && '2px 2px 2px 2px lightgray'}   
    `;