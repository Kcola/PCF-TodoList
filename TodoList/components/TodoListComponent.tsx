import { Checkbox, Icon, Stack } from "@fluentui/react";
import React, { FC, useEffect, useState } from "react";
import unique from "lodash/uniq";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
initializeIcons();

export type Todo = {
  key: string;
  id: number;
  content: string;
  status: string | boolean;
};

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
      {todos.map((todo) => {
        // theres some discrepancy between local dev's TwoOption type and powerapps TwoOption type
        let status = false;
        if (typeof todo.status === "string") status = todo.status === "1";
        else if (typeof todo.status === "boolean") status = todo.status;

        return (
          <Stack key={todo.key} horizontal={true} gap={10}>
            <Checkbox
              label={todo.content}
              onChange={(_, checked) =>
                setSelected((_selected) =>
                  checked
                    ? unique([..._selected, todo.key])
                    : _selected.filter((key) => key != todo.key)
                )
              }
            />
            {status && <Icon iconName={"Accept"} />}
          </Stack>
        );
      })}
    </Stack>
  );
};
