import { Component } from '@angular/core';

import { BaseTableDefaultComponent } from '../base-table-default/base-table-default.component';
import { MatTreeFlatDataSource, MatTreeFlattener } from "@angular/material/tree";
import { FlatTreeControl } from "@angular/cdk/tree";
import { SelectionModel } from "@angular/cdk/collections";
import { MatCheckboxChange } from "@angular/material/checkbox";
import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Observable, of as observableOf } from "rxjs";

export class CategoryNode {
  children: CategoryNode[];
  name: string;
  type: any; // Assuming you have a specific type or use 'any' if it's dynamic
  id: string;
}

export class CategoryFlatNode {
  constructor(
    public expandable: boolean,
    public name: string,
    public level: number,
    public type: any, // Same assumption as above
    public id: string
  ) {}
}

@Component({
  selector: 'nxtlvls-table-tree',
  templateUrl: './table-tree.component.html',
  styleUrls: ['../base-table-default/base-table.scss'],
})
export class TableTreeComponent extends BaseTableDefaultComponent {

  treeControl: FlatTreeControl<CategoryFlatNode>;
  treeFlattener: MatTreeFlattener<CategoryNode, CategoryFlatNode>;
  dataSourceTree: MatTreeFlatDataSource<CategoryNode, CategoryFlatNode>;
  expansionModel = new SelectionModel<string>(true); // Tracks expansion state
  dragging = false;
  expandTimeout: any;
  expandDelay = 1000;
  validateDrop = false;
  dataLoaded = false;

  transformer = (node: CategoryNode, level: number) => {
    return new CategoryFlatNode(!!node.children, node.name, level, node.type, node.id);
  }

  private _getLevel = (node: CategoryFlatNode) => node.level;
  private _isExpandable = (node: CategoryFlatNode) => node.expandable;
  private _getChildren = (node: CategoryNode): Observable<CategoryNode[]> => observableOf(node.children);
  hasChild = (_: number, _nodeData: CategoryFlatNode) => _nodeData.expandable;

  override ngOnInit() {
    super.ngOnInit();
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel, this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<CategoryFlatNode>(this._getLevel, this._isExpandable);
    this.dataSourceTree = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

    this.modelFacade?.base.filtered$.subscribe((categories: unknown) => {
      this.dataSourceTree.data = categories as CategoryNode[];
      console.log(this.dataSourceTree.data)
      if (this.dataSourceTree.data.length > 0) {
        this.dataLoaded = true;
      }
      this.cdRef.detectChanges();
    });
  }

  visibleNodes(): CategoryNode[] {
    const result: CategoryNode[] = [];

    const addExpandedChildren = (node: CategoryNode, expanded: string[]) => {
      result.push(node);
      if (expanded.includes(node.id)) {
        node.children.forEach(child => addExpandedChildren(child, expanded));
      }
    };

    this.dataSourceTree.data.forEach(node => addExpandedChildren(node, this.expansionModel.selected));
    return result;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (!event.isPointerOverContainer) return;

    const visibleNodes = this.visibleNodes();
    const changedData = JSON.parse(JSON.stringify(this.dataSourceTree.data)); // Deep clone

    const findNodeSiblings = (arr: CategoryNode[], id: string): CategoryNode[] | null => {
      for (const item of arr) {
        if (item.id === id) return arr;
        if (item.children) {
          const result = findNodeSiblings(item.children, id);
          if (result) return result;
        }
      }
      return null;
    };

    const nodeAtDest = visibleNodes[event.currentIndex];
    const newSiblings = findNodeSiblings(changedData, nodeAtDest.id);
    if (!newSiblings) return;

    const insertIndex = newSiblings.findIndex(s => s.id === nodeAtDest.id);
    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    if (!siblings) return;

    const siblingIndex = siblings.findIndex(n => n.id === node.id);
    const nodeToInsert: CategoryNode = siblings.splice(siblingIndex, 1)[0];
    if (nodeAtDest.id === nodeToInsert.id) return;

    const nodeAtDestFlatNode = this.treeControl.dataNodes.find(n => nodeAtDest.id === n.id);
    if (this.validateDrop && nodeAtDestFlatNode.level !== node.level) {
      alert('Items can only be moved within the same level.');
      return;
    }

    newSiblings.splice(insertIndex, 0, nodeToInsert);
    this.rebuildTreeForData(changedData);
  }

  dragStart() {
    this.dragging = true;
  }

  dragEnd() {
    this.dragging = false;
  }

  dragHover(node: CategoryFlatNode) {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
      this.expandTimeout = setTimeout(() => this.treeControl.expand(node), this.expandDelay);
    }
  }

  dragHoverEnd() {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
    }
  }

  rebuildTreeForData(data: any) {
    this.dataSourceTree.data = data;
    this.expansionModel.selected.forEach(id => {
      const node = this.treeControl.dataNodes.find(n => n.id === id);
      if (node) this.treeControl.expand(node);
    });
  }

  private getParentNode(node: CategoryFlatNode): CategoryFlatNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) return null;

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) return currentNode;
    }
    return null;
  }
}
