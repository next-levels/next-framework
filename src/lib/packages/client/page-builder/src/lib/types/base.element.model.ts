
export class BaseElementModel {
    id: string;
    name: string;
    type: string;
    styles: string;
    config: any;
    data: any;
    children: BaseElementModel[];
    parent: BaseElementModel;
    constructor() {
        this.id = '';
        this.name = '';
        this.styles = '';
        this.type = '';
        this.data = {};
        this.children = [];
        this.parent = null;
    }
}
