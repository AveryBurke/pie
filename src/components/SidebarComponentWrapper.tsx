import React, { useState, useRef, PropsWithChildren, ReactComponentElement } from "react";
import useHeight from "../hooks/useHeight";
import Select from 'react-select'
import { useSpring, animated } from 'react-spring'
import { easings } from '@react-spring/web'
import { dummyValue } from "../static/initialState";

/**
 * create a sidebar component that manages one slice of state
 * used to generate sidebar parameter components {@link ./SidebarParameterComponent} and used to create sidebar filter component {@link ./SidebarFilterComponent}
 * @param param0 props for creating a sidebar component
 * @returns {JSX.Element} a sidebar component
 */
const SidebarComponentWrapper = ({
    currentKey,
    title,
    options,    
    ControlPanel,
    props,
    handleChange,
    handleReset
}: PropsWithChildren<SidebarComponentWrapperProps>) => {

    const [heightOn, setHeightOn] = useState(false);
    const [sizingRef, contentHeight] = useHeight({ on: heightOn });
    const uiReady = useRef(false);

    //wait until the compnent has rendered to pass a ref
    const activateRef = (ref: HTMLDivElement | null) => {
        sizingRef.current = ref;
        if (!heightOn) {
            setHeightOn(true);
        }
    }

    const heightStyles = useSpring({
        immediate: !uiReady.current,
        config: {
            duration: 200,
            easing: easings.easeInOutQuad
        },
        from: { height: 20 }, //<--the collapsed div is 20px. To do: make this programtic, or save the current size in state
        to: { height: contentHeight },
        onRest: () => (uiReady.current = true)
    })

    return (
        <div className="sidebar-component" key='contrainer' id={`${title}_sidebar-component`}>
            <div className="label-containter">
                <span>{title}</span>
                <div hidden={currentKey.includes(dummyValue)}>
                <div className="reset_button" onClick={() => handleReset()}>reset</div>
                </div>
            </div>
            <Select styles={{
                container: (baseStyles, state) => ({
                    ...baseStyles,
                    width: '100%',
                    marginBottom: '.5rem',
                    borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
                    
                }),
                menu: (base, state) => ({
                    ...base,
                    // override border radius to match the box
                    borderRadius: '0 0 3px 3px',
                    // beautify the word cut by adding a dash see https://caniuse.com/#search=hyphens for the compatibility
                    hyphens: "auto",
                    marginTop: 5,
                    textAlign: "left",
                    // prevent menu to scroll y
                    wordWrap: "break-word",
                    fontSize: "inherit",
                    position: "absolute",
                    zIndex: 999
                }),
                menuList: base => ({
                    ...base,
                    fontSize: "inherit",
                })
            }}
                theme={(theme) => ({
                    ...theme,
                    colors: {
                        ...theme.colors,
                        primary: '#f7bb87'
                    }
                })}
                placeholder={`${title} column`}
                options={options}
                value = {currentKey.includes(dummyValue) ? null : {
                    value: currentKey,
                    label: currentKey
                }}
                onChange={e => e ? handleChange(e.value) : console.log(e)}
            />
            <animated.div style={{ width: "100%", overflow: "hidden", ...heightStyles }}>
                <div
                    style={{ width: '100%'}}
                    ref={activateRef}
                    >
                    <div hidden={currentKey.includes(dummyValue)}>
                        <ControlPanel {...props} />
                    </div>
                </div>
            </animated.div>
        </div>)
}
export default SidebarComponentWrapper