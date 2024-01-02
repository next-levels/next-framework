import {Field, Model} from "@next-levels/types";
import {Column} from "typeorm";
import {BaseElementModel} from "../types/base.element.model";

const key = 'box-element';
@Model(key)
export class BoxElement extends BaseElementModel
{

  @Field({ type: 'TEXTAREA', required: true })
  @Column({ type: 'text', nullable: true })
  content: number;

  getSettings(){
    return {
      paletteName: 'Box',
      step: {
        template: "",
        type: key,
        data: {
          name: key,
          icon: 'cube',
          config: new BoxElement(),
        }
      }
    };
  }
}
