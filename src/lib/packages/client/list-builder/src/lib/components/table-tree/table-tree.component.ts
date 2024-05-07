import { Component } from '@angular/core';

import { BaseTableDefaultComponent } from '../base-table-default/base-table-default.component';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  debounceTime,
  Observable,
  of as observableOf,
  takeUntil,
  tap,
} from 'rxjs';

export class CategoryNode {
  children: CategoryNode[];
  name: string;
  parent_api_id: string;
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

  override itemsPerPage = 1000;

  override ngOnInit() {
    //super.ngOnInit();
    this.modelFacade = this.listController.getFacade();
    this.model = this.listController.getModelDefinition();
    this.modelReference = this.listController.getClassName();
    this.modelFacade?.notification?.updated$?.subscribe((timestamp) => {});

    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      (node) => node.level,
      (node) => node.expandable,
      (node) => this.findChildren(node.id)
    );

    this.treeControl = new FlatTreeControl<CategoryFlatNode>(
      (node) => node.level,
      (node) => node.expandable
    );
    this.dataSourceTree = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    this.modelFacade?.base.filtered$.subscribe((categories: unknown) => {
      this.dataSourceTree.data = (categories as any).map((category) => ({
        ...category,
        id: category.api_id, // Map api_id to id
      })) as CategoryNode[];

      if (this.dataSourceTree.data.length > 0) {
        this.dataLoaded = true;
      }
      this.cdRef.detectChanges();
    });

    if (this.modelFacade) {
      this.filterOptions = { ...this.filterOptions, limit: this.itemsPerPage };
      this.modelFacade.base.loadFiltered(this.filterOptions);
      this.loading$ = this.modelFacade.base.loaded$;
    }

    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(300),
        tap((search: string) => {
          this.filterOptions = { ...this.filterOptions, search };
          if (this.modelFacade) {
            this.modelFacade.base.loadFiltered(this.filterOptions);
          }
        })
      )
      .subscribe();
  }

  transformer = (node: CategoryNode, level: number) => {
    return new CategoryFlatNode(
      this.findChildren(node.id).length > 0, // expandable if it has children
      node.name,
      level,
      node.type,
      node.id
    );
  };

  hasChild = (_: number, _nodeData: CategoryFlatNode) => _nodeData.expandable;

  findChildren(parentId: string): CategoryNode[] {
    // Assuming `categories` is your array of categories
    return this.dataSourceTree.data.filter(
      (node) => node.parent_api_id === parentId
    );
  }

  visibleNodes(): CategoryNode[] {
    const result: CategoryNode[] = [];

    const addExpandedChildren = (node: CategoryNode, expanded: string[]) => {
      result.push(node);
      if (expanded.includes(node.id)) {
        node.children.forEach((child) => addExpandedChildren(child, expanded));
      }
    };

    this.dataSourceTree.data.forEach((node) =>
      addExpandedChildren(node, this.expansionModel.selected)
    );
    return result;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (!event.isPointerOverContainer) return;

    const visibleNodes = this.visibleNodes();
    const changedData = JSON.parse(JSON.stringify(this.dataSourceTree.data)); // Deep clone

    const findNodeSiblings = (
      arr: CategoryNode[],
      id: string
    ): CategoryNode[] | null => {
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

    const insertIndex = newSiblings.findIndex((s) => s.id === nodeAtDest.id);
    const node = event.item.data;
    const siblings = findNodeSiblings(changedData, node.id);
    if (!siblings) return;

    const siblingIndex = siblings.findIndex((n) => n.id === node.id);
    const nodeToInsert: CategoryNode = siblings.splice(siblingIndex, 1)[0];
    if (nodeAtDest.id === nodeToInsert.id) return;

    const nodeAtDestFlatNode = this.treeControl.dataNodes.find(
      (n) => nodeAtDest.id === n.id
    );
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
      this.expandTimeout = setTimeout(
        () => this.treeControl.expand(node),
        this.expandDelay
      );
    }
  }

  dragHoverEnd() {
    if (this.dragging) {
      clearTimeout(this.expandTimeout);
    }
  }

  rebuildTreeForData(data: any) {
    this.dataSourceTree.data = data;
    this.expansionModel.selected.forEach((id) => {
      const node = this.treeControl.dataNodes.find((n) => n.id === id);
      if (node) this.treeControl.expand(node);
    });
  }

  private _getLevel = (node: CategoryFlatNode) => node.level;

  private _isExpandable = (node: CategoryFlatNode) => node.expandable;

  private _getChildren = (node: CategoryNode): Observable<CategoryNode[]> =>
    observableOf(node.children);

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
