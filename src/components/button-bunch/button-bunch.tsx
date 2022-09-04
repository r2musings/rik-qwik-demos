import { component$, useStyles$ } from "@builder.io/qwik";
import styles from "./button-bunch.css";

export const ButtonBunch = component$((props: { buttonCount?: number }) => {
  const count = props.buttonCount || 50;
  const items = new Array(count)
    .fill(null)
    .map((_, index) => `Button ${index + 1}`);
  useStyles$(styles);

  return (
    <div>
      <ul>
        {items.map((i) => (
          <li>
           <Button title={i} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export const Button = component$((props: { title: string }) => {
  return (
    <button
      onClick$={() => console.log(`${props.title} - onClick fired`)}
      onDblClick$={() => console.log(`${props.title} - onDblClick fired`)}
      onMouseOver$={() => console.log(`${props.title} - onMouseOver fired`)}
      onContextMenu$={() => console.log(`${props.title} - onContextMenu fired`)}
      preventdefault:contextmenu
    >
      {props.title}
    </button>
  );
});
