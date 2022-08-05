import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { Todo, TodoListComponent } from "./components/TodoListComponent";

export class TodoList
  implements ComponentFramework.StandardControl<IInputs, IOutputs>
{
  container: HTMLDivElement;

  init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged?: () => void,
    state?: ComponentFramework.Dictionary,
    container?: HTMLDivElement
  ): void {
    if (container) this.container = container;
  }
  updateView(context: ComponentFramework.Context<IInputs>): void {
    const handleSelect = (keys: string[]) => {
      context.parameters.todos.setSelectedRecordIds(keys);
    };

    const records = context.parameters.todos.records;

    const sortedRecords = context.parameters.todos.sortedRecordIds.map<
      [string, typeof records[string]]
    >((id) => [id, records[id]]);

    const todos = sortedRecords.reduce<Todo[]>((acc, [key, record]) => {
      const entry = context.parameters.todos.columns.reduce<
        Record<string, unknown>
      >((acc1, column) => {
        acc1[column.alias] = record.getValue(column.name);
        return acc1;
      }, {}) as Todo;

      entry.key = key;
      return [...acc, entry];
    }, []);

    render(
      React.createElement(TodoListComponent, {
        todos,
        handleSelect,
      }),
      this.container
    );
  }
  destroy(): void {
    unmountComponentAtNode(this.container);
  }
  getOutputs?(): IOutputs {
    return {} as IOutputs;
  }
}
