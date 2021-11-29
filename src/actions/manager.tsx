import { ActionName, ActionResult, PanelComponentProps, UpdaterFn } from "../@types/action";
import { TusodrawElement } from "../@types/element";
import { Action } from '../interface/ActionManagerInterface'
import { TusodrawState, AppProps} from "../@types/types";
import { ActionManagerInterface } from "../interface/ActionManagerInterface";
import Library from '../data/library'; 




export type App = {
    canvas: HTMLCanvasElement | null;
    focusContainer: () => void;
    props: AppProps;
    library: Library;
};




export class ActionManager implements ActionManagerInterface{
    actions = {} as ActionManagerInterface["actions"]
    updater: (actiontResult: ActionResult | Promise<ActionResult>) => void; 
    getElementsIncludingDeleted: () => readonly TusodrawElement[]
    getAppState: () => Readonly<TusodrawState>;
    app: App; 


    constructor(updater: UpdaterFn, 
                getAppState: () => TusodrawState, 
                getElementsIncludingDeleted: () => readonly TusodrawElement[], 
                app: App){

        this.updater = (actionResult) => {
            if (actionResult && "then" in actionResult) {
                actionResult.then((actionResult) => {
                  return updater(actionResult);
                });
                
              } else {
                return updater(actionResult);
              }
        }


        this.getElementsIncludingDeleted = getElementsIncludingDeleted
        this.getAppState = getAppState; 
        this.app = app
    }


    registerAction = (action: Action) => { 
      this.actions[action.name] = action; 
    }

    registerAllAction = (actions: readonly Action[]) => {
      actions.forEach((action) => this.registerAction(action));
    }

    renderAction = (name: ActionName, data?: PanelComponentProps["data"]) => {
      const canvasActions = this.app.props.UIOptions.canvasActions
      if(this.actions[name] && "PanelComponent" in this.actions[name] && 
        (name in canvasActions ? canvasActions[name as keyof typeof canvasActions]: true)
      ){
        const action = this.actions[name]
        const PanelComponent = action.PanelComponent!; 
        const updateData = (formState?:any) => {
          this.updater(
            action.perform(
              this.getElementsIncludingDeleted(), 
              this.getAppState(), 
              formState, 
              this.app
            )
          )
        }

        return (
          <PanelComponent 
            elements={this.getElementsIncludingDeleted()}
            appState={this.getAppState()}
            updateData={updateData}
            appProps={this.app.props}
            data={data}
          />
        )


      }

      return null; 
    }
}
