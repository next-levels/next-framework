import { Field, Model} from "@next-levels/types";
import {BaseElementModel} from "../types/base.element.model";

const key = 'image-element';
@Model(key)
export class ImageElement extends BaseElementModel
{

  @Field({ type: 'FILE', required: true })
  content: any;

  getSettings(){
    return {
      paletteName: 'Bild',
      step: {
        template: "",
        type: key,
        data: {
          name: key,
          icon: 'photo',
          config: new ImageElement(),
        }
      }
    };
  }
}
