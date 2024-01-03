import {Field, Model} from "@next-levels/types";
import {BaseElementModel} from "../types/base.element.model";

const key = 'text-element';

@Model(key)
export class TextElement extends BaseElementModel {

  @Field({type: 'HTML', required: true})
  content: string;

  getSettings() {
    return {
      paletteName: 'Text',
      step: {
        template: "",
        type: key,
        data: {
          name: key,
          icon: 'bars-2',
          config: new TextElement(),
        }
      }
    };
  }
}
