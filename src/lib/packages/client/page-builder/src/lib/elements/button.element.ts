import { Field, Model} from "@next-levels/types";
import {BaseElementModel} from "../types/base.element.model";

const key = 'button-element';
@Model(key)
export class ButtonElement extends BaseElementModel
{

  @Field({ type: 'TEXTAREA', required: true })
  content: number;

  getSettings(){
    return {
      paletteName: 'Button',
      step: {
        template: "",
        type: key,
        data: {
          name: key,
          icon: 'bars-2',
          config: new ButtonElement(),
        }
      }
    };
  }
}
