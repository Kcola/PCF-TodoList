import { Checkbox, Stack } from "@fluentui/react";
import React, { FC, useEffect, useState } from "react";
import unique from "lodash/uniq";

export type Todo = { key: string; id: number; content: string };

const stackTokens = { childrenGap: 10 };

export const TodoListComponent: FC<{
  todos: Array<Todo>;
  handleSelect: (keys: string[]) => void;
}> = ({ todos, handleSelect }) => {
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    handleSelect(selected);
  }, [selected]);

  return (
    <Stack tokens={stackTokens}>
      {todos.map((todo) => (
        <Checkbox
          key={todo.key}
          label={todo.content}
          onChange={(_, checked) =>
            setSelected((_selected) =>
              checked
                ? unique([..._selected, todo.key])
                : _selected.filter((key) => key != todo.key)
            )
          }
        />
      ))}
    </Stack>
  );
};
