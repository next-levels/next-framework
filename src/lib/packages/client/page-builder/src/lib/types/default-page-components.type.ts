import {ViewTextComponent} from "../components/view-items/view-text.component";
import {BasePageComponents} from "./base-components.model";
import {ViewBoxComponent} from "../components/view-items/view-box.component";
import {ViewImageComponent} from "../components/view-items/view-image.component";
import {ViewButtonComponent} from "../components/view-items/view-button.component";

export let defaultPageComponents: BasePageComponents = {
  "text-element": ViewTextComponent,
  "box-element": ViewBoxComponent,
  "image-element": ViewImageComponent,
  "button-element": ViewButtonComponent,
};
