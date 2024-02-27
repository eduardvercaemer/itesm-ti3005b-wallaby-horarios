import { Datepicker as VanillaDatepicker } from "vanillajs-datepicker";
import {
  component$,
  PropFunction,
  QwikIntrinsicElements,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

export const Datepicker = component$(
  (
    props: QwikIntrinsicElements["input"] & {
      onChange$: PropFunction<(date: Date) => void>;
    },
  ) => {
    const element = useSignal<HTMLInputElement>();

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
      const datepicker = new VanillaDatepicker(element.value!);
      cleanup(() => datepicker.destroy());
    });

    return (
      // @ts-ignore
      <input
        class="input input-bordered w-full max-w-xs"
        {...props}
        on-changeDate$={(e: Event & { detail: { date: Date } }) =>
          props.onChange$(e.detail.date)
        }
        type="text"
        name={props.name ?? "date"}
        ref={element}
      />
    );
  },
);
