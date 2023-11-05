import React, { useContext } from "react";
import { OnboardContext } from "../contexts/OnboardingContext";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";

/** onboarding tour for new users */
const Tour = () => {
	const { tourState, dispatch } = useContext(OnboardContext);
	const { sidebarOpen, run, steps, stepIndex } = tourState!;
	const handleJoyrideCallback = (data: Joyride.CallBackProps) => {
		const { action, index, status, type } = data;

		if (([STATUS.FINISHED, STATUS.SKIPPED] as string[]).includes(status)) {
			// Need to set our running state to false, so we can restart if we click start again.
			if (dispatch && tourState) dispatch({ ...tourState, run: false, stepIndex: 0 });
		} else if (([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND] as string[]).includes(type)) {
			const nextStepIndex = index + (action === ACTIONS.PREV ? -1 : 1);

			if (sidebarOpen && index === 0) {
				setTimeout(() => {
					if (dispatch && tourState) dispatch({ ...tourState, run: true });
				}, 600);
			} else if (sidebarOpen && index === 1) {
				if (dispatch && tourState) dispatch({ ...tourState, run: false, sidebarOpen: false, stepIndex: nextStepIndex });

				setTimeout(() => {
					if (dispatch && tourState) dispatch({ ...tourState, run: true });
				}, 600);
			} else if (index === 2 && action === ACTIONS.PREV) {
				if (dispatch && tourState) dispatch({ ...tourState, run: false, sidebarOpen: true, stepIndex: nextStepIndex });

				setTimeout(() => {
					if (dispatch && tourState) dispatch({ ...tourState, run: true });
				}, 600);
			} else {
				// Update state to advance the tour
				if (dispatch && tourState) dispatch({ ...tourState, sidebarOpen: false, stepIndex: nextStepIndex });
			}
		}
	};

	return <Joyride 
        callback={handleJoyrideCallback} 
        continuous 
        run={run} 
        scrollToFirstStep 
        showProgress 
        showSkipButton 
        stepIndex={stepIndex} 
        steps={steps} 
        styles={{
            options:{
                textColor: "#ebebe8ff",
                backgroundColor: "#0b3d64ff",
                arrowColor: "#0b3d64ff",
                
            },
            buttonNext:{
                backgroundColor:"#e96838ff",
                color: "#0b3d64ff",
            },
            buttonBack:{
                color:"#e96838ff"
            }
        }}
        />;
};

export default Tour;
