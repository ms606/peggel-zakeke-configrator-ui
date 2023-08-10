//import 'bootstrap/dist/css/bootstrap.css';
import "./selector.css";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { useZakeke } from "zakeke-configurator-react";
import { List, ListItem, ListItemImage, ListItemColor } from "./list";
import { PreviewContainer, BlurOverlay } from "./previewContainer";
import Tray from "./Tray";
import TrayPreviewOpenButton from "./TrayPreviewOpenButton";
import MenuTriggerButton from "./MenuTriggerButton";
import ProgressBarLoadingOverlay from "./widgets/ProgressBarLoadingOverlay";
import Designer from "./layouts/Designer";
import { GroupItem, GroupIcon } from "./layouts/LayoutStyled";
import { createPortal } from "react-dom";
import useStore from "../Store";
import {
  ArrowLeft,
  ArrowLeftIconStyled,
  ArrowRight,
  ArrowRightIconStyled,
  CarouselContainer,
} from "./Atomic";
import { ReactComponent as ArrowRightIcon } from "../assets/icons/arrow-right-solid.svg";
import { ReactComponent as ArrowLeftIcon } from "../assets/icons/arrow-left-solid.svg";

const dialogsPortal = document.getElementById("dialogs-portal")!;
// const Container = styled.div`
// overflow: auto;
// width: 100%;
// ${!selectedTrayPreviewOpenButton
//     ? css`
//         height: 230px;
//       `
//     : css`
//         height: 70px;
//       `}
// `;

interface TrayPreviewOpenButton3DProps {
  trayPreviewOpenButton3DFunc: (data: any) => void;
}

const Selector: FunctionComponent<TrayPreviewOpenButton3DProps> = ({
  trayPreviewOpenButton3DFunc,
}) => {
  const {
    isSceneLoading,
    loadComposition,
    isAddToCartLoading,
    price,
    groups,
    selectOption,
    addToCart,
    templates,
    setTemplate,
    setCamera,
    productName,
    zoomIn,
    zoomOut,
    getPDF,
    items,
    product,
    setItemText,
    defaultColor,
    fonts,
    addItemText,
  } = useZakeke();

  const { setIsLoading, isMobile } = useStore();

  // Keep saved the ID and not the refereces, they will change on each update
  const [selectedGroupId, selectGroup] = useState<number | null>(null);
  const [selectedStepId, selectStep] = useState<number | null>(null);
  const [selectedAttributeId, selectAttribute] = useState<number | null>(null);

  const [selectedColorName, selectColorName] = useState<any | null>(null);

  // Get a list of all group names so we can populate on the tray
  const [selectedGroupList, selectGroupList] = useState<any | null>(null);

  // Open tray for menu
  const [isTrayOpen, setIsTrayOpen] = useState<any | null>(false);

  // Get the id of the selected group from the tray
  const [selectedGroupIdFromTray, selectGroupIdFromTray] = useState<
    number | null
  >(null);

  // Update tray preview open button
  const [selectedTrayPreviewOpenButton, selectTrayPreviewOpenButton] =
    useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const [width, setWidth] = useState(window.innerWidth);

  const selectedGroup = groups.find((group) => group.id === selectedGroupId);
  const selectedStep = selectedGroup
    ? selectedGroup.steps.find((step) => step.id === selectedStepId)
    : null;

  const [selectedPersonalize, setSelectedPersonalize] = useState<any | null>(
    false
  );

  // Attributes can be in both groups and steps, so show the attributes of step or in a group based on selection
  const attributes = useMemo(
    () => (selectedStep || selectedGroup)?.attributes ?? [],
    [selectedGroup, selectedStep]
  );
  const selectedAttribute = attributes.find(
    (attribute) => attribute.id === selectedAttributeId
  );

  let indexToRemove = groups.findIndex((obj) => obj.id === -1);

  if (indexToRemove !== -1) {
    groups.splice(indexToRemove, 1);
  }

  const dialogsPortal = document.getElementById("dialogs-portal");

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      //   setHeight(window.innerHeight);
    };

    //window.addEventListener('resize', handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Open the first group and the first step when loaded
  useEffect(() => {
    if (!selectedGroup && groups.length > 0) {
      console.log("items", items, "groups", groups, "product", product);

      selectGroup(groups[0].id);

      if (groups[0].steps.length > 0) selectStep(groups[0].steps[0].id);

      if (templates.length > 0) setTemplate(templates[0].id);
    }

    if (groups.length > 0) {
      var groupRec: string[] = [];
      groups.map((group) => {
        groupRec.push(group.name);
      });
      selectGroupList(groupRec);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroup, groups]);

  // useEffect(() => {
  // 	const textItems = items.filter((item) => item.type === 0) // as TextItem[];
  // 	//const newItems = textItems.filter((item) => !prevItems.some((prevItem) => prevItem.guid === item.guid));
  // 	// newItems.forEach((item) => {
  // 	// 	if (item.isTemplateElement) setItemText(item.guid, T._d(item.text));
  // 	// });
  // 	// setPrevItems(textItems);

  //   textItems.map((item) => {
  //     setItemText(item.guid,'first tezzt')
  //   })

  // 	// eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [items]);

  // Select attribute first time
  useEffect(() => {
    if (!selectedAttribute && attributes.length > 0)
      selectAttribute(attributes[0].id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAttribute, attributes]);

  useEffect(() => {
    if (selectedGroup) {
      const camera = selectedGroup.cameraLocationId;
      if (camera) setCamera(camera);

      //     console.log(items[0]?.guid,groups);

      //     // push text into zakeke component
      //   const item  = {
      //     // guid: items[0]?.guid,
      //     text: 'heheheheheheh',
      //     // text: T._("Text", "Composer"),
      //     // fillColor: defaultColor,
      //     fontFamily: fonts[0].name,
      //     // fontSize: 48,
      //     // fontWeight: 'normal normal',
      //     // isTextOnPath: false,
      //     // constraints: null,
      // }

      //    addItemText(item, 345656)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGroupId]);

  const [selectedCarouselSlide, setSelectedCarouselSlide] = useState<number>(0);

  if (isSceneLoading || !groups || groups.length === 0)
    return (
      <PreviewContainer>
        <BlurOverlay>
          {/* <span>Loading scene...</span>; */}
          <ProgressBarLoadingOverlay />
        </BlurOverlay>
      </PreviewContainer>
    );

  // groups
  // -- attributes
  // -- -- options
  // -- steps
  // -- -- attributes
  // -- -- -- options

  const handleLeftClick = () => {
    selectColorName("");
    setCurrentIndex((currentIndex - 1 + groups.length) % groups.length);
    selectGroup(groups[(currentIndex - 1 + groups.length) % groups.length].id);
  };

  const handleRightClick = () => {
    selectColorName("");
    setCurrentIndex((currentIndex + 1) % groups.length);
    selectGroup(groups[(currentIndex + 1) % groups.length].id);
  };

  const toggleTray = () => {
    if (selectedTrayPreviewOpenButton) {
      selectTrayPreviewOpenButton(!selectedTrayPreviewOpenButton);
    }
    // trayPreviewOpenButton();
    setIsTrayOpen(!isTrayOpen);
  };

  const trayPreviewOpenButton = () => {
    selectTrayPreviewOpenButton(!selectedTrayPreviewOpenButton);

    //trayPreviewOpenButton3DFunc(selectedTrayPreviewOpenButton);
    trayPreviewOpenButton3DFunc(selectedTrayPreviewOpenButton);
  };

  const groupIdFromFunc = (data: any) => {
    //console.log('ayyy',groups,data);
    const filteredArray = groups.filter((group) => group.name === data);
    // const filteredArrayId = groups.filter((group) => group.name === data);

    //  console.log(filteredArrayId, 'sddfasfdafdsf');

    const filteredArrayId = groups.filter((i: any, index: number) => {
      // Perform the desired comparison
      return i.name === data;
    });

    if (filteredArrayId.length > 0) {
      const foundItem = filteredArrayId[0];
      const foundItemId = foundItem.id;
      const foundItemIndex = groups.indexOf(foundItem);
      // console.log("Found ID:", foundItemId);
      // console.log("Found Index:", foundItemIndex);
      setCurrentIndex(foundItemIndex);
    }

    selectGroup(filteredArray[0].id);
    selectGroupIdFromTray(filteredArray[0].id);
  };

  const togglePersonalize = () => {
    setSelectedPersonalize(!selectedPersonalize);
  };

  const containerStyles = {
    overflow: "auto",
    width: "100%",
    height: !selectedTrayPreviewOpenButton ? "230px" : "70px",
  };

  return (
    <>
      <div className="top-nav">
        {/* Does not require in Peggel */}
        {/* {width > 568 ? (
          <div className="body-3" id="product-info">
            <span>{productName}</span>
            <span>LEI {price}</span>
          </div>
        ) : (
          <div className="body-3" id="product-info">
            {" "}
          </div>
        )} */}
      </div>

      {/* Does not require in Peggel */}
      {/* {!isMobile && !isTrayOpen ? (        
        <div style={{ position: "absolute", top: "36%", bottom: "45%" }}>          
          <div
            className="Atomic__Icon-sc-v58oaw-1 LayoutStyled__ZoomInIcon-sc-1nws045-19 gIdUDj dgqSKi"
            onClick={zoomIn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z M 18 9 L 18 12 L 15 12 L 15 14 L 18 14 L 18 17 L 20 17 L 20 14 L 23 14 L 23 12 L 20 12 L 20 9 Z"></path>
            </svg>
          </div>

          <div
            className="Atomic__Icon-sc-v58oaw-1 LayoutStyled__ZoomOutIcon-sc-1nws045-20 gIdUDj gwevdV"
            onClick={zoomOut}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z M 15 12 L 15 14 L 23 14 L 23 12 Z"></path>
            </svg>
          </div>
        </div>
      ) : (
        ""
      )} */}

      {/* {isMobile && !isTrayOpen ? (        
        <div style={{ position: "absolute", top: "20%" }}>          
          <div
            className="Atomic__Icon-sc-v58oaw-1 LayoutStyled__ZoomInIcon-sc-1nws045-19 gIdUDj dgqSKi"
            onClick={zoomIn}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z M 18 9 L 18 12 L 15 12 L 15 14 L 18 14 L 18 17 L 20 17 L 20 14 L 23 14 L 23 12 L 20 12 L 20 9 Z"></path>
            </svg>
          </div>

          <div
            className="Atomic__Icon-sc-v58oaw-1 LayoutStyled__ZoomOutIcon-sc-1nws045-20 gIdUDj gwevdV"
            onClick={zoomOut}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z M 15 12 L 15 14 L 23 14 L 23 12 Z"></path>
            </svg>
          </div>
        </div>
      ) : (
        ""
      )} */}

      {/* <GroupItem   */}

      <div className="animate-wrapper-0">
        <div style={containerStyles}>
          <div className="tray-header">
            <div
              style={{
                display: "flex",
                width: "420px",
                top: "50%",
                left: "50%",
                height: "auto",
                margin: "0px auto",
                position: "absolute",
                transform: "translate(-50%, -50%)",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <button
                className="previous-customization"
                onClick={handleLeftClick}
              >
                <div className="mc-prev">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    viewBox="0 0 48 24"
                    role="img"
                    width="48px"
                    height="24px"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M7,18 L1,12 L7,6"
                    ></path>
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      d="M15,18 L9,12 L15,6"
                    ></path>
                  </svg>
                </div>
              </button>

              <div className="tray-header-1">
                <div
                  style={{
                    position: "absolute",
                    padding: "0px",
                    width: "100%",
                  }}
                >
                  <div className="active-marketing-component-name">
                    <span
                      style={{
                        fontSize: "18px",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        lineHeight: "28px",
                      }}
                    >
                      {groups[currentIndex].name}
                    </span>
                  </div>
                </div>
              </div>
              <button className="next-customization" onClick={handleRightClick}>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 32 24"
                  role="img"
                  width="32px"
                  height="24px"
                  fill="none"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M1,6 L7,12 L1,18"
                  ></path>
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    d="M9,6 L15,12 L9,18"
                  ></path>
                </svg>
              </button>
            </div>

            {/* Closed on request of Paul */}
            {/* <MenuTriggerButton width={width} toggleTray={toggleTray} /> */}
          </div>

          <br />

          <div className={`animate-wrapper${isTrayOpen ? "-2 show" : ""}`}>
            {selectedGroup &&
              !selectedTrayPreviewOpenButton &&
              selectedGroup.steps.length > 0 &&
              !isTrayOpen && (
                <div style={{ backgroundColor: "#DDD", width: "100vw" }}>
                  <List>
                    {selectedGroup.steps.map((step) => {
                      return (
                        <ListItem
                          key={step.id}
                          onClick={() => selectStep(step.id)}
                          selected={selectedStep === step}
                        >
                          Step: {step.name}
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              )}

            {!selectedTrayPreviewOpenButton && (
              <div style={{ width: "100vw" }}>
                <List>
                  {attributes &&
                    !isTrayOpen &&
                    attributes.map((attribute) => {
                      return (
                        <div
                          className="ddd"
                          style={{ backgroundColor: "#DDD" }}
                        >
                          <ListItem
                            key={attribute.id}
                            onClick={() => selectAttribute(attribute.id)}
                            selected={selectedAttribute === attribute}
                          >
                            {attribute.name}
                          </ListItem>
                        </div>
                      );
                    })}
                </List>
                <br />

                <div style={{ backgroundColor: "#fff" }}>
                  <CarouselContainer
                    slidesToScroll={1}
                    speed={50}
                    slidesToShow={window.innerWidth <= 1600 ? 3 : 4}
                    slideIndex={selectedCarouselSlide}
                    afterSlide={setSelectedCarouselSlide}
                    renderBottomCenterControls={() => <span />}
                    renderCenterRightControls={() => {
                      // if (
                      //   selectedCarouselSlide !==
                      //   (finalVisibleAreas.length - slidesToShow > 0
                      //     ? finalVisibleAreas.length - slidesToShow
                      //     : selectedCarouselSlide)
                      // )
                      return (
                        <ArrowRight
                          onClick={() =>
                            setSelectedCarouselSlide(selectedCarouselSlide + 1)
                          }
                        >
                          <ArrowRightIconStyled>
                            <ArrowRightIcon />
                          </ArrowRightIconStyled>
                        </ArrowRight>
                      );
                    }}
                    renderCenterLeftControls={() => {
                      if (selectedCarouselSlide !== 0)
                        return (
                          <ArrowLeft
                            onClick={() =>
                              setSelectedCarouselSlide(
                                selectedCarouselSlide - 1
                              )
                            }
                          >
                            <ArrowLeftIconStyled>
                              <ArrowLeftIcon />
                            </ArrowLeftIconStyled>
                          </ArrowLeft>
                        );
                    }}
                  >
                    <List style={{ backgroundColor: "#fff", height: '80px' }}>
                      {!selectedTrayPreviewOpenButton &&
                        selectedAttribute &&
                        !isTrayOpen &&
                        selectedAttribute.options.map((option) => {
                          return (
                             <div style={{ backgroundColor: "#fff", height: '80px' }}>
                              <ListItemColor
                                key={option.id}
                                onClick={() => selectOption(option.id)}
                                selected={option.selected}
                                selectedColor={selectedColorName}
                              >
                                {option.imageUrl && (
                                  <ListItemImage
                                    src={option.imageUrl}
                                    onClick={() => selectColorName(option.name)}
                                    selected={option.selected}
                                  />
                                )}
                              </ListItemColor>                            
                             </div>
                          );
                        })}
                      {/* {selectedColorName}   */}
                    </List>
                  </CarouselContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Selector;
