import styled from "styled-components";
import RoundedBorder from "../assets/icons/round-edges-solid.svg"; 

export const List = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    // margin-bottom: 24px; 
    border-radius: 5px;
    white-space: nowrap;
    justify-content: center;
    height: 35px;
    background-color: #f4f4f4;
    text-transform: uppercase;
    padding-top: 40px;
    @media screen and (max-width: 568px) {
        width: 100vw;
        transform-origin: 50% 50% 0px;
        // transform: translate3d(-186.507px, 0px, 0px) scale(1, 1);
        position: relative;
        // left: 33vw;
        } 
`;

    
export const ListItem = styled.li<{ selected?: boolean }>`
    display: flex;
    flex-direction: column;    
    font: 250 1rem/3 'Inter';
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0px 10px;
    border: 1px #DDD none;
    cursor: pointer;
    margin: 0 3px;
    width: 12em;
    height: ${props => props.selected ? '40px' : '40px'};
    border-color: ${props => props.selected ? 'black' : '#DDD'};
    white-space: nowrap;
    z-index: 2;
    position: relative;
    &:hover {
        background-color: #f3f45;        
    }
    &:before {
        position: absolute;
        content:''; 
        width: 14em;
        background-image:  url();
        height: 40px; 
        top: 3%;
        z-index: -1;
        border-radius: 64px 61px 12px 0px;
        }           
    // &:after {
    //     content:${props => props.selected && 'aaa'}; 
    //     width:  ${props => props.selected && '20px'}; 
    //     height: ${props => props.selected && '10px'}; 
    //     background-image: ${props => props.selected ? `url(${RoundedBorder})` : 'none'};             
    //     position: absolute;        
    //     z-index: -1;
    //     }       
    &:after {
        position: absolute;
        content:''; 
        width: 15.1em;
        background-image:  ${props => { return props.selected === true ? `url(${RoundedBorder})` : '' }};                         
        font-weight: 600;
        height: 140%;
        top: -30%;
        z-index: -1;
        border-radius: 64px 61px 12px 0px;
        }               
`;

export const ListItemColorNoCarousel = styled.li<{ selected?: boolean, selectedColor?: any}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0px 10px;
    cursor: pointer;
    margin: 0 3px;
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
    top: 110%;
    border-bottom: 1px solid #000;
    font-family: 'Roboto', sans-serif;
    font-size: 13px;    
    
    }
    
    @media screen and (max-width: 568px) {
    &:after {
      top: 73% !important;    
      }
    }`;


export const ListItemColor = styled.li<{ selected?: boolean, selectedColor?: any}>`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    padding: 0px 10px;
    cursor: pointer;
    margin: 0 3px;
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
    top: 61%;
    border-bottom: 1px solid #000;
    font-family: 'Roboto', sans-serif;
    font-size: 13px;    
    
    }
    
    @media screen and (max-width: 568px) {
    &:after {
      top: 73% !important;    
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